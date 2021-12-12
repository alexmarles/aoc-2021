/* Day 11 */
const { getInputData } = require('../utils');

function day11A (file) {
    const data = getInputData(file);
    let grid = data.map((row, y) => row.split('').map((col, x) => {
        const neighbors = [];
        if (x === 0) {
            neighbors.push([y, x + 1]);
            if (y === 0) {
                neighbors.push([y + 1, x + 1], [y + 1, x]);
            } else if (y === data.length - 1) {
                neighbors.push([y - 1, x + 1], [y - 1, x]);
            } else {
                neighbors.push([y + 1, x + 1], [y + 1, x], [y - 1, x + 1], [y - 1, x]);
            }
        } else if (x === row.length - 1) {
            neighbors.push([y, x - 1]);
            if (y === 0) {
                neighbors.push([y + 1, x - 1], [y + 1, x]);
            } else if (y === data.length - 1) {
                neighbors.push([y - 1, x - 1], [y - 1, x]);
            } else {
                neighbors.push([y + 1, x - 1], [y + 1, x], [y - 1, x - 1], [y - 1, x]);
            }
        } else {
            neighbors.push([y, x + 1], [y, x - 1]);
            if (y === 0) {
                neighbors.push([y + 1, x + 1], [y + 1, x - 1], [y + 1, x]);
            } else if (y === data.length - 1) {
                neighbors.push([y - 1, x + 1], [y - 1, x - 1], [y - 1, x]);
            } else {
                neighbors.push([y - 1, x + 1], [y - 1, x - 1], [y - 1, x], [y + 1, x + 1], [y + 1, x - 1], [y + 1, x]);
            }
        }
        return {
            value: parseInt(col, 10),
            neighbors,
        };
    }));

    // console.log(grid.map(row => row.map(col => col.value).join('')).join('\n'));
    const steps = 100;
    let flashes = 0;
    for (let i = 0; i < steps; i++) {
        const flashed = [];

        function energize ([y, x]) {
            if (grid[y][x].value !== 'x') {
                grid[y][x].value = (grid[y][x].value + 1) % 10;
                if (grid[y][x].value === 0) {
                    grid[y][x].value = 'x';
                    flashed.push(`[${y}, ${x}]`);
                    grid[y][x].neighbors.forEach(energize);
                }
            }
        }

        grid.forEach((row, y) => {
            return row.forEach((member, x) => {
                energize([y, x]);
                if (member.value === 'x') {
                    grid[y][x].value = 0;
                }
            });
        });

        flashed.forEach(pos => {
            const [y, x] = JSON.parse(pos);
            grid[y][x].value = 0;
        });
        flashes += flashed.length
    }
    return flashes;
}

function day11B (file) {
}

module.exports = {
    day11A,
    day11B,
};
