const { day10A, day10B } = require('./day10');

describe('Day 10 A', () => {
    it('should solve example', () => {
        const result = day10A('day10/exampleData');

        expect(result).toBe(26397);
    });

    it('should solve input', () => {
        const result = day10A('day10/inputData');

        expect(result).toBe(364389);
    });
});

describe('Day 10 B', () => {
    it('should solve example', () => {
        const result = day10B('day10/exampleData');

        expect(result).toBe(288957);
    });

    it('should solve input', () => {
        const result = day10B('day10/inputData');

        expect(result).toBe(2870201088);
    });
});
