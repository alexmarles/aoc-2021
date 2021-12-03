const { day02A, day02B } = require('./day02');

describe('Day 02 A', () => {
    it('should solve example', () => {
        const result = day02A('day02/exampleData');

        expect(result).toBe(150);
    });

    it('should solve input', () => {
        const result = day02A('day02/inputData');

        expect(result).toBe(1727835);
    });
});

describe('Day 02 B', () => {
    it('should solve example', () => {
        const result = day02B('day02/exampleData');

        expect(result).toBe(900);
    });

    it('should solve input', () => {
        const result = day02B('day02/inputData');

        expect(result).toBe(1544000595);
    });
});
