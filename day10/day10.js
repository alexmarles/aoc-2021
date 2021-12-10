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
    const missing = stack.reverse().map(char => MATCHING[char]);
    return {
        line,
        illegal,
        stack,
        missing,
    };
}

function day10A (file) {
    const SCORES = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };
    const data = getInputData(file);
    const parsed = data.map(parseLine);
    const points = parsed.filter(({ illegal }) => illegal.length).map(({ illegal }) => SCORES[illegal]);
    return sum(points);
}

function day10B (file) {
    const SCORES = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    };
    function evalScore (total, current) {
        return total * 5 + SCORES[current];
    }
    const data = getInputData(file);
    const parsed = data.map(parseLine);
    let totalScore = 0;
    const points = parsed.filter(({ illegal, missing }) => !illegal && missing.length)
                    .map(({ missing }) => missing.reduce(evalScore, totalScore));
    const middlePoint = points.sort((a, b) => b - a)[Math.floor(points.length / 2)];
    return middlePoint;
}

module.exports = {
    day10A,
    day10B,
};
