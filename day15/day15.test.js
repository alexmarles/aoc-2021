const { day15A, day15B } = require('./day15');

describe('Day 15 A', () => {
    it('should solve example', () => {
        const result = day15A('day15/exampleData');

        expect(result).toBe(40);
    });

    it('should solve input', () => {
        const result = day15A('day15/inputData');

        expect(result).toBe(739);
    });
});

describe('Day 15 B', () => {
    it('should solve example', () => {
        const result = day15B('day15/exampleData');

        expect(result).toBe(315);
    });

    it('should solve input', () => {
        const result = day15B('day15/inputData');

        expect(result).toBe(3040);
    });
});
