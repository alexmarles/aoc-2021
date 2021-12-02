/* Day 1 */
const { getInputData } = require('../utils');

function day01A (file) {
    const data = getInputData(file);
    let incs = 0;

    for(let i = 1; i <= data.length; i++) {
        if (parseInt(data[i], 10) > parseInt(data[i-1], 10)) {
            incs++;
        }
    }

    return incs;
};

module.exports = {
    day01A,
};
