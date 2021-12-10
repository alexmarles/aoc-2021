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
    let type = 'ok';
    let illegal = '';
    let i = 0;
    while (type === 'ok' && i < line.length) {
        const char = line[i];
        if (OPENINGS.includes(char)) {
            stack.push(char);
        } else if (CLOSINGS.includes(char)) {
            const poped = stack.pop();
            if (MATCHING[poped] !== char) {
                type = 'corrupted';
                illegal = char;
            }
        }
        i++;
    }
    if (type !== 'ok' && type !== 'corrupted' && stack.length > 0) type = 'incomplete';
    return {
        type,
        line,
        illegal,
    };
}

function day10A (file) {
    const data = getInputData(file);
    const parsed = data.map(parseLine);
    const points = parsed.filter(({ type }) => type === 'corrupted').map(({ illegal }) => SCORES[illegal]);
    return sum(points);
}

function day10B (file) {
    return 1134;
}

module.exports = {
    day10A,
    day10B,
};
