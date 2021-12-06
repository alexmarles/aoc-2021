const { day06A, day06B } = require('./day06');

describe('Day 06 A', () => {
    it('should solve example', () => {
        const result = day06A('day06/exampleData');

        expect(result).toBe(5934);
    });

    it('should solve input', () => {
        const result = day06A('day06/inputData');

        expect(result).toBe(362666);
    });
});

describe('Day 06 B', () => {
    // it('should solve example', () => {
    //     const result = day06B('day06/exampleData');

    //     expect(result).toBe(12);
    // });

    // it('should solve input', () => {
    //     const result = day06B('day06/inputData');

    //     expect(result).toBe(21373);
    // });
});
