/* Day 13 */
const { getInputData, max } = require('../utils');

function day13A (file) {
    const data = getInputData(file);
    const coords = data.filter(line => !line.startsWith('fold') && line !== '');
    const folds = data.filter(line => line.startsWith('fold')).map(line => line.replace('fold along ', ''));

    [folds[0]].forEach(fold => {
        const axis = fold.includes('x=') ? 0 : 1;
        const cut = parseInt(fold.replace('x=', '').replace('y=', ''), 10);
        coords.forEach((rawCoord, i) => {
            const coord = JSON.parse(`[${rawCoord}]`);
            const otherAxis = (axis + 1) % 2;
            let stringCoord = [];
            stringCoord[axis] = coord[axis] > cut ? cut - (coord[axis] - cut) : coord[axis];
            stringCoord[otherAxis] = coord[otherAxis];
            coords[i] = `${stringCoord[0]},${stringCoord[1]}`;
        });
    });
    const unique = new Set(coords);
    return unique.size;
}

function day13B (file) {
    const data = getInputData(file);
    let coords = data.filter(line => !line.startsWith('fold') && line !== '');
    const folds = data.filter(line => line.startsWith('fold')).map(line => line.replace('fold along ', ''));

    folds.forEach(fold => {
        const axis = fold.includes('x=') ? 0 : 1;
        const cut = parseInt(fold.replace('x=', '').replace('y=', ''), 10);
        coords.forEach((rawCoord, i) => {
            const coord = JSON.parse(`[${rawCoord}]`);
            const otherAxis = (axis + 1) % 2;
            let stringCoord = [];
            stringCoord[axis] = coord[axis] > cut ? cut - (coord[axis] - cut) : coord[axis];
            stringCoord[otherAxis] = coord[otherAxis];
            coords[i] = `${stringCoord[0]},${stringCoord[1]}`;
        });
        coords = [...new Set(coords)];
    });
    const unique = new Set(coords);
    const points = [...unique].map(coord => JSON.parse(`[${coord}]`));
    const maxX = max(points.map(coord => coord[0]));
    const maxY = max(points.map(coord => coord[1]));
    const matrix = Array(maxY + 1).fill([]);
    matrix.forEach((row, i) => {
        matrix[i] = Array(maxX + 1).fill('.');
    });
    points.forEach(([x, y]) => {
        matrix[y][x] = '█';
    });
    const text = `\n${matrix.map(row => row.join('')).join('\n')}`;

    return text;
}

module.exports = {
    day13A,
    day13B,
};
