const { day18A, day18B } = require('./day18');

describe('Day 18 A', () => {
    it('should solve example', () => {
        const result = day18A('day18/exampleData2');

        expect(result).toBe(4140);
    });

    // it('should solve input', () => {
    //     const result = day18A('day18/inputData');

    //     expect(result).toBe(739);
    // });
});

// describe('Day 18 B', () => {
//     it('should solve example', () => {
//         const result = day18B('day18/exampleData');

//         expect(result).toBe(318);
//     });

//     // it('should solve input', () => {
//     //     const result = day18B('day18/inputData');

//     //     expect(result).toBe(3038);
//     // });
// });
