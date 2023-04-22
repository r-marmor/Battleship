import Game from './game.js';
import { BOARD_SIZE } from './helpers/helpers.js';

const gameboardsContainer = document.querySelector('.gameboards-container');

const createBoards = () => {
    const divp1 = document.createElement('div');
    divp1.classList.add('p1-container');

    const divp2 = document.createElement('div');
    divp2.classList.add('p2-container');

    gameboardsContainer.appendChild(divp1);
    gameboardsContainer.appendChild(divp2);
};

createBoards();


const p1Container = document.querySelector('.p1-container');
const p2Container = document.querySelector('.p2-container');

const switchPlayerBtn = document.querySelector('.switch_player');

const game = Game("human", "cpu");

const p1Board = game.getp1Board();
const p2Board = game.getp2Board();


switchPlayerBtn.addEventListener('click', () => {
    clearBoards();
    createBoards();
    setGameboards(p2Board, p1Board);
});
  

// create gameboards
const setGameboards = (leftBoard, rightBoard) => {
    for (let i = BOARD_SIZE - 1; i >= 0; i--) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            // p1 board
            const divp1 = document.createElement('div');
            divp1.classList.add('p1_div');
            divp1.dataset.row = i;
            divp1.dataset.col = j;
            // p2 board
            const divp2 = document.createElement('div');
            divp2.classList.add('p2_div');
            divp2.dataset.row = i;
            divp2.dataset.col = j;
            // display ships on board for player 1
            if (leftBoard[i][j] !== null) {
            divp1.style.backgroundColor = "black";
            divp1.style.border = "1px solid white";
            }
            // if (rightBoard[i][j] == "X") {
            //     divp2.style.backgroundColor = "red";
            // } else if (rightBoard[i][j] == "O") {
            //     divp2.style.backgroundColor = "green";
            // }
            p1Container.appendChild(divp1);
            p2Container.appendChild(divp2);
        }
    }
};

setGameboards(p1Board, p2Board);

