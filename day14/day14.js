/* Day 14 */
const { getInputData, max, min } = require('../utils');

function processPolymer (template, insertions, steps) {
    let polymer = template;
    for (let i = 0; i < steps; i++) {
        // insertions.forEach(([match, insert]) => {
        //     polymer = polymer.replace(match, `${match[0]}${insert}${match[1]}`);
        // });
        let i = 0;
        while (i < polymer.length - 1) {
            const position = insertions.map(([match, _]) => match).indexOf(polymer.slice(i, i + 2));
            if (position > -1) {
                polymer = polymer.slice(0, i + 1) + insertions[position][1] + polymer.slice(i + 1);
                i += 2;
            } else {
                i += 1;
            }
        }
    }
    return polymer;
}

function day14A (file) {
    const data = getInputData(file).join('\n');
    let [template, insertions] = data.split('\n\n');
    insertions = insertions.split('\n').map(insert => insert.split(' -> '));
    const polymer = processPolymer(template, insertions, 10);
    const times = {};
    polymer.split('').forEach(char => {
        if (times[char]) times[char] += 1;
        else times[char] = 1;
    });
    const maxTimes = max(Object.values(times));
    const minTimes = min(Object.values(times));
    return maxTimes - minTimes;
}

function day14B (file) {
}

module.exports = {
    day14A,
    day14B,
};
