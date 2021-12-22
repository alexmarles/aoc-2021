const { day17A, day17B } = require('./day17');

describe('Day 17 A', () => {
    it('should solve example', () => {
        const result = day17A('day17/exampleData');

        expect(result).toBe(45);
    });

    it('should solve input', () => {
        const result = day17A('day17/inputData');

        expect(result).toBe(5565);
    });
});

describe('Day 17 B', () => {
    it('should solve example', () => {
        const result = day17B('day17/exampleData');

        expect(result).toBe(112);
    });

    it('should solve input', () => {
        const result = day17B('day17/inputData');

        expect(result).toBe(2118);
    });
});
