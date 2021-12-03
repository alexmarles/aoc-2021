/* Day 2 */
const { getInputData } = require('../utils');

function day02A (file) {
    const DIRECTIONS = {
        forward: ({ x, y }, steps) => ({ x: x + steps, y }),
        down: ({ x, y }, steps) => ({ x, y: y + steps }),
        up: ({ x, y }, steps) => ({ x, y: y - steps }),
    };

    const data = getInputData(file);
    let position = { x: 0, y: 0 };
    data.map(entry => ({ dir: entry.split(' ')[0], steps: parseInt(entry.split(' ')[1], 10) }))
        .forEach(({ dir, steps }) => {
            position = DIRECTIONS[dir](position, steps);
        });
    return position.x * position.y;
};

module.exports = {
    day02A,
};
