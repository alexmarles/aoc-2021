const { day11A, day11B } = require('./day11');

describe('Day 11 A', () => {
    it('should solve example', () => {
        const result = day11A('day11/exampleData');

        expect(result).toBe(1656);
    });

    it('should solve input', () => {
        const result = day11A('day11/inputData');

        expect(result).toBe(1562);
    });
});

describe('Day 11 B', () => {
    it('should solve example', () => {
        const result = day11B('day11/exampleData');

        expect(result).toBe(195);
    });

    it('should solve input', () => {
        const result = day11B('day11/inputData');

        expect(result).toBe(268);
    });
});
