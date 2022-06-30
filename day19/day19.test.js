const { day19A, day19B } = require('./day19');

describe('Day 19 A', () => {
    it('should solve example', () => {
        const result = day19A('day19/exampleData');

        expect(result).toBe(79);
    });

    // it('should solve input', () => {
    //     const result = day19A('day19/inputData');

    //     expect(result).toBe(5565);
    // });
});

// describe('Day 19 B', () => {
//     it('should solve example', () => {
//         const result = day19B('day19/exampleData');

//         expect(result).toBe(112);
//     });

//     // it('should solve input', () => {
//     //     const result = day19B('day19/inputData');

//     //     expect(result).toBe(2118);
//     // });
// });
