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

function day03B (file) {
    const data = getInputData(file).map(entry => entry.split('').map(n => parseInt(n, 10)));
    const positions = data[0].length;
    let oxygenRateArr = [...data];
    let co2RateArr = [...data];
    let i = 0;
    while (i < positions) {
        const transposed = transpose(oxygenRateArr);
        const sums = transposed.map(position => position.reduce((total, current) => total + current, 0));
        if (sums[i] >= oxygenRateArr.length / 2) { // Most common value is 1 or both
            if (oxygenRateArr.length > 1) oxygenRateArr = oxygenRateArr.filter(entry => entry[i] === 1);
            if (co2RateArr.length > 1) co2RateArr = co2RateArr.filter(entry => entry[i] === 0);
        } else { // Most common value is 0
            if (oxygenRateArr.length > 1) oxygenRateArr = oxygenRateArr.filter(entry => entry[i] === 0);
            if (co2RateArr.length > 1) co2RateArr = co2RateArr.filter(entry => entry[i] === 1);
        }
        i++;
    }
    const oxygenRate = toDecimal(oxygenRateArr.flat().join(''));
    const co2Rate = toDecimal(co2RateArr.flat().join(''));
    return oxygenRate * co2Rate;
}

module.exports = {
    day03A,
    day03B,
};
