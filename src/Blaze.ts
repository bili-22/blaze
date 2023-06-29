import { Commands, Components, Errors, Methods } from './Method';

enum BlazeType {
    Integer,
    String,
    Blob,
    Struct,
    List,
    Map,
    Union,
    IntList,
    ObjectType,
    ObjectId,
    Float,
    Time,
    Type12,
}

export enum PacketType {
    Command = 0x00,
    Result = 0x20,
    Message = 0x40,
    Error = 0x60,
    Ping = 0x80,
    Pong = 0xA0,
}

const tags = new Map<string, string>();

export interface BlazePacket {
    method?: string;
    length?: number;
    component?: number;
    command?: number;
    id?: number;
    type?: string;
    data?: Record<string, any>;
    error?: BlazeError
}

export class BlazeError extends Error {
    public component: string;
    public description: number;
    public details: string;
    constructor({
        component, name, description, details,
    }) {
        super(name);
        this.name = 'BlazeError';
        this.component = component;
        if (description) this.description = description;
        if (details) this.details = details;
    }
}

export class Blaze {
    static decode(buffer: Buffer, typed = true): BlazePacket {
        let offset = 16;
        const length = buffer.readInt32BE(0) + buffer.readInt16BE(4);
        const type = buffer[13];
        const component = buffer.readInt16BE(6);
        const command = buffer.readInt16BE(8);
        const id = buffer.readInt16BE(11);
        let method: string;
        if (type === PacketType.Ping || type === PacketType.Pong) {
            method = 'KeepAlive';
        } else {
            method = Components[component] ?? component;
            method += '.';
            method += Commands[Components[component]]?.[type === PacketType.Message ? 'Message' : 'Command']?.[command] || command;
        }

        if (buffer.length === 16) {
            return {
                method, type: PacketType[type], id, length,
            };
        }

        const data = parseStruct() as Record<string, any>;
        if (data.ERRC) {
            const component = data.ERRC & 0xFFFF;
            let code = data.ERRC >> 16;
            if (code >= 16384) code -= 16384;
            const error = new BlazeError(Errors[`${component}.${code}`] || { component: Components[component] || component, name: code });
            return {
                method, type: PacketType[type], id, length, error,
            };
        }
        return {
            method,
            type: PacketType[type],
            id,
            length,
            data,
        };

        function decodeTag(hex: string) {
            if (tags.has(hex)) return tags.get(hex);
            const buf = Buffer.alloc(4);

            buf[0] = ((parseInt(hex, 16) >> 18) & 63) + 32;
            buf[1] = ((parseInt(hex, 16) >> 12) & 63) + 32;
            buf[2] = ((parseInt(hex, 16) >> 6) & 63) + 32;
            buf[3] = ((parseInt(hex, 16) >> 0) & 63) + 32;

            const tag = buf.toString();
            tags.set(hex, tag);
            return tag;
        }

        function parseBlock(type: BlazeType) {
            switch (type) {
                case BlazeType.Integer: {
                    return parseInteger();
                }
                case BlazeType.String: {
                    return parseString();
                }
                case BlazeType.Struct: {
                    return parseStruct();
                }
                case BlazeType.Blob: {
                    return parseBlob();
                }
                case BlazeType.List: {
                    return parseList();
                }
                case BlazeType.Map: {
                    return parseMap();
                }
                case BlazeType.Union: {
                    return parseUnion();
                }
                case BlazeType.ObjectType: {
                    return parseObjectType();
                }
                case BlazeType.ObjectId: {
                    return parseObjectId();
                }
                case BlazeType.IntList: {
                    return parseIntList();
                }
                case BlazeType.Float: {
                    return parseFloat();
                }
                case BlazeType.Type12: {
                    return parseType12();
                }
                default: {
                    throw new Error(`未知类型 ${type.toString(16).padStart(2, '0')}`);
                }
            }
        }

        function parseStruct() {
            const data = {};
            if (buffer[offset] === 2) {
                data['_endFlag'] = true;
                offset++;
            }
            while (buffer[offset]) {
                const tag = decodeTag(buffer.subarray(offset, offset += 3).toString('hex'));
                const type = buffer[offset++];
                const name = typed
                    ? type === BlazeType.List
                        ? `${tag} ${BlazeType[type]}<${BlazeType[buffer[offset]]}>`
                        : type === BlazeType.Map
                            ? `${tag} ${BlazeType[type]}<${BlazeType[buffer[offset]]}, ${BlazeType[buffer[offset + 1]]}>`
                            : `${tag} ${BlazeType[type]}`
                    : tag.trimEnd();
                const result = parseBlock(type);
                data[name] = result;
            }
            offset++;
            return data;
        }

        function parseUnion() {
            const data = {};
            const activeMemberIndex = buffer[offset++];
            if (activeMemberIndex === 127) return data;
            data['_activeMemberIndex'] = activeMemberIndex.toString(16).padStart(2, '0');
            const tag = decodeTag(buffer.subarray(offset, offset += 3).toString('hex'));
            const type = buffer[offset++];
            const name = typed ? `${tag} ${BlazeType[type]}` : tag.trimEnd();
            const result = parseBlock(type);
            data[name] = result;
            return data;
        }

        function parseInteger() {
            let i = 1;
            let n: number | bigint = 0;

            const neg = buffer[offset] & 0b01000000;
            n |= buffer[offset] & 0b00111111;

            // 32位以内
            if (!(buffer[offset++] & 0b10000000)) {
                return neg ? -n : n;
            }

            for (; i < 4; i++) {
                n |= ((buffer[offset] & 0b01111111) << (7 * i - 1));
                if (!(buffer[offset++] & 0b10000000)) {
                    return neg ? -n : n;
                }
            }

            // MAX_SAFE_INTEGER以内
            for (; i < 7; i++) {
                n += ((buffer[offset] & 0b01111111) * 2 ** (7 * i - 1));
                if (!(buffer[offset++] & 0b10000000)) {
                    return neg ? -n : n;
                }
            }

            // 64位
            n = BigInt(n);
            let j = 7n;
            for (; true; i++, j++) {
                n |= ((BigInt(buffer[offset]) & 0b01111111n) << (7n * j - 1n));
                if (!(buffer[offset++] & 0b10000000)) {
                    if (n < Number.MAX_SAFE_INTEGER) n = Number(n);
                    return neg ? -n : n;
                }
            }
        }

        function parseString() {
            const length = parseInteger() as number;
            offset += length;
            return buffer.subarray(offset - length, offset - 1).toString();
        }

        function parseType12() {
            if (buffer[offset] === 1 && buffer[offset + 1] === 6) {
                offset += 2;
                const data = parseString();
                offset++;
                return data;
            }
            throw new Error(`未知类型(Type12) ${buffer[offset].toString(16).padStart(2, '0')}`);
        }

        function parseBlob() {
            const length = parseInteger() as number;
            return buffer.subarray(offset - length, offset - 1).toString('hex');
        }

        function parseList() {
            const type = buffer[offset++];
            const size = parseInteger();
            const data = [];
            for (let i = 0; i < size; i++) {
                data.push(parseBlock(type));
            }
            return data;
        }

        function parseIntList(): number[] {
            const size = parseInteger();
            const data = [];
            for (let i = 0; i < size; i++) {
                data.push(parseInteger());
            }
            return data;
        }

        function parseMap() {
            const keyType = buffer[offset++];
            const valType = buffer[offset++];
            const size = parseInteger();
            const data = {};
            for (let i = 0; i < size; i++) {
                data[parseBlock(keyType) as string] = parseBlock(valType);
            }
            return data;
        }

        function parseObjectType() {
            const data: [number, number] = [parseInteger() as number, parseInteger() as number];
            return data;
        }

        function parseObjectId() {
            const data: [number, number, number | bigint] = [parseInteger() as number, parseInteger() as number, parseInteger()];
            return data;
        }

        function parseFloat() {
            offset += 4;
            return buffer.readFloatBE(offset - 4);
        }
    }
    /* eslint-disable */

    static encode(packet) {
        const header = Buffer.alloc(16);
        // Component
        header.writeUInt16BE(Methods[packet.method]?.[0] ?? +packet.method.split('.')[0], 6);
        // Command
        header.writeUInt16BE(Methods[packet.method]?.[1] ?? +packet.method.split('.')[1], 8);
        // Id
        header.writeUInt16BE(packet.id, 11);
        // Type
        header[13] = PacketType[packet.type] as unknown as number ?? 0;

        let hex = '';
        writeStruct(packet.data || {}, false);
        const data = Buffer.from(hex, 'hex');
        // Length
        if (packet.type === 96) {
            header.writeUInt16BE(data.length, 4);
        } else {
            header.writeUInt32BE(data.length, 0);
        }

        return Buffer.concat([header, data]);

        function encodeTag(tag: string) {
            let buffer = 0;
            for (let i = 0; i < tag.length; i++) {
                buffer += ((parseInt(Buffer.from(tag[i]).toString('hex'), 16) - 32) << (18 - 6 * +i));
            }
            return buffer.toString(16);
        }

        function writeBlock(type: string, value, key?: string) {
            switch (type) {
                case 'Integer': {
                    value = writeInteger(value);
                    break;
                }
                case 'Boolean': {
                    value = writeInteger(value ? 1 : 0);
                    break;
                }
                case 'String': {
                    value = writeString(value);
                    break;
                }
                case 'Struct': {
                    value = writeStruct(value);
                    break;
                }
                case 'Blob': {
                    value = writeBlob(value);
                    break;
                }
                case 'List': {
                    value = writeList(value, key);
                    break;
                }
                case 'Map': {
                    value = writeMap(value, key);
                    break;
                }
                case 'Union': {
                    value = writeUnion(value);
                    break;
                }
                case 'ObjectType': {
                    value = writeObjectType(value);
                    break;
                }
                case 'ObjectId': {
                    value = writeObjectId(value);
                    break;
                }
                case 'IntList': {
                    value = writeIntList(value);
                    break;
                }
                case 'Float': {
                    value = writeFloat(value);
                    break;
                }
                case 'Type12': {
                    value = writeType12String(value);
                    break;
                }
                default: {
                    throw new Error(`Unknown Type ${type}`);
                }
            }
        }

        function writeStruct(object, end = true) {
            if (object._endFlag) { hex += '02'; delete object._endFlag };
            Object.entries(object).forEach(({ 0: key, 1: value }) => {
                hex += encodeTag(key.slice(0, 4)); // tag
                hex += `0${BlazeType[key.split(/ +|</)[1]].toString(16)}`; // type
                writeBlock(key.split(/ +|</)[1], value, key);
            });
            if (end) hex += '00';
        }

        function writeInteger(n: number | bigint | boolean | string) {
            switch (typeof n) {
                case 'boolean': {
                    hex += (n ? '01' : '00');
                    break;
                }
                case 'number': {
                    let negative = false;
                    n = +n;
                    if (n < 0) { negative = true; n = -n; }
                    const temp: number[] = [];
                    temp.push((n % 64) + 128);
                    n = Math.floor(n / 64);
                    while (n > 0) {
                        temp.push((n % 128) + 128);
                        n = Math.floor(n / 128);
                    }
                    if (negative) temp[0] += 64;
                    temp[temp.length - 1] -= 128;
                    hex += Buffer.from(temp).toString('hex');
                    break;
                }
                case 'bigint': {
                    const negative = n < 0n;
                    if (negative) n = -n;
                    hex += ((n > 63 ? 128n : 0n) + (negative ? 64n : 0n) + (n & 63n)).toString(16).padStart(2, '0');
                    n >>= 6n;
                    while (n) {
                        hex += ((n > 127n ? 128n : 0n) + (n & 127n)).toString(16).padStart(2, '0');
                        n >>= 7n;
                    }
                    break;
                }
                case 'string': {
                    const val = +n;
                    if (Number.isNaN(val)) {
                        throw new Error('Not a vaild integer');
                    }
                    if (val > Number.MAX_SAFE_INTEGER || val < Number.MIN_SAFE_INTEGER) {
                        writeInteger(BigInt(n));
                    } else {
                        writeInteger(+n);
                    }
                    break;
                }
                default:
                    throw new Error('Not a vaild integer');
            }
        }

        function writeString(text: string) {
            if (!text) {
                hex += '0100';
                return;
            }
            text = `${Buffer.from(text).toString('hex')}00`;
            writeInteger(text.length / 2); // length
            hex += text;
        }

        function writeType12String(text: string) {
            hex += '0106';
            text = `${Buffer.from(text).toString('hex')}0000`;
            writeInteger(text.length / 2 - 1); // length
            hex += text;
        }

        function writeBlob(blobHex: string) {
            writeInteger(blobHex.length / 2);
            hex += blobHex;
        }

        function writeList(list: any[], key: string) {
            hex += `0${BlazeType[key.split(/<|>/)[1]].toString(16)}`;
            writeInteger(list.length); // size
            list.forEach((item) => writeBlock(key.split(/<|>/)[1], item));
        }

        function writeMap(map: Record<string, any>, key: string) {
            map = Object.entries(map);
            hex += `0${(BlazeType[key.split(/<|, |>/)[1]] as unknown as number).toString(16)}`;
            hex += `0${(BlazeType[key.split(/<|, |>/)[2]] as unknown as number).toString(16)}`;
            writeInteger(map.length); // size
            map.forEach(({ 0: k, 1: value }) => {
                writeBlock(key.split(/<|, |>/)[1], k);
                writeBlock(key.split(/<|, |>/)[2], value);
            });
        }

        function writeIntList(list) {
            writeInteger(list.length); // size
            list.forEach((item) => writeInteger(item));
        }

        function writeUnion(data) {
            if (data._activeMemberIndex) {
                hex += data._activeMemberIndex;
                delete data._activeMemberIndex;
                writeStruct(data, false);
            } else {
                hex += '7f';
            }
        }

        function writeObjectType(list: [number, number]) {
            list.forEach(writeInteger);
        }

        function writeObjectId(list: [number, number, number]) {
            list.forEach(writeInteger);
        }

        function writeFloat(item) {
            const buff = Buffer.alloc(4);
            buff.writeFloatBE(item);
            hex += buff.toString('hex');
        }
    }
    /* eslint-enable */
}
