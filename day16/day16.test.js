const { day16A, day16B, hex2bin, parseLengthOfSubs, parseSizeOfSubs, parseLiteral, parseOperator } = require('./day16');

describe('Functions', () => {
    const tests = [
        ['D2FE28', '110100101111111000101000'],
        ['38006F45291200', '00111000000000000110111101000101001010010001001000000000'],
    ];

    it.each(tests)('should parse hex "%s" to bin "%s"', (input, expected) => {
        const result = hex2bin(input);

        expect(result).toBe(expected);
    });

    it('should parse length of subpackets', () => {
        const packet = '00111000000000000110111101000101001010010001001000000000';
        const expected = 27;
        const result = parseLengthOfSubs(packet);

        expect(result).toBe(expected);
    });

    it('should parse size of subpackets', () => {
        const packet = '11101110000000001101010000001100100000100011000001100000';
        const expected = 3;
        const result = parseSizeOfSubs(packet);

        expect(result).toBe(expected);
    });

    it('should parse literals', () => {
        const expected = {
            packet: {
                version: 6,
                type: 4,
                isLiteral: true,
                number: 2021,
            },
            size: 21,
        };
        const result = parseLiteral('110100101111111000101000');

        expect(result).toEqual(expected);
    });

    it('should parse operators', () => {
        const expected = {
            packet: {
                version: 1,
                type: 6,
                isLiteral: false,
                subpackets: [{
                    version: 6,
                    type: 4,
                    isLiteral: true,
                    number: 10,
                },
                {
                    version: 2,
                    type: 4,
                    isLiteral: true,
                    number: 20,
                }],
            },
            size: 49,
        };

        const result = parseOperator('00111000000000000110111101000101001010010001001000000000');

        expect(result).toEqual(expected);
    });
});

describe('Day 16 A', () => {
    it('should solve example 1', () => {
        const result = day16A('day16/exampleData1');

        expect(result).toBe(16);
    });

    it('should solve example 2', () => {
        const result = day16A('day16/exampleData2');

        expect(result).toBe(12);
    });

    it('should solve example 3', () => {
        const result = day16A('day16/exampleData3');

        expect(result).toBe(23);
    });

    it('should solve example 4', () => {
        const result = day16A('day16/exampleData4');

        expect(result).toBe(31);
    });

    it('should solve input', () => {
        const result = day16A('day16/inputData');

        expect(result).toBe(1007);
    });
});

describe('Day 16 B', () => {
    it('should solve example 5', () => {
        const result = day16B('day16/exampleData5');

        expect(result).toBe(3);
    });

    it('should solve example 6', () => {
        const result = day16B('day16/exampleData6');

        expect(result).toBe(54);
    });

    it('should solve example 7', () => {
        const result = day16B('day16/exampleData7');

        expect(result).toBe(7);
    });

    it('should solve example 8', () => {
        const result = day16B('day16/exampleData8');

        expect(result).toBe(9);
    });

    it('should solve example 9', () => {
        const result = day16B('day16/exampleData9');

        expect(result).toBe(1);
    });

    it('should solve example 10', () => {
        const result = day16B('day16/exampleData10');

        expect(result).toBe(0);
    });

    it('should solve example 11', () => {
        const result = day16B('day16/exampleData11');

        expect(result).toBe(0);
    });

    it('should solve example 12', () => {
        const result = day16B('day16/exampleData12');

        expect(result).toBe(1);
    });

    it('should solve input', () => {
        const result = day16B('day16/inputData');

        expect(result).toBe(834151779165);
    });
});
