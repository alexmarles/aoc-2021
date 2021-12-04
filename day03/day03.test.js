const { day03A, day03B } = require('./day03');

describe('Day 03 A', () => {
    it('should solve example', () => {
        const result = day03A('day03/exampleData');

        expect(result).toBe(198);
    });

    it('should solve input', () => {
        const result = day03A('day03/inputData');

        expect(result).toBe(2498354);
    });
});

describe('Day 03 B', () => {
    it('should solve example', () => {
        const result = day03B('day03/exampleData');

        expect(result).toBe(230);
    });

    it('should solve input', () => {
        const result = day03B('day03/inputData');

        expect(result).toBe(674412);
    });
});
