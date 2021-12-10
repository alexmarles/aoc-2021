const { day09A, day09B } = require('./day09');

describe('Day 09 A', () => {
    it('should solve example', () => {
        const result = day09A('day09/exampleData');

        expect(result).toBe(15);
    });

    it('should solve input', () => {
        const result = day09A('day09/inputData');

        expect(result).toBe(535);
    });
});

describe('Day 09 B', () => {
    it('should solve example', () => {
        const result = day09B('day09/exampleData');

        expect(result).toBe(1134);
    });

    it('should solve input', () => {
        const result = day09B('day09/inputData');

        expect(result).toBe(1122700);
    });
});
