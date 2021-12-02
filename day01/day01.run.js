const { day01A, day01B } = require('./day01');

function runDay01A () {
    const result = day01A('day01/inputData');
    return result;
}

function runDay01B () {
    const result = day01B('day01/inputData');
    return result;
}

module.exports = {
    runDay01A,
    runDay01B,
}
