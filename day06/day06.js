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
    const days = 256;
    const lanternfish = [];
    data[0].split(',').map(n => parseInt(n, 10)).forEach(fish => {
        const index = lanternfish.findIndex(group => group.days === fish);
        if (index > -1) {
            lanternfish[index].amount = lanternfish[index].amount + 1;
        } else {
            lanternfish.push({ days: fish, amount: 1 });
        }
    });
    for (let i = 0; i < days; i++) {
        let newBorns = 0;
        lanternfish.forEach((group, i) => {
            if (group.days > 0) {
                lanternfish[i].days = lanternfish[i].days - 1;
            } else {
                lanternfish[i].days = 6;
                newBorns += lanternfish[i].amount;
            }
        });
        if (newBorns > 0) {
            lanternfish.push({ days: 8, amount: newBorns });
        }
    }

    return lanternfish.reduce((total, current) => total + current.amount, 0);
}

module.exports = {
    day06A,
    day06B,
};
