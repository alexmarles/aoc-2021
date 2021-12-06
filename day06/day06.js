/* Day 6 */
const { getInputData } = require('../utils');

function theCycleOfLife (data, days) {
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
