/* Day 5 */
const { getInputData, max, min, transpose } = require('../utils');

function day05A (file) {
    const data = getInputData(file);
    const lines = data.map(line => {
        const [coord1, coord2] = line.split('->');
        const [x1, y1] = coord1.split(',').map(n => parseInt(n, 10));
        const [x2, y2] = coord2.split(',').map(n => parseInt(n, 10));
        let newLine;
        if (x1 === x2) {
            const start = min([y1, y2]);
            const end = max([y1, y2]);
            newLine = Array.from({ length: end - start + 1 }, (_, i) => [x1, start + i]);
        } else if (y1 === y2) {
            const start = min([x1, x2]);
            const end = max([x1, x2]);
            newLine = Array.from({ length: end - start + 1 }, (_, i) => [start + i, y1]);
        } else {
            return undefined;
        }
        return newLine;
    }).filter(l => !!l);
    const allX = lines.map(line => line.map(point => point[0]).flat()).flat();
    const allY = lines.map(line => line.map(point => point[1]).flat()).flat();
    const maxCoords = {
        x: max(allX),
        y: max(allY),
    };
    const board = Array(maxCoords.y + 1).fill().map(() => Array(maxCoords.x + 1).fill('.'));
    lines.forEach(line => {
        line.forEach(coord => {
            let [x, y] = coord;
            board[y][x] = board[y][x] === '.' ? 1 : board[y][x] + 1;
        });
    });
    return board.flat().filter(n => n > 1).length;
}

function day05B (file) {

}

module.exports = {
    day05A,
    day05B,
};
