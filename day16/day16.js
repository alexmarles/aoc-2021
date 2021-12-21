/* Day 16 */
const { getInputData, sum, min, max } = require('../utils');

function hex2bin (hex) {
    return hex.toString().split('').map(h => (parseInt(h, 16).toString(2)).padStart(4, '0')).join('');
}

function bin2int (bin) {
    return (parseInt(bin, 2));
}

const TYPES = {
    sum: 0,
    product: 1,
    minimum: 2,
    maximum: 3,
    literal: 4,
    gt: 5,
    lt: 6,
    equal: 7,
};

function parseVersion (packet) {
    const vvv = packet.slice(0, 3);
    const version = bin2int(vvv);
    return version;
}

function parseType (packet) {
    const ttt = packet.slice(3, 6);
    const type = bin2int(ttt);
    return type;
}

function parseLengthType (packet) {
    const i = packet.slice(6, 7);
    return i;
}

function parseLengthOfSubs (packet) {
    const lll = packet.slice(7, 22);
    const length = bin2int(lll);
    return length;
}

function parseSizeOfSubs (packet) {
    const sss = packet.slice(7, 18);
    const size = bin2int(sss);
    return size;
}

function parseSubpacketsGroupBySize (packet) {
    return packet.slice(18, packet.length);
}

function parseSubpacketsGroupByLength (packet, length) {
    const group = packet.slice(22, 22 + length);
    return group;
}

function parseLiteral (packet) {
    const version = parseVersion(packet);
    const type = parseType(packet);
    const digits = [];
    let i = 6;
    while (packet[i] === '1') {
        digits.push(packet.slice(i + 1, i + 5));
        i += 5;
    };
    digits.push(packet.slice(i + 1, i + 5));
    i += 5;
    const number = bin2int(digits.join(''));
    const result = {
        version,
        type,
        isLiteral: true,
        number,
    };
    return { packet: result, size: i };
}

function parseOperator (packet) {
    const version = parseVersion(packet);
    const type = parseType(packet);
    const lengthType = parseLengthType(packet);

    let i = 0;
    const subpackets = [];
    if (lengthType === '0') {
        const length = parseLengthOfSubs(packet);
        const subpacketsGroup = parseSubpacketsGroupByLength(packet, length);
        while (i < length) {
            const { packet: subpacket, size } = parsePacket(subpacketsGroup.slice(i, i + length));
            i += size;
            subpackets.push(subpacket);
        };
        i += 7 + 15;
    } else {
        const size = parseSizeOfSubs(packet);
        const subpacketsGroup = parseSubpacketsGroupBySize(packet);
        const length = subpacketsGroup.length;
        for (let s = 0; s < size; s++) {
            const { packet: subpacket, size: sSize } = parsePacket(subpacketsGroup.slice(i, length));
            subpackets.push(subpacket);
            i += sSize;
        }
        i += 7 + 11;
    }

    const result = {
        version,
        type,
        isLiteral: false,
        subpackets,
    };
    return { packet: result, size: i };
}

function sumVers (packet) {
    if (packet.isLiteral) {
        return parseInt(packet.version, 10);
    }
    return parseInt(packet.version, 10) + sum(packet.subpackets.map(sub => sumVers(sub)));
}

function operate (packet) {
    const type = packet.type;
    let result;
    switch (type) {
        case TYPES.sum:
            if (packet.subpackets.length === 1) result = operate(packet.subpackets[0]);
            else result = sum(packet.subpackets.map(sub => operate(sub)));
            break;
        case TYPES.product:
            if (packet.subpackets.length === 1) result = operate(packet.subpackets[0]);
            else result = packet.subpackets.map(sub => operate(sub)).reduce((total, current) => total*current, 1);
            break;
        case TYPES.minimum:
            result = min(packet.subpackets.map(sub => operate(sub)));
            break;
        case TYPES.maximum:
            result = max(packet.subpackets.map(sub => operate(sub)));
            break;
        case TYPES.literal:
            result = packet.number;
            break;
        case TYPES.gt:
            const gt = packet.subpackets.map(sub => operate(sub));
            result = gt[0] > gt[1] ? 1 : 0;
            break;
        case TYPES.lt:
            const lt = packet.subpackets.map(sub => operate(sub));
            result = lt[0] < lt[1] ? 1 : 0;
            break;
        case TYPES.equal:
            const equal = packet.subpackets.map(sub => operate(sub));
            result = equal[0] === equal[1] ? 1 : 0;
            break;
    };
    return result;
}

function parsePacket (packet) {
    const type = parseType(packet);
    let parsedPacket;
    if (type === TYPES.literal) {
        parsedPacket = parseLiteral(packet);
    } else {
        parsedPacket = parseOperator(packet);
    }
    return parsedPacket;
}

function run (data, operations = false) {
    const { packet } = parsePacket(hex2bin(data));
    if (!operations)
        return sumVers(packet);
    return operate(packet);
}

function day16A (file) {
    const data = getInputData(file)[0];
    return run(data);
}

function day16B (file) {
    const data = getInputData(file);
    return run(data, true);
}

module.exports = {
    day16A,
    day16B,
    hex2bin,
    parseLengthOfSubs,
    parseSizeOfSubs,
    parseLiteral,
    parseOperator,
};
