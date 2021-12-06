/* Day 6 */
const { getInputData, max, min } = require('../utils');

function day06A (file) {
    const data = getInputData(file);
    const days = 80;
    let lanternfish = data[0].split(',').map(n => parseInt(n, 10));
    for (let i = 0; i < days; i++) {
        let newborns = [];
        lanternfish = lanternfish.map(fish => {
            if (fish > 0) {
                return fish - 1;
            }
            newborns.push(8);
            return 6;
        });
        lanternfish = lanternfish.concat(newborns);
        newborns = [];
    }

    return lanternfish.length;
}

function day06B (file) {
    const data = getInputData(file);
}

module.exports = {
    day06A,
    day06B,
};
