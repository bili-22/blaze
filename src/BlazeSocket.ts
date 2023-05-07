import * as crypto from 'crypto';
import { EventEmitter } from 'events';
import { Agent } from 'https';
import tls, { TLSSocket } from 'tls';
import Debugger from 'debug';
import agent from 'superagent';
import { Blaze, BlazePacket, PacketType } from './Blaze';

const ping = Buffer.alloc(16);
ping[13] = PacketType.Ping;

enum BlazeServerURL {
    BF1 = 'https://winter15.gosredirector.ea.com:42230/redirector/getServerInstance',
    BFV = 'https://spring18.gosredirector.ea.com:42230/redirector/getServerInstance',
}
enum BlazeServerREQ {
    BF1 = '<serverinstancerequest><name>battlefield-1-pc</name><connectionprofile>standardSecure_v4</connectionprofile></serverinstancerequest>',
    BFV = '<serverinstancerequest><name>battlefield-casablanca-pc</name><connectionprofile>standardSecure_v4</connectionprofile></serverinstancerequest>',
}

export class BlazeSocket extends EventEmitter {
    #socket: TLSSocket;
    #id = 0;
    #logger: Debugger;
    host: string;
    user: string;
    personaId: number;
    #closed = false;

    constructor(authcode: string, game = 'BF1') {
        if (!authcode) throw new Error('No authcode provided');
        super();
        this.#logger = Debugger(`blaze:temp-${authcode.slice(-4)}`);
        this.#logger('BlazeSocket created');
        agent.post(BlazeServerURL[game])
            .agent(new Agent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }))
            .disableTLSCerts()
            .set('Content-Type', 'application/xml')
            .set('Accept', 'application/json')
            .send(BlazeServerREQ[game])
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
                this.personaId = data.BUID;
                this.user = data.DSNM;
                this.#logger(`Authenticated as ${this.user}`);
                this.#logger = Debugger(`blaze:${this.user}`);
                this.emit('connect', ({ host: this.host, user: this.user, personaId: this.personaId }));
                const interval = setInterval(() => { this.#socket.write(ping); }, 30000);
                this.once('close', (err) => {
                    this.#closed = true;
                    this.#socket._destroy(err, () => { });
                    this.#logger(`Connection closed${err ? ` because ${err.message}` : ''}`);
                    clearInterval(interval);
                    clearTimeout(this.#timeout);
                });
            })
            .catch((err) => { this.#logger('Authentication failed', err); this.emit('close', err); });
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
            callback(new Error('Packet encoding failed'), null);
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
    #offset = 0;
    #method: string;
    #timestamp: number;
    #temp: Buffer;
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
        const header = buffer.subarray(0, 16);
        const { id, method, length } = Blaze.decode(header);
        this.#temp = Buffer.alloc(length + 16);
        header.copy(this.#temp);
        this.#offset = 16;
        this.#packetSize = length + 16;
        this.#method = method;
        this.#timestamp = Date.now();
        this.emit('packetinfo', { id, method, length });
        this.#logger(`Start receiving packet ${this.#method}(${id})`, length > 0x100000 ? `${(length / 0x100000).toFixed(2)}MB` : `${(length / 0x400).toFixed(2)}KB`);
        this._concatPacket(buffer.subarray(16));
    }

    private _concatPacket(buffer: Buffer) {
        clearTimeout(this.#timeout);
        this.#timeout = setTimeout(() => {
            this.emit('close', new Error('timeout'));
        }, 30000);
        buffer.copy(this.#temp, this.#offset);
        this.#offset += buffer.length;
        if (this.#offset >= this.#packetSize) {
            this._readPacket();
            this.#temp = Buffer.alloc(0);
            this.#packetSize = 0;
        }
    }

    private _readPacket() {
        clearTimeout(this.#timeout);
        const id = this.#temp.readInt16BE(11);
        this.emit('packet', { id, method: this.#method, length: this.#packetSize - 16, time: Date.now() - this.#timestamp });
        // this.#logger('Successfully received packet', `${this.#method}(${id})`, `${((this.#packetSize / 0x100000) / ((Date.now() - this.#timestamp) / 1000)).toFixed(2)}mb/s`);
        this.emit(`packet:${id}`, this.#temp);
        if (this.#method === 'UserSessions.UserUnauthenticated') { this.emit('close', new Error('user is unauthenticated')); return; }
        this.#temp = null;
    }
}
