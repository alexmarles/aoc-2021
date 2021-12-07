/* Day 6 */
const { getInputData, max, sum, min } = require('../utils');

function day07A (file) {
    const data = getInputData(file);
    const hPositions = data[0].split(',').map(n => parseInt(n, 10));
    const maxPosition = max(hPositions);
    const totals = [];
    for (let i = 0; i < maxPosition; i++) {
        const diffs = hPositions.map(n => Math.abs(n - i));
        totals.push(sum(diffs));
    }
    return min(totals);
}

function day07B (file) {
    const data = getInputData(file);
    const hPositions = data[0].split(',').map(n => parseInt(n, 10));
    const maxPosition = max(hPositions);
    const totals = [];
    for (let i = 0; i < maxPosition; i++) {
        const diffs = hPositions.map(n => {
            const moves = Math.abs(n - i);
            const extra = sum(Array.from(Array(moves).keys()));
            return moves + extra;
        });
        totals.push(sum(diffs));
    }
    return min(totals);
}

module.exports = {
    day07A,
    day07B,
};
