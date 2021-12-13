const { day13A, day13B } = require('./day13');

describe('Day 13 A', () => {
    it('should solve example', () => {
        const result = day13A('day13/exampleData');

        expect(result).toBe(17);
    });

    it('should solve input', () => {
        const result = day13A('day13/inputData');

        expect(result).toBe(655);
    });
});

describe('Day 13 B', () => {
    it('should solve example', () => {
        const result = day13B('day13/exampleData');

        expect(result).toBe(`
█████
█...█
█...█
█...█
█████`);
    });

    it('should solve input', () => {
        const result = day13B('day13/inputData');

        expect(result).toBe(`
..██.███..████..██..█..█..██..█..█.███.
...█.█..█....█.█..█.█..█.█..█.█..█.█..█
...█.█..█...█..█....█..█.█..█.█..█.█..█
...█.███...█...█....█..█.████.█..█.███.
█..█.█....█....█..█.█..█.█..█.█..█.█.█.
.██..█....████..██...██..█..█..██..█..█`);
    });
});
