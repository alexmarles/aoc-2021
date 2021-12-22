/* Day 17 */
const { getInputData, max } = require('../utils');

function checkIfYHitsA (yVel, range) {
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
        const { hit, maxHeight } = checkIfYHitsA(yVel, range);
        if (hit) return maxHeight;
        yVel--;
    }
}

function checkIfYHits (yVel, yRange) {
    let yPos = 0;
    while (true) {
        yPos += yVel;
        yVel--;

        if (yPos < yRange.min) return false;
        if (yPos >= yRange.min && yPos <= yRange.max) return true;
    }
}

function calculateYHits(yRange) {
    const hits = [];
    const maxVel = max(Object.values(yRange).map(Math.abs));
    for (let yVel = -maxVel; yVel < maxVel; yVel++) {
        if (checkIfYHits(yVel, yRange)) hits.push(yVel);
    }
    return hits;
}

function checkHit (xVel, yVel, xRange, yRange) {
    const pos = { x: 0, y: 0 };
    while (true) {
        pos.x += xVel;
        pos.y += yVel;
        yVel--;
        if (xVel > 0) xVel -= 1;
        if (xVel < 0) xVel += 1;

        if (pos.y < yRange.min) return false;
        if ((pos.y >= yRange.min && pos.y <= yRange.max) && (pos.x >= xRange.min && pos.x <= xRange.max)) {
            return true;
        }
    }
}

function calculateXHits (xRange, yRange, yVels) {
    const xHits = [];
    const maxXVel = max(Object.values(xRange).map(v => Math.abs(v))) + 1;
    for (let xVel = -maxXVel; xVel < maxXVel; xVel++) {
        yVels.forEach(yVel => {
            if (checkHit(xVel, yVel, xRange, yRange)) xHits.push([xVel, yVel]);
        });
    }
    return xHits;
}

function run (data, getHighest = true) {
    const [_, ranges] = data[0].split(':').map(r => r.trim());
    const [xRange, yRange] = ranges
        .split(', ')
        .map(range => range
                        .split('=')[1]
                        .split('..')
                        .map(n => parseInt(n, 10)))
        .map(range => ({ min: range[0], max: range[1] }));

    if (getHighest) {
        const highest = calculateMaxHeight(yRange);
        return highest;
    }
    const yHits = calculateYHits(yRange);
    const xHits = calculateXHits(xRange, yRange, yHits);

    return xHits.length;
}

function day17A (file) {
    const data = getInputData(file);
    return run(data);
}

function day17B (file) {
    const data = getInputData(file);
    return run(data, false);
}

module.exports = {
    day17A,
    day17B,
};

//target area: x=20..30, y=-10..-5
