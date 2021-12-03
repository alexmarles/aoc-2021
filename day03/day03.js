/* Day 3 */
const { getInputData, toDecimal, transpose } = require('../utils');

function day03A (file) {
    const data = getInputData(file);
    const transposed = transpose(data.map(entry => entry.split('')));
    const repetitions = transposed.map(position => position.reduce((total, current) => total + parseInt(current, 10), 0));
    const gammaRateArr = [];
    const epsilonRateArr = [];
    repetitions.forEach(rep => {
        gammaRateArr.push(rep > data.length / 2 ? 1 : 0);
        epsilonRateArr.push(rep <= data.length / 2 ? 1 : 0);
    });
    const gammaRate = toDecimal(gammaRateArr.join(''));
    const epsilonRate = toDecimal(epsilonRateArr.join(''));

    return gammaRate * epsilonRate;
}

module.exports = {
    day03A,
};
