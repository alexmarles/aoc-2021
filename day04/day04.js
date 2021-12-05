/* Day 4 */
const { getInputData, max, min, transpose } = require('../utils');

function getDrawAndBoards (data) {
    const draw = data[0].split(',').map(n => parseInt(n, 10));
    const boards = { row: [], col: [] };
    let newBoard = [];
    const realBoards = [];
    let newRealBoard = [];
    for (let i = 2; i < data.length; i++) {
        if (data[i] === '') {
            boards.row.push(newBoard);
            realBoards.push(newRealBoard);
            newBoard = [];
            newRealBoard = [];
        } else {
            newBoard.push(data[i].trim().split(/\s+/).map(n => draw.indexOf(parseInt(n, 10))));
            newRealBoard.push(data[i].trim().split(/\s+/).map(n => parseInt(n, 10)));
        }
    }
    boards.row.push(newBoard);
    realBoards.push(newRealBoard);

    boards.col = boards.row.map(board => transpose(board));

    return {
        draw,
        boards,
        realBoards,
    };
}

function day04A (file) {
    const data = getInputData(file);
    const { draw, boards, realBoards } = getDrawAndBoards(data);

    const winners = {
        row: boards.row.map(board => board.map(row => max(row))),
        col: boards.col.map(board => board.map(col => max(col))),
    };
    const fastest = {
        row: winners.row.map(winner => min(winner)),
        col: winners.col.map(winner => min(winner)),
    };
    const dir = min(fastest.row) < min(fastest.col) ? 'row' : 'col';

    const winBoard = fastest[dir].indexOf(min(fastest[dir]));
    const winLine = winners[dir][winBoard].indexOf(min(winners[dir][winBoard]));
    const winIndex = boards[dir][winBoard][winLine].indexOf(max(boards[dir][winBoard][winLine]));

    const winNumber = draw[boards[dir][winBoard][winLine][winIndex]];
    const drawn = draw.slice(0, draw.indexOf(winNumber) + 1);
    const unchecked = realBoards[winBoard].flat().filter(n => !drawn.includes(n));
    const sum = unchecked.reduce((total, current) => total + current, 0);

    return sum * winNumber;
}

function day04B (file) {
    const data = getInputData(file);
    const { draw, boards, realBoards } = getDrawAndBoards(data);

    const winners = {
        row: boards.row.map(board => board.map(row => max(row))),
        col: boards.col.map(board => board.map(col => max(col))),
    };
    const fastest = {
        row: winners.row.map(winner => min(winner)),
        col: winners.col.map(winner => min(winner)),
    };
    const candidates = fastest.row.map((o, i) => o < fastest.col[i] ? { order: o, dir: 'row' } : { order: fastest.col[i], dir: 'col' });
    const directions = candidates.map(dir => dir.dir);
    const orders = candidates.map(dir => dir.order);
    const slowest = max(orders);
    const dir = directions[orders.indexOf(slowest)];

    const winBoard = fastest[dir].indexOf(slowest);
    const winLine = winners[dir][winBoard].indexOf(min(winners[dir][winBoard]));
    const winIndex = boards[dir][winBoard][winLine].indexOf(max(boards[dir][winBoard][winLine]));

    const winNumber = draw[boards[dir][winBoard][winLine][winIndex]];
    const drawn = draw.slice(0, draw.indexOf(winNumber) + 1);
    const unchecked = realBoards[winBoard].flat().filter(n => !drawn.includes(n));
    const sum = unchecked.reduce((total, current) => total + current, 0);

    return sum * winNumber;
}

module.exports = {
    day04A,
    day04B,
};
