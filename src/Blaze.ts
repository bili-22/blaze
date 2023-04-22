import { Commands, Components, Errors, Methods } from './Method';

/*
    Blaze包解析
    一个Blaze包的前16字节为报头, 后面为报文
    报文部分是一个BlazeStruct
    超过16kb的包会被拆分, 每个16kb

    PacketHeader
    00 0f 6f c3 00 00 00 04 00 67 00 00 02 20 00 00
    -----1----- --2-- --3-- --4-- 5- --6-- 7- --8--
    1. Length - 报文长度
    2. Empty - 空
    3. Component - 组件
    4. Command - 命令
    5. Empty - 空
    6. Id - 包ID(原样返回)
    7. PacketType - 包类型
    8. Empty - 空

    PacketType
    00 - SendCommand
    20 - Result
    40 - ReceiveMessage
    80 - SendKeepAlive
    A0 - ReceiveKeepAlive
    注: KeepAlive包是一个PacketType为80的空包, 每分钟发一次

    BlazeStruct
    读三个字节, 解析为TAG
    读一个字节, 作为[Type]
    以[Type]为类型读一个值
    TAG-Type-Value作为一个Element
    重复以上步骤读取Element, 直到遇到00或文件尾

    Type
    00 Integer
    01 String
    02 Blob
    03 Struct
    04 List
    05 Map
    06 Union
    07 IntList
    08 Double
    09 Tripple
    0A Float

    BlazeInteger
       8E       85       E3       0B
    10001110 10000101 11100011 00001011
    每个字节的第一位表示是否还有下一个字节
    每个字节后七位连接起来就是数值
    数值的第一位表示正负

    BlazeString
    读一个BlazeInteger作为[Length], 然后读[Length]个字节作为字符串

    BlazeBlob
    读一个BlazeInteger作为[Length], 然后读[Length]个字节并存储

    BlazeList
    读一个字节, 作为[Type]
    读一个BlazeInteger作为[Size]
    以[Type]为类型读[Size]个值

    BlazeMap
    读一个字节, 作为[KeyType]
    读一个字节, 作为[ValueType]
    读一个BlazeInteger作为[Size]
    以[KeyType]读取一次作为键
    以[ValueType]读取一次作为值
    重复以上两步, 读取[Size]个键值对

    BlazeUnion
    读一个字节, 作为[UnionType]
    若[UnionType]为FF, 则Union为空
    若不为FF, 则读一个Element作为值

    BlazeIntList
    读一个BlazeInteger作为[Size]
    读[Size]个BlazeInteger作为列表

    BlazeDouble
    读两个BlazeInteger作为Double

    BlazeTripple
    读三个BlazeInteger作为Tripple

    BlazeFloat
    读一个Float(四字节)

    TAG Decompression
    三个字节的TAG
    > D2 5C F4
    > 11010010 01011100 11110100
    将三个八位的字节分成四个六位的字节
    > 110100 100101 110011 110100
    每个字节加32(100000)
    > 1010100 1000101 1010011 1010100
    > 54 45 53 54
    转换为四个ASCII字符
    > TEST
*/

const BlazeType = {
    0x00: 'Integer',
    0x01: 'String',
    0x02: 'Blob',
    0x03: 'Struct',
    0x04: 'List',
    0x05: 'Map',
    0x06: 'Union',
    0x07: 'IntList',
    0x08: 'Double',
    0x09: 'Tripple',
    0x0A: 'Float',

    Integer: 0x00,
    String: 0x01,
    Blob: 0x02,
    Struct: 0x03,
    List: 0x04,
    Map: 0x05,
    Union: 0x06,
    IntList: 0x07,
    Double: 0x08,
    Tripple: 0x09,
    Float: 0x0A,
};

const PacketType = {
    0x00: 'SendCommand',
    0x20: 'Result',
    0x40: 'ReceiveMessage',
    0x60: 'Error',
    0x80: 'SendKeepAlive',
    0xA0: 'ReceiveKeepAlive',

    SendCommand: 0x00,
    Result: 0x20,
    ReceiveMessage: 0x40,
    SendKeepAlive: 0x80,
    ReceiveKeepAlive: 0xA0,
};

const TypeCategory = {
    SendCommand: 'Command',
    Result: 'Command',
    ReceiveMessage: 'Message',
    SendKeepAlive: 'KeepAlive',
    ReceiveKeepAlive: 'KeepAlive',
};

const tags = new Map<string, string>();

export interface BlazePacket {
    method?: string;
    length?: number;
    component?: number;
    command?: number;
    id?: number;
    type?: number;
    data?: Record<string, any>;
    error?: BlazeError
}

export class Blaze {
    /* eslint-disable */
    static decode(buffer: Buffer): BlazePacket {
        let offset = 16;
        const length = buffer.readInt32BE(0) + buffer.readInt16BE(4);
        const type = PacketType[buffer[13]] || buffer[13];
        const component = buffer.readInt16BE(6);
        const command = buffer.readInt16BE(8);
        const id = buffer.readInt16BE(11);
        let method: string;
        if (TypeCategory[type] === 'KeepAlive') {
            method = 'KeepAlive';
        } else {
            method = `${Components[component] || component}.${Commands[Components[component]]?.[TypeCategory[type] || 'Command']?.[command] || command}`;
        }

        if (buffer.length === 16) return {
            method, type, id, length
        }

        const tagMap = new Map<string, any>();

        const data = parseStruct() as Record<string, any>;
        if (data.errc) {
            const component = data.errc & 0xFFFF;
            let code = data.errc >> 16;
            if (code >= 16384) code -= 16384;
            const error = new BlazeError(Errors[`${component}.${code}`] || { component: Components[component] || component, name: code });
            return {
                method, type, id, length, error,
            };
        }
        return {
            method, type, id, length, data: new Proxy(data, {
                get(target, prop, receiver) {
                    // if (prop === 'raw') return buffer;
                    return Reflect.has(target, prop) ? Reflect.get(target, prop, receiver) : tagMap.get(prop.toString().toLowerCase());
                }
            }),
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

        function parseBlock(type, header?) {
            switch (type) {
                case "Integer": {
                    return parseInteger()
                }
                case "String": {
                    return parseString()
                }
                case "Struct": {
                    return parseStruct()
                }
                case "Blob": {
                    return parseBlob()
                }
                case "List": {
                    return parseList(header)
                }
                case "Map": {
                    return parseMap(header)
                }
                case "Union": {
                    return parseUnion(header)
                }
                case "Double": {
                    return parseDouble()
                }
                case "Tripple": {
                    return parseTripple()
                }
                case "IntList": {
                    return parseIntList()
                }
                case "Float": {
                    return parseFloat()
                }
                default: {
                    throw new Error("未知类型")
                }
            }
        }

        function parseStruct() {
            const data = {}
            while (buffer[offset]) {
                const header = {
                    tag: decodeTag(buffer.subarray(offset, offset += 3).toString("hex")),
                    type: BlazeType[buffer[offset++]]
                }
                const result = parseBlock(header.type, header)
                data[`${header.tag.padEnd(4, " ")} ${header.type}`] = result
                if (!data[header.tag.trim().toLowerCase()]) Object.defineProperty(data, header.tag.trim().toLowerCase(), { value: result })
                tagMap.set(header.tag.trim().toLowerCase(), result)
            }
            offset++
            return data
        }

        function parseUnion(header) {
            const data = {}
            const unionType = buffer[offset++]
            if (unionType === 127) return data
            header.type += '<' + BlazeType[unionType] + '>'
            const uHeader = {
                tag: decodeTag(buffer.subarray(offset, offset += 3).toString("hex")),
                type: BlazeType[buffer[offset++]]
            }
            const result = parseBlock(uHeader.type, uHeader)
            data[`${uHeader.tag.padEnd(4, " ")} ${uHeader.type}`] = result
            return data
        }

        function parseInteger() {
            let i = 1, n = buffer[offset++], negative = n & 64
            if (n > 127) {
                n = n & 127
                do {
                    n += (buffer[offset] & 127) * (128 ** i++ * 0.5)
                } while (buffer[offset++] > 127)
            }
            if (negative) return -n
            return n
        }

        function parseString() {
            const length = parseInteger()
            return buffer.subarray(offset, (offset += length) - 1).toString()
        }

        function parseBlob() {
            const length = parseInteger()
            return buffer.subarray(offset, (offset += length) - 1).toString("hex")
        }

        function parseList(header) {
            const type = BlazeType[buffer[offset++]]
            const size = parseInteger()
            const data = []
            if (type === 'Struct' && buffer[offset] === 2) {
                header.type += "<Struct2>"
                offset++
            } else {
                header.type += '<' + type + '>'
            }
            for (let i = 0; i < size; i++) {
                data.push(parseBlock(type))
            }
            return data
        }

        function parseIntList() {
            const size = parseInteger()
            const data = []
            for (let i = 0; i < size; i++) {
                data.push(parseInteger())
            }
            return data
        }

        function parseMap(header) {
            const keyType = BlazeType[buffer[offset++]]
            const valType = BlazeType[buffer[offset++]]
            header.type += '<' + keyType + ', ' + valType + '>'
            const size = parseInteger()
            const data = {}
            for (let i = 0; i < size; i++) {
                data[parseBlock(keyType) as string] = parseBlock(valType)
            }
            return data
        }

        function parseDouble() {
            const data = [parseInteger(), parseInteger()]
            return data
        }

        function parseTripple() {
            const data = [parseInteger(), parseInteger(), parseInteger()]
            return data
        }

        function parseFloat() {
            return buffer.readFloatBE((offset += 4) - 4)
        }
    }

    static encode(packet) {
        const header = Buffer.alloc(16);
        // Component
        header.writeUInt16BE(Methods[packet.method]?.[0] || +packet.method.split('.')[0], 6);
        // Command
        header.writeUInt16BE(Methods[packet.method]?.[1] || +packet.method.split('.')[1], 8);
        // Id
        header.writeUInt16BE(packet.id, 11);
        // Type
        header[13] = PacketType[packet.type] || 0;

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
                    value = writeInteger(+value);
                    break;
                }
                case 'String': {
                    value = writeString(value);
                    break;
                }
                case 'Struct':
                case 'Struct2': {
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
                    value = writeUnion(value, key);
                    break;
                }
                case 'Double': {
                    value = writeDouble(value);
                    break;
                }
                case 'Tripple': {
                    value = writeTripple(value);
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
                default: {
                    throw new Error(`Unknown Type ${type}`);
                }
            }
        }

        function writeStruct(object, end = true) {
            Object.entries(object).forEach(({ 0: key, 1: value }) => {
                hex += encodeTag(key.slice(0, 4)); // tag
                hex += `0${BlazeType[key.split(/ +|</)[1]].toString(16)}`; // type
                writeBlock(key.split(/ +|</)[1], value, key);
            });
            if (end) hex += '00';
        }

        function writeInteger(n: number) {
            let negative = false;
            n = +n;
            if (n < 0) { negative = true; n = -n; }
            const temp = [];
            temp.push((n % 64) + 128);
            n = Math.floor(n / 64);
            while (n > 0) {
                temp.push((n % 128) + 128);
                n = Math.floor(n / 128);
            }
            if (negative) temp[0] += 64;
            temp[temp.length - 1] -= 128;
            hex += Buffer.from(temp).toString('hex');
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

        function writeBlob(blobHex: string) {
            writeInteger(blobHex.length / 2);
            hex += blobHex;
        }

        function writeList(list: any[], key: string) {
            hex += `0${BlazeType[key.split(/<|>/)[1]].toString(16)}`;
            writeInteger(list.length); // size
            list.forEach((item) => writeBlock(key.split(/<|>/)[1], item));
        }

        function writeMap(map, key) {
            map = Object.entries(map);
            hex += `0${BlazeType[key.split(/<|, |>/)[1]].toString(16)}`;
            hex += `0${BlazeType[key.split(/<|, |>/)[2]].toString(16)}`;
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

        function writeUnion(data, key) {
            if (key.split(/<|>/)[1]) {
                hex += `0${BlazeType[key.split(/<|>/)[1]].toString(16)}`;
                writeStruct(data, false);
            } else {
                hex += '7f';
            }
        }

        function writeDouble(list: [number, number]) {
            list.forEach(writeInteger);
        }

        function writeTripple(list: [number, number, number]) {
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
