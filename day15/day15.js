/* Day 15 */
const { getInputData, sum, min, transpose } = require('../utils');
const dijkstra = require('dijkstrajs');

function getNeighbors (x, y, maxX, maxY) {
    const neighbors = [];
    if (x === 0) {
        neighbors.push([y, x + 1]);
        if (y === 0) {
            neighbors.push([y + 1, x]);
        } else if (y === maxY) {
            neighbors.push([y - 1, x]);
        } else {
            neighbors.push([y + 1, x], [y - 1, x]);
        }
    } else if (x === maxX) {
        neighbors.push([y, x - 1]);
        if (y === 0) {
            neighbors.push([y + 1, x]);
        } else if (y === maxY) {
            neighbors.push([y - 1, x]);
        } else {
            neighbors.push([y + 1, x], [y - 1, x]);
        }
    } else {
        neighbors.push([y, x + 1], [y, x - 1]);
        if (y === 0) {
            neighbors.push([y + 1, x]);
        } else if (y === maxY) {
            neighbors.push([y - 1, x]);
        } else {
            neighbors.push([y - 1, x], [y + 1, x]);
        }
    }
    return neighbors;
}

function findMinCostFor ([x, y], grid, visited) {
    if (visited[`${x},${y}`]) return visited[`${x},${y}`];

    const maxX = grid[0].length - 1;
    const maxY = grid.length - 1;
    if (x === maxX && y === maxY) {
        visited[`${x},${y}`] = grid[y][x];
        return grid[y][x];
    }

    let adj = [];
    if (y < maxY) {
        adj.push([x, y + 1]);
    }
    if (x < maxX) {
        adj.push([x + 1, y]);
    }

    const pathCosts = adj.map(neighbor => findMinCostFor(neighbor, grid, visited));
    const value = (x === 0 && y == 0 ? 0 : grid[y][x]) + min(pathCosts);
    visited[`${x},${y}`] = value;
    return value;
}

function useCustom (grid) {
    const visited = {};
    const cost = findMinCostFor([0, 0], grid, visited);
    // console.log(grid[0]);
    // console.log(grid.map((line, y) => line.map((n, x) => ('00' + visited[`${x},${y}`]).slice(-3)).join('|')).join('\n'));
    return cost;
}

function useDijkstra (grid) {
    const graph = {};
    grid.forEach((row, y) => row.forEach((n, x) => {
        if (x < row.length - 1) {
            if (y < grid.length - 1) {
                graph[`${x},${y}`] = {
                    [`${x+1},${y}`]: grid[y][x+1],
                    [`${x},${y+1}`]: grid[y+1][x],
                };
            } else {
                graph[`${x},${y}`] = {
                    [`${x+1},${y}`]: grid[y][x+1],
                };
            }
        } else if (y < grid.length - 1) {
            graph[`${x},${y}`] = {
                [`${x},${y+1}`]: grid[y+1][x],
            };
        }
    }));
    const path = dijkstra.find_path(graph, '0,0', `${grid[0].length - 1},${grid.length - 1}`);
    // console.log(path);
    const costs = path.map(coord => JSON.parse(`[${coord}]`)).map(([x, y]) => grid[y][x]);

    return sum(costs.slice(1));
}

function run (data, reps = 1) {
    const initialGrid = data.map(line => line.split('').map(Number));
    let grid = [...initialGrid];
    for (let i = 1; i < reps; i++) {
        grid = grid.map((row, j) => row.concat(initialGrid[j].map(n => (n + i) > 9 ? (n + i - 9) : n + i)));
    }
    grid = transpose(grid);
    const middleGrid = [...grid];
    for (let i = 1; i < reps; i++) {
        grid = grid.map((row, j) => row.concat(middleGrid[j].map(n => (n + i) > 9 ? (n + i - 9) : n + i)));
    }
    grid = transpose(grid);

    return useCustom(grid);
    return useDijkstra(grid);
}

function day15A (file) {
    const data = getInputData(file);
    return run(data);
}

function day15B (file) {
    const data = getInputData(file);
    return run(data, 5);
}

module.exports = {
    day15A,
    day15B,
};
