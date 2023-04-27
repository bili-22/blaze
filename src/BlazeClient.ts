import * as crypto from 'crypto';
import { EventEmitter } from 'events';
import { Agent } from 'https';
import tls, { TLSSocket } from 'tls';
import Debugger from 'debug';
import agent from 'superagent';
import { Blaze, BlazePacket, PacketType } from './Blaze';

const ping = Buffer.alloc(16);
ping[13] = PacketType.Ping;

export class BlazeSocket extends EventEmitter {
    #socket: TLSSocket;
    #id = 0;
    #logger: Debugger;
    host: string;
    user: string;
    personaId: number;
    #closed = false;

    constructor(authcode: string) {
        if (!authcode) throw new Error('No authcode provided');
        super();
        this.#logger = Debugger(`blaze:temp-${authcode.slice(-4)}`);
        this.#logger('BlazeSocket created');
        agent.post('https://winter15.gosredirector.ea.com:42230/redirector/getServerInstance')
            .agent(new Agent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }))
            .disableTLSCerts()
            .set('Content-Type', 'application/xml')
            .set('Accept', 'application/json')
            .send('<serverinstancerequest><name>battlefield-1-pc</name><connectionprofile>standardSecure_v4</connectionprofile></serverinstancerequest>')
            .then(({ body: { address: { ipAddress } } }) => ({ host: ipAddress.hostname, port: ipAddress.port }))
            .then(({ host, port }) => {
                this.host = `${host}:${port}`;
                this.#logger(`Obtained address ${this.host}`);
                this.#socket = tls.connect({ host, port, rejectUnauthorized: false });
                this.#socket.on('data', (data: Buffer) => this._handlePacket(data));
                return new Promise<void>((resolve, reject) => {
                    this.#socket.once('connect', () => this.#socket.off('error', reject) && resolve());
                    this.#socket.once('error', reject);
                });
            })
            .then(() => {
                this.#logger(`Connected to ${this.host}`);
                this.#socket.once('error', (err) => this.emit('close', err));
                this.#socket.once('end', (err) => this.emit('close', err));
                this.#socket.once('close', (err) => this.emit('close', err));
                this.#logger(`Authenticating using authcode ${authcode}`);
                return new Promise<Record<string, any>>((resolve, reject) => {
                    this.send(
                        { method: 'Authentication.login', data: { 'AUTH String': authcode, 'EXTB Blob': '', 'EXTI Integer': 0 } },
                        (err, data) => (data ? resolve(data) : reject(err)),
                    );
                });
            })
            .then((data) => {
                this.personaId = data.buid;
                this.user = data.dsnm;
                this.#logger(`Authenticated as ${this.user}`);
                this.#logger = Debugger(`blaze:${this.user}`);
                this.emit('connect', ({ host: this.host, user: this.user, personaId: this.personaId }));
                const interval = setInterval(() => { this.#socket.write(ping); }, 30000);
                this.once('close', (err) => {
                    this.#closed = true;
                    this.#socket._destroy(err, () => { });
                    this.#logger(`Connection closed${err ? ` because ${err.message}` : ''}`);
                    clearInterval(interval);
                });
            })
            .catch((err) => this.emit('close', err));
    }

    public send(packet: BlazePacket, callback?: (err: Error | null, data: any) => void, decode = true) {
        if (this.#closed) { callback?.(new Error('Connection closed'), null); return; }
        if (this.#id > 65535) this.#id = 1;
        this.#logger('Send packet', `${packet.method}(${this.#id})`);
        packet.id = this.#id++;
        try {
            const buffer = Blaze.encode(packet);
            this.#socket.write(buffer);
        } catch (error) {
            callback(new Error('Failed to encode packet'), null);
            return;
        }
        if (callback) {
            this.once(`packet:${packet.id}`, (packet) => {
                if (decode) {
                    packet = Blaze.decode(packet);
                    if (packet.error) {
                        Object.defineProperty(packet.error, 'packet', { value: packet });
                        callback(packet.error, null);
                        if (packet.error.message === 'ERR_AUTHENTICATION_REQUIRED') {
                            this.emit('close', new Error('user is unauthenticated'));
                        }
                    } else {
                        packet.data = packet.data || {};
                        Object.defineProperty(packet.data, 'packet', { value: packet });
                        callback(null, packet.data);
                    }
                } else {
                    callback(null, packet);
                }
            });
        }
    }

    #packetSize = 0;
    #header: Buffer;
    #method: string;
    #timestamp: number;
    #temp = Buffer.alloc(0);
    #timeout: NodeJS.Timeout;

    private _handlePacket(buffer: Buffer) {
        if (!this.#packetSize) {
            this._readInfo(buffer);
        } else {
            this._concatPacket(buffer);
        }
    }

    private _readInfo(buffer: Buffer) {
        if (buffer[13] === PacketType.Pong) return;
        this.#header = buffer.subarray(0, 16);
        const { id, method, length } = Blaze.decode(this.#header);
        this.#packetSize = length;
        this.#method = method;
        this.#timestamp = Date.now();
        this.emit('packet', { id, method, length });
        this.#logger(`Receive packet ${this.#method}(${id})`, length > 0x100000 ? `${(length / 0x100000).toFixed(2)}MB` : `${(length / 0x400).toFixed(2)}KB`);
        this._concatPacket(buffer.subarray(16));
    }

    private _concatPacket(buffer: Buffer) {
        clearTimeout(this.#timeout);
        this.#timeout = setTimeout(() => {
            this.emit('close', new Error('timeout'));
        }, 30000);
        this.#temp = Buffer.concat([this.#temp, buffer]);
        if (this.#temp.length >= this.#packetSize) {
            this._readPacket();
            this.#temp = Buffer.alloc(0);
            this.#packetSize = 0;
        }
    }

    private _readPacket() {
        clearTimeout(this.#timeout);
        const id = this.#header.readInt16BE(11);
        this.#logger('Success receive packet', `${this.#method}(${id})`, `${((this.#packetSize / 0x100000) / ((Date.now() - this.#timestamp) / 1000)).toFixed(2)}mb/s`);
        this.emit(`packet:${id}`, Buffer.concat([this.#header, this.#temp]));
        if (this.#method === 'UserSessions.UserUnauthenticated') { this.emit('close', new Error('user is unauthenticated')); return; }
        this.#packetSize = 0;
        this.#temp = Buffer.alloc(0);
    }
}

let poolId = 0;
export class BlazePool extends EventEmitter {
    _sockets: BlazeSocket[] = [];
    _available: BlazeSocket[] = [];
    #queue = [];
    #logger = Debugger(`blaze:pool-${poolId++}`);

    constructor() {
        super();
        this.#logger('Pool created');
    }

    public add(authcode: string, getAuthcode?: () => Promise<string>) {
        return new Promise<boolean>((resolve, reject) => {
            const retry = () => {
                getAuthcode?.().then((authcode) => this.add(authcode, getAuthcode)).catch(() => { setTimeout(retry, 5000); });
            };
            const socket = new BlazeSocket(authcode);
            const close = (err: Error) => {
                retry();
                this.#logger(`Add socket [${socket.user}] fail`, err);
                reject(err);
            };
            socket.on('packet', ({ id, method, length }) => this.emit('packet', { id, method, length, socket }));
            socket.once('close', close);
            socket.once('connect', () => {
                socket.off('close', close);
                this.#logger(`Socket [${socket.user}] added`);
                this.emit('connect', { socket });
                this._sockets.push(socket);
                resolve(true);
                this._release(socket);
                socket.once('close', (err) => {
                    retry();
                    this.#logger(`Socket [${socket.user}] closed`);
                    this.emit('close', { err, socket });
                    if (this._sockets.includes(socket)) this._sockets.splice(this._sockets.indexOf(socket), 1);
                    if (this._available.includes(socket)) this._available.splice(this._available.indexOf(socket), 1);
                });
            });
        });
    }

    public send(packet: BlazePacket, decode?: boolean) {
        return new Promise<Record<string, any>>((resolve, reject) => {
            this._getSocket()
                .then((socket) => {
                    socket.send(packet, (err, data) => {
                        this._release(socket);
                        if (err) reject(err);
                        else resolve(data);
                    }, decode);
                })
                .catch(reject);
        });
    }

    private _getSocket() {
        return new Promise<BlazeSocket>((resolve) => {
            if (this._available.length) {
                resolve(this._available.shift());
                return;
            }
            this.#logger('Waiting for socket');
            this.#queue.push(resolve);
        });
    }

    private _release(socket: BlazeSocket) {
        if (!this._sockets.includes(socket)) return;
        if (this.#queue.length) {
            this.#queue.shift()(socket);
        } else {
            this._available.push(socket);
        }
    }
}
