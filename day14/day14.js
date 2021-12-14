/* Day 14 */
const { getInputData, sum, max, min } = require('../utils');

function getPairs (stringName, prevCount = 1) {
    let i = 0;
    const newPairs = {};
    while (i < stringName.length - 1) {
        const pair = stringName.slice(i, i + 2);
        newPairs[pair] = !!newPairs[pair] ? newPairs[pair] + prevCount : prevCount;
        i++;
    }
    return newPairs;
}

function processPolymer (template, insertions, steps) {
    const pairs = getPairs(template);
    let lastPair = template.slice(-2);
    for (let i = 0; i < steps; i++) {
        const newPairs = {};
        insertions.forEach(([match, insert]) => {
            if (!!pairs[match]) {
                const currentCount = pairs[match];
                delete pairs[match];
                const combination = `${match[0]}${insert}${match[1]}`;
                if (lastPair === match) {
                    lastPair = `${insert}${match[1]}`;
                }
                const extraPairs = getPairs(combination, currentCount);
                for (const pair in extraPairs) {
                    newPairs[pair] = !!newPairs[pair] ? newPairs[pair] + extraPairs[pair] : extraPairs[pair];
                }
            }
        });
        for (const pair in newPairs) {
            pairs[pair] = !!pairs[pair] ? pairs[pair] + newPairs[pair] : newPairs[pair];
        }
    }

    return [pairs, lastPair];
}

function run (data, steps = 10) {
    let [template, insertions] = data.split('\n\n');
    insertions = insertions.split('\n').map(insert => insert.split(' -> '));
    const [pairs, lastPair] = processPolymer(template, insertions, steps);
    const times = {};
    for (const pair in pairs) {
        const char = pair[0];
        times[char] = (times[char] || 0) + pairs[pair];
        if (pair === lastPair) {
            const finalChar = pair[1];
            times[finalChar] = (times[finalChar] || 0) + 1;
        }
    }
    const maxTimes = max(Object.values(times));
    const minTimes = min(Object.values(times));
    return maxTimes - minTimes;
}

function day14A (file) {
    const data = getInputData(file).join('\n');
    return run(data);
}

function day14B (file) {
    const data = getInputData(file).join('\n');
    return run(data, 40);
}

module.exports = {
    day14A,
    day14B,
};
