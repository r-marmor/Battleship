import Game from './game.js';
import { BOARD_SIZE } from './helpers/helpers.js';
import Player from './players.mjs';


const p1Container = document.querySelector('.p1-container');
const p2Container = document.querySelector('.p2-container');

const game = Game();

const p1 = Player("Michel", player1, "human");
const p2 = Player("cpu123", player2, "cpu");

game.newGame();

const player1Board = game.getp1Board();
const player2Board = game.getp2Board();

// create player 1 gameboard
for (let i = BOARD_SIZE - 1; i >= 0; i--) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        const divs = document.createElement('div');
        divs.classList.add('p1_div');
        divs.dataset.row = i;
        divs.dataset.col = j;
        if (player1Board[i][j] !== null) {
        document.querySelector(`[data-row="${i}"][data-col="${j}"]`).style.backgroundColor = "black";
        }
        p1Container.appendChild(divs);
    }
}

// create player 2 gameboard
for (let i = BOARD_SIZE - 1; i >= 0 ; i--) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        const divs = document.createElement('div');
        divs.classList.add('p2_div');
        divs.dataset.row = i;
        divs.dataset.col = j;
        p2Container.appendChild(divs);
    }
}