/* Day 1 */
const { getInputData } = require('../utils');

function day01A (file) {
    const data = getInputData(file);
    let incs = 0;

    data.map(num => parseInt(num, 10)).reduce((prev, current) => {
        if (prev && prev < current) incs++;
        return current
    });

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
