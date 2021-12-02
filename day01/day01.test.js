const { day01A } = require('./day01');

describe('Day 01 A', () => {
    it('should solve example', () => {
        const result = day01A('day01/exampleData');

        expect(result).toBe(7);
    });

    it('should solve input', () => {
        const result = day01A('day01/inputData');

        expect(result).toBe(1342);
    });
});
