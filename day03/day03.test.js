const { day03A } = require('./day03');

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
