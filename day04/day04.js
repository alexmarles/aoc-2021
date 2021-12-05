/* Day 4 */
const { getInputData, transpose } = require('../utils');

function day04A (file) {
    const data = getInputData(file);
    const draw = data[0].split(',');
    const boards = [];
    let newBoard = {};
    for (let i = 2; i < data.length; i++) {
        if (data[i] === '') {
            boards.push(newBoard);
            newBoard = {};
        } else {
            const row = Object.keys(newBoard).length;
            newBoard[row] = {};
            data[i].trim().split(/\s+/).forEach(n => {
                newBoard[row][n] = 'o';
            });
        }
    }
    boards.push(newBoard);

    let winner = null;
    let i = 0;
    while (!winner && i < draw.length) {
        const n = draw[i];
        boards.forEach((board, boardIndex) => {
            Object.keys(board).forEach(row => {
                if (board[row][n] === 'o') {
                    board[row][n] = 'x';
                }
                if (Object.values(board[row]).every(n => n === 'x')) {
                    winner = { board: boardIndex, row, n };
                }
            });
        });

        i++;
    }
    const unmarked = [];
    Object.keys(boards[winner.board]).forEach(row => {
        Object.keys(boards[winner.board][row]).forEach(n => {
            if (boards[winner.board][row][n] === 'o') {
                unmarked.push(parseInt(n, 10));
            }
        });
    });
    const sumOfUnmarked = unmarked.reduce((total, curr) => total + curr, 0);
    return sumOfUnmarked * winner.n;
}

function day04B (file) {
}

module.exports = {
    day04A,
    day04B,
};
