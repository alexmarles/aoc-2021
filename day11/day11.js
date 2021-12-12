/* Day 11 */
const { getInputData, sum } = require('../utils');

function toGrid (data) {
    return data.map((row, y) => row.split('').map((col, x) => {
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
}

function getFlashed (grid) {
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

    return [grid, flashed.length];
}

function day11A (file) {
    const data = getInputData(file);
    let grid = toGrid(data);

    const steps = 100;
    let flashes = 0;
    for (let i = 0; i < steps; i++) {
        let flashed = [];
        [grid, flashed] = getFlashed(grid);
        flashes += flashed;
    }
    return flashes;
}

function day11B (file) {
    const data = getInputData(file);
    let grid = toGrid(data);
    const total = sum(grid.map(row => row.length));

    let allFlash = false;
    let step = 0;
    while (!allFlash) {
        let flashed = [];
        [grid, flashed] = getFlashed(grid);
        allFlash = flashed === total;
        step++;
    }
    return step;
}

module.exports = {
    day11A,
    day11B,
};
