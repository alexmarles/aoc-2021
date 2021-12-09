const { day08A, day08B } = require('./day08');

describe('Day 08 A', () => {
    it('should solve example', () => {
        const result = day08A('day08/exampleData');

        expect(result).toBe(26);
    });

    it('should solve input', () => {
        const result = day08A('day08/inputData');

        expect(result).toBe(445);
    });
});

describe('Day 08 B', () => {
    it('should solve example', () => {
        const result = day08B('day08/exampleData');

        expect(result).toBe(168);
    });

    // it('should solve input', () => {
    //     const result = day08B('day08/inputData');

    //     expect(result).toBe(90040997);
    // });
});
