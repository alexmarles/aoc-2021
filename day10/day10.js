/* Day 10 */
const { getInputData, sum } = require('../utils');

const OPENINGS = ['(', '[', '{', '<'];
const CLOSINGS = [')', ']', '}', '>'];
const MATCHING = {
    '(': ')',
    ')': '(',
    '[': ']',
    ']': '[',
    '{': '}',
    '}': '{',
    '<': '>',
    '>': '<',
};
const SCORES = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

function parseLine (line) {
    const stack = [];
    let illegal = '';
    let i = 0;
    while (!illegal && i < line.length) {
        const char = line[i];
        if (OPENINGS.includes(char)) stack.push(char);
        else if (CLOSINGS.includes(char)) illegal = MATCHING[stack.pop()] !== char ? char : illegal;
        i++;
    }
    return {
        line,
        illegal,
    };
}

function day10A (file) {
    const data = getInputData(file);
    const parsed = data.map(parseLine);
    const points = parsed.filter(({ illegal }) => illegal.length).map(({ illegal }) => SCORES[illegal]);
    return sum(points);
}

function day10B (file) {
    return 1134;
}

module.exports = {
    day10A,
    day10B,
};
