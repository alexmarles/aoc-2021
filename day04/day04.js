/* Day 4 */
const { getInputData, max, min } = require('../utils');

function getDrawAndBoards (data) {
    const draw = data[0].split(',').map(n => parseInt(n, 10));
    const boards = [];
    let newBoard = [];
    const realBoards = [];
    let newRealBoard = [];
    for (let i = 2; i < data.length; i++) {
        if (data[i] === '') {
            boards.push(newBoard);
            realBoards.push(newRealBoard);
            newBoard = [];
            newRealBoard = [];
        } else {
            newBoard.push(data[i].trim().split(/\s+/).map(n => draw.indexOf(parseInt(n, 10))));
            newRealBoard.push(data[i].trim().split(/\s+/).map(n => parseInt(n, 10)));
        }
    }
    boards.push(newBoard);
    realBoards.push(newRealBoard);

    return {
        draw,
        boards,
        realBoards,
    };
}

function day04A (file) {
    const data = getInputData(file);
    const { draw, boards, realBoards } = getDrawAndBoards(data);

    const winners = boards.map(board => board.map(row => max(row)));
    const fastest = winners.map(winner => min(winner));

    const winBoard = fastest.indexOf(min(fastest));
    const winRow = winners[winBoard].indexOf(min(winners[winBoard]));
    const winIndex = boards[winBoard][winRow].indexOf(max(boards[winBoard][winRow]));

    const winNumber = draw[boards[winBoard][winRow][winIndex]];
    const drawn = draw.slice(0, draw.indexOf(winNumber) + 1);
    const unchecked = realBoards[winBoard].flat().filter(n => !drawn.includes(n));
    const sum = unchecked.reduce((total, current) => total + current, 0);
    console.log('winner', winBoard, winRow, winIndex);
    console.log('winNumber', winNumber);
    console.log(realBoards[winBoard]);
    console.log('drawn', drawn);
    console.log('unchecked', unchecked);
    console.log('sum', sum);

    return sum * winNumber;
}

function day04B (file) {
    const data = getInputData(file);
    const { draw, boards } = getDrawAndBoards(data);

    let loosers = Array.from(Array(Object.keys(boards).length).keys());
    console.log('LOOSERS', loosers);
    let i = 0;
    let n;
    let lastLooser;
    while (loosers.length > 0 && i < draw.length) {
        n = draw[i];
        boards.forEach((board, boardIndex) => {
            Object.keys(board).forEach(row => {
                if (board[row][n] === 'o') {
                    board[row][n] = 'x';
                }
                if (Object.values(board[row]).every(n => n === 'x')) {
                    loosers = loosers.filter(function(item) {
                        return item !== boardIndex;
                    });
                    lastLooser = boardIndex;
                    console.log('NUMBER', n);
                    console.log('BOARDS', boards);
                }
            });
        });

        i++;
    }
    const unmarked = [];
    Object.keys(boards[lastLooser]).forEach(row => {
        Object.keys(boards[lastLooser][row]).forEach(n => {
            if (boards[lastLooser][row][n] === 'o') {
                unmarked.push(parseInt(n, 10));
            }
        });
    });
    const sumOfUnmarked = unmarked.reduce((total, curr) => total + curr, 0);
    console.log('Looser', unmarked, sumOfUnmarked, n);
    return sumOfUnmarked * n;
}

module.exports = {
    day04A,
    day04B,
};
