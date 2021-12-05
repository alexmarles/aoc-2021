const { day05A, day05B } = require('./day05');

describe('Day 05 A', () => {
    it('should solve example', () => {
        const result = day05A('day05/exampleData');

        expect(result).toBe(5);
    });

    it('should solve input', () => {
        const result = day05A('day05/inputData');

        expect(result).toBe(7380);
    });
});

describe('Day 05 B', () => {
    // it('should solve example', () => {
    //     const result = day05B('day05/exampleData');

    //     expect(result).toBe(1924);
    // });

    // it('should solve input', () => {
    //     const result = day05B('day05/inputData');

    //     expect(result).toBe(17435);
    // });
});
