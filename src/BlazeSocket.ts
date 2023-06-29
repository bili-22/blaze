import { EventEmitter } from 'events';
import { Worker } from 'worker_threads';
import { BlazePacket } from './Blaze';

type Game = 'BF1' | 'BFV' | 'BF2042';

export class BlazeSocket extends EventEmitter {
    #id = 1;
    #worker: Worker;
    #idMap = new Map<number, [(value: any) => void, (reason: any) => void]>();

    name: string;
    personaId: number;
    address: string;

    constructor(authCode: string, game: Game = 'BF1') {
        super();
        this.#worker = new Worker(`${__dirname}/BlazeSocketWorker.js`, { workerData: [authCode, game] });

        this.once('close', () => this.#idMap.forEach(([, reject]) => reject(new Error('Socket Closed'))));

        this.#worker.once('error', (error) => this.emit('close', error));
        this.#worker.once('exit', (code) => code === 0 && this.emit('close'));

        this.#worker.once('message', ({ name, personaId, address }) => {
            this.name = name;
            this.personaId = personaId;
            this.address = address;
            this.emit('connect', { name, personaId, address });
            this.#worker.on('message', ([id, data]: [number, BlazePacket | Error]) => {
                const [resolve, reject] = this.#idMap.get(id);
                if (data instanceof Error) {
                    this.#idMap.delete(id);
                    reject(data);
                } else if (data.error?.message === 'ERR_AUTHENTICATION_REQUIRED') {
                    this.emit('close', data.error);
                    this.#worker.terminate();
                } else {
                    this.#idMap.delete(id);
                    resolve(data);
                }
            });
        });
    }

    send(packet: { method: string, data: Record<string, any> }, typed = false, raw = false) {
        return new Promise<void>((resolve, reject) => {
            if (this.#id > 65535) this.#id = 1;
            const id = this.#id++;
            (packet as any).id = id;
            (packet as any).typed = typed;
            (packet as any).raw = raw;
            this.#idMap.set(id, [resolve, reject]);
            this.#worker.postMessage(packet);
        });
    }
}
