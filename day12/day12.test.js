const { day12A, day12B } = require('./day12');

describe('Day 12 A', () => {
    it('should solve example 1', () => {
        const result = day12A('day12/exampleData1');

        expect(result).toBe(10);
    });

    it('should solve example 2', () => {
        const result = day12A('day12/exampleData2');

        expect(result).toBe(19);
    });

    it('should solve example 3', () => {
        const result = day12A('day12/exampleData3');

        expect(result).toBe(226);
    });

    it('should solve input', () => {
        const result = day12A('day12/inputData');

        expect(result).toBe(4167);
    });
});

// describe('Day 12 B', () => {
//     it('should solve example', () => {
//         const result = day12B('day12/exampleData');

//         expect(result).toBe(288957);
//     });

//     // it('should solve input', () => {
//     //     const result = day12B('day12/inputData');

//     //     expect(result).toBe(2870201288);
//     // });
// });
