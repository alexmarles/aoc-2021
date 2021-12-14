const { day14A, day14B } = require('./day14');

describe('Day 14 A', () => {
    it('should solve example', () => {
        const result = day14A('day14/exampleData');

        expect(result).toBe(1588);
    });

    it('should solve input', () => {
        const result = day14A('day14/inputData');

        expect(result).toBe(5656);
    });
});

// describe('Day 14 B', () => {
//     it('should solve example', () => {
//         const result = day14B('day14/exampleData');

//         expect(result).toBe();
//     });

//     // it('should solve input', () => {
//     //     const result = day14B('day14/inputData');

//     //     expect(result).toBe();
//     // });
// });
