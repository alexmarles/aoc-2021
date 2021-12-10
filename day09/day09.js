/* Day 8 */
const { getInputData, sum } = require('../utils');

function day09A (file) {
    const data = getInputData(file).map(line => line.split('').map(n => parseInt(n, 10)));
    const dataInfo = data.map((row, i) => {
        return row.map((n, j) => {
            const adjacents = [];

            if (j === 0) adjacents.push([j + 1, i]);
            else if (j === row.length - 1) adjacents.push([j - 1, i]);
            else adjacents.push([j + 1, i], [j - 1, i]);

            if (i === 0) adjacents.push([j, i + 1]);
            else if (i === data.length - 1) adjacents.push([j, i - 1]);
            else adjacents.push([j, i + 1], [j, i - 1]);

            const lower = adjacents.filter(([y, x]) => data[x][y] <= n);
            return {
                risk: n + 1,
                lower,
            };
        });
    });
    // console.log(dataInfo.flat());
    const riskLevels = dataInfo.flat().filter(({ lower }) => lower.length === 0).map(({ risk }) => risk);
    // console.log(riskLevels);

    return sum(riskLevels);
}

function day09B (file) {
    const data = getInputData(file);
}

module.exports = {
    day09A,
    day09B,
};
