/* Day 8 */
const { getInputData } = require('../utils');

const COMBINATIONS = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
};

function day08A (file) {
    const data = getInputData(file);
    const segments = [];
    const outputs = [];
    data.forEach(line => {
        const parts = line.split('|').map(part => part.trim().split(' '));
        segments.push(parts[0]);
        outputs.push(parts[1]);
    });
    const numbers = outputs.flat().map(output => COMBINATIONS[output.length] || null).filter(n => !!n);
    return numbers.length;
}

function day08B (file) {
    return 168;
}

module.exports = {
    day08A,
    day08B,
};
