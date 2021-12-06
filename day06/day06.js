/* Day 6 */
const { getInputData } = require('../utils');

function theCycleOfLife (data, days) {
    const lanternfish = Array(9).fill(0);
    data[0].split(',').map(n => parseInt(n, 10)).forEach(fish => {
        lanternfish[fish] = lanternfish[fish] + 1;
    });
    for (let i = 0; i < days; i++) {
        const finished = lanternfish.shift();
        lanternfish[6] = lanternfish[6] + finished;
        lanternfish.push(finished);
    }

    return lanternfish.reduce((total, current) => total + current, 0);
}

function day06A (file) {
    const data = getInputData(file);
    return theCycleOfLife(data, 80);
}

function day06B (file) {
    const data = getInputData(file);
    return theCycleOfLife(data, 256);
}

module.exports = {
    day06A,
    day06B,
};
