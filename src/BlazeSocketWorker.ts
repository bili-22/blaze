import * as crypto from 'crypto';
import { Agent as HttpsAgent } from 'https';
import tls from 'tls';
import request from 'superagent';
import { parentPort, workerData } from 'worker_threads';
import { Blaze, PacketType } from './Blaze';

const redirector = 'https://spring18.gosredirector.ea.com:42230/redirector/getServerInstance';

enum BlazeServerREQ {
    BF1 = '<serverinstancerequest><name>battlefield-1-pc</name><connectionprofile>standardSecure_v4</connectionprofile></serverinstancerequest>',
    BFV = '<serverinstancerequest><name>battlefield-casablanca-pc</name><connectionprofile>standardSecure_v4</connectionprofile></serverinstancerequest>',
    BF2042 = '<serverinstancerequest><name>bf-2021-pc-gen5</name><connectionprofile>standardSecure_v4</connectionprofile></serverinstancerequest>',
}

const ping = Buffer.alloc(16);
ping[13] = PacketType.Ping;

class BlazeError extends Error { }

const [authCode, game]: [string, keyof typeof BlazeServerREQ] = workerData;

async function main() {
    // 初始化
    const timeout = setTimeout(() => { throw new BlazeError('连接到Blaze超时'); }, 30000);

    // 获取服务器地址
    const { host, port } = await request
        .post(redirector)
        .agent(new HttpsAgent({ secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT }))
        .disableTLSCerts()
        .set('Content-Type', 'application/xml')
        .set('Accept', 'application/json')
        .send(BlazeServerREQ[game])
        .then(({ body: { address: { ipAddress } } }) => ({ host: ipAddress.hostname, port: ipAddress.port }))
        .catch((error) => { throw new BlazeError('获取服务器地址失败', { cause: error }); });

    // 创建Socket
    const socket = tls.connect({ host, port, rejectUnauthorized: false });

    // 等待连接成功
    await new Promise<void>((resolve, reject) => {
        socket.once('error', reject);
        socket.once('connect', () => socket.off('error', reject) && resolve());
    }).catch((error) => { throw new BlazeError('连接服务器失败', { cause: error }); });

    // 使用Authcode登入
    socket.write(Blaze.encode({ method: 'Authentication.login', data: { 'AUTH String': authCode, 'EXTB Blob': '', 'EXTI Integer': 0 } }));

    const { DSNM: name, PID: personaId } = await new Promise<Record<string, any>>((resolve, reject) => {
        socket.once('data', (data) => (data[13] === 0x40 ? socket.once('data', (data2) => resolve(Blaze.decode(Buffer.concat([data, data2]), false).data)) : reject(new BlazeError('登录失败'))));
    });

    parentPort.postMessage({ name, personaId, address: `${host}:${port}` });

    clearTimeout(timeout);

    // 注册事件
    socket.once('close', () => { throw new BlazeError('连接断开'); });
    socket.once('end', () => { throw new BlazeError('连接断开'); });

    // 发送包
    const idMap = new Map<number, [boolean, boolean, boolean?]>();
    parentPort.on('message', (packet: { method: string, data: Record<string, any>, id: number, raw: boolean, typed: boolean }) => {
        try {
            const merge = packet.data?._merge;
            delete packet.data?._merge;
            const payload = Blaze.encode(packet);
            idMap.set(packet.id, [packet.raw, packet.typed, merge]);
            socket.write(payload);
        } catch (error) {
            parentPort.postMessage([packet.id, new Error('编码包失败', { cause: error })]);
        }
    });

    // 设置心跳
    const pingInterval = setInterval(() => socket.write(ping), 20000);
    const pingTimeout = setTimeout(() => { throw new BlazeError('心跳超时'); }, 30000);

    // 服务器列表包Merge缓存
    const gameListMap = new Map<bigint, [number, Record<string, any>[]]>();

    // 处理数据
    let idle = true;
    let length: number;
    let tmp: Buffer;
    let pos = 0;
    let id: number;

    for await (const buf of socket as AsyncIterable<Buffer>) {
        pingInterval.refresh();
        pingTimeout.refresh();

        if (idle) {
            if (buf[13] === PacketType.Pong) continue;
            idle = false;
            length = buf.readInt32BE(0) + buf.readInt16BE(4) + 16;
            id = buf.readInt16BE(11);
            const method = buf.readInt32BE(6)
            if (buf[13] === 0x40 && method === 0x7802_0009) throw new BlazeError('退出登录');
            if (idMap.has(id) || method === 0x0004_00c9) tmp = Buffer.allocUnsafe(length);
        }

        if (tmp) buf.copy(tmp, pos);
        pos += buf.length;

        if (pos === length) {
            idle = true;
            pos = 0;
            if (!tmp) continue;
            // 处理GameList
            if (tmp.readInt32BE(6) === 0x0004_00c9) {
                const packet = Blaze.decode(tmp, true);
                const gameListId = packet.data['GLID Integer'];

                if (!gameListMap.has(gameListId)) {
                    tmp = null;
                    continue;
                }

                packet.data['UPDT List<Struct>']?.forEach((game: Record<string, any>) => gameListMap.get(gameListId)![1].push(game));

                if (!packet.data['DONE Integer']) {
                    tmp = null;
                    continue;
                } else {
                    packet.data['UPDT List<Struct>'] = gameListMap.get(gameListId)![1];

                    tmp = Blaze.encode(packet);
                    id = gameListMap.get(gameListId)![0];

                    gameListMap.delete(gameListId);
                }
            }
            // 处理包
            const [raw, typed, merge] = idMap.get(id)!;
            if (merge && tmp.readInt32BE(6) === 0x0004_0064 && tmp[13] === 0x20) {
                const packet = Blaze.decode(tmp, true);
                gameListMap.set(packet.data['GLID Integer'], [id, []]);
            } else if (raw) {
                parentPort.postMessage([id, tmp]);
                idMap.delete(id);
            } else {
                parentPort.postMessage([id, Blaze.decode(tmp, typed)]);
                idMap.delete(id);
            }
            tmp = null;
        }
    }
}
main();
