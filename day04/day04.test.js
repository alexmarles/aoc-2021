const { day04A, day04B } = require('./day04');

describe('Day 04 A', () => {
    it('should solve example', () => {
        const result = day04A('day04/exampleData');

        expect(result).toBe(4512);
    });

    it('should solve input', () => {
        const result = day04A('day04/inputData');

        expect(result).toBe(60368);
    });
});

// describe('Day 04 B', () => {
//     it('should solve example', () => {
//         const result = day04B('day04/exampleData');

//         expect(result).toBe(230);
//     });

//     it('should solve input', () => {
//         const result = day04B('day04/inputData');

//         expect(result).toBe(674412);
//     });
// });
