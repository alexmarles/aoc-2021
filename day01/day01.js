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

function day01B (file) {
    const data = getInputData(file);
    let incs = 0;

    function getWindow (index) {
        return parseInt(data[index-2], 10) + parseInt(data[index-1], 10) + parseInt(data[index], 10);
    }

    for(let i = 3; i <= data.length; i++) {
        if (getWindow(i) > getWindow(i-1)) {
            incs++;
        }
    }

    return incs;
}

module.exports = {
    day01A,
    day01B,
};
