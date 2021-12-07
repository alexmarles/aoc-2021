const { day07A, day07B } = require('./day07');

describe('Day 07 A', () => {
    it('should solve example', () => {
        const result = day07A('day07/exampleData');

        expect(result).toBe(37);
    });

    it('should solve input', () => {
        const result = day07A('day07/inputData');

        expect(result).toBe(328262);
    });
});

describe('Day 07 B', () => {
    it('should solve example', () => {
        const result = day07B('day07/exampleData');

        expect(result).toBe(168);
    });

    it('should solve input', () => {
        const result = day07B('day07/inputData');

        expect(result).toBe(90040997);
    });
});
