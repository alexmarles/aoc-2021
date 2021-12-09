/* Day 8 */
const { getInputData, sum } = require('../utils');

function day08A (file) {
    const COMBINATIONS = {
        2: 1,
        3: 7,
        4: 4,
        7: 8,
    };

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
    const data = getInputData(file);
    const segments = [];
    const outputs = [];
    data.forEach(line => {
        const parts = line.split('|').map(part => part.trim().split(' ').map(digit => digit.split('').sort().join('')));
        segments.push(parts[0]);
        outputs.push(parts[1]);
    });
    const result = segments.map((segment, i) => {
        const dictionary = Array(10).fill(null);
        const scrambled = segment;
        dictionary[1] = scrambled.filter(n => n.length === 2)[0];
        dictionary[4] = scrambled.filter(n => n.length === 4)[0];
        dictionary[7] = scrambled.filter(n => n.length === 3)[0];
        dictionary[8] = scrambled.filter(n => n.length === 7)[0];
        let others = scrambled.filter(n => n !== dictionary[1] &&n !== dictionary[4] && n !== dictionary[7] && n !== dictionary[8])
        dictionary[3] = others.filter(n => n.split('').filter(m => !dictionary[1].includes(m)).join('').length === 3)[0];
        others = others.filter(n => n !== dictionary[3]);
        dictionary[6] = others.filter(n => n.split('').filter(m => !dictionary[1].includes(m)).join('').length === 5)[0];
        others = others.filter(n => n !== dictionary[6]);
        dictionary[5] = others.filter(n => n.split('').filter(m => !dictionary[6].includes(m)).join('').length === 0)[0];
        others = others.filter(n => n !== dictionary[5]);
        dictionary[2] = others.filter(n => n.length === 5 && n !== dictionary[3] && n !== dictionary[5])[0];
        others = others.filter(n => n !== dictionary[2]);
        dictionary[0] = others.filter(n => n.split('').filter(m => !dictionary[5].includes(m)).join('').length === 2)[0];
        others = others.filter(n => n !== dictionary[0]);
        dictionary[9] = others.filter(n => n.split('').filter(m => !dictionary[3].includes(m)).join('').length === 1)[0];
        others = others.filter(n => n !== dictionary[9]);
        return parseInt(outputs[i].map(n => dictionary.indexOf(n)).join(''), 10);
    });


    return sum(result);
}

module.exports = {
    day08A,
    day08B,
};
