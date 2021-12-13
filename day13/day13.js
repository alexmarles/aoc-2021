/* Day 13 */
const { getInputData } = require('../utils');

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
    const visible = coords.filter((coord, i, self) => self.indexOf(coord) === i);
    return visible.length;
}

function day13B (file) {
}

module.exports = {
    day13A,
    day13B,
};
