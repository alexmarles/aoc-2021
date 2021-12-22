/* Day 17 */
const { getInputData, max } = require('../utils');

function checkIfYHits (yVel, range) {
    let yPos = 0;
    let maxHeight = -Infinity;
    let tooLow = false;
    while (!tooLow) {
        yPos += yVel;
        maxHeight = Math.max(maxHeight, yPos);
        yVel--;
        if (yPos >= range.min && yPos <= range.max) {
            return { hit: true, maxHeight };
        }
        tooLow = yPos < range.min;
    }
    return { hit: false };
}

function calculateMaxHeight (range) {
    // Initial Y velocity cannot be higher than the absolute value of the lowest point
    // If it shoots up, once it gets to half the way, velocity is already -(Initial Velocity)
    // This would make the next step to go too far and miss the target
    let yVel = max(Object.values(range).map(v => Math.abs(v)));
    while (true) {
        const { hit, maxHeight } = checkIfYHits(yVel, range);
        if (hit) return maxHeight;
        yVel--;
    }
}

function run (data) {
    const [_, ranges] = data[0].split(':').map(r => r.trim());
    const [xRange, yRange] = ranges
        .split(', ')
        .map(range => range
                        .split('=')[1]
                        .split('..')
                        .map(n => parseInt(n, 10)))
        .map(range => ({ min: range[0], max: range[1] }));

    const highest = calculateMaxHeight(yRange);
    return highest;
}

function day17A (file) {
    const data = getInputData(file);
    return run(data);
}

function day17B (file) {
    const data = getInputData(file);
    return run(data);
}

module.exports = {
    day17A,
    day17B,
};

//target area: x=20..30, y=-10..-5
