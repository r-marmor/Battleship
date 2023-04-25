import Game from './game.js';
import { BOARD_SIZE, randNum } from './helpers/helpers.js';


// selectors
const gameboardsContainer = document.getElementById('gameboards-container');
const startGameBtn = document.querySelector('.btn-start-game');
const switchPlayerBtn = document.querySelector('.switch_player');
const turnMessage = document.querySelector('.message');
const p1ShotMessage = document.querySelector('.player1-message');
const p2ShotMessage = document.querySelector('.player2-message');


const game = Game();

const p1Gameboard = game.getPlayer1().getPlayerGameboard();
const p2Gameboard = game.getPlayer2().getPlayerGameboard();
const p1Board = game.getPlayer1().getPlayerBoard();
const p2Board = game.getPlayer2().getPlayerBoard();

// setup start game button
startGameBtn.addEventListener('click', () => {
    setGameboards(p1Board, p2Board);
});

const createBoards = () => {
    const divp1 = document.createElement('div');
    divp1.classList.add('p1-container');

    const divp2 = document.createElement('div');
    divp2.classList.add('p2-container');

    gameboardsContainer.appendChild(divp1);
    gameboardsContainer.appendChild(divp2);
};

createBoards();

const clearBoards = () => {
    while (gameboardsContainer.firstChild) {
        gameboardsContainer.removeChild(gameboardsContainer.firstChild);
    }
};

const p1Container = document.querySelector('.p1-container');
const p2Container = document.querySelector('.p2-container');

let currentPlayer = 1;

switchPlayerBtn.addEventListener('click', () => {
    clearBoards();
    createBoards();
    if (currentPlayer === 1) {
    setGameboards(p2Board, p1Board);
    currentPlayer = 2;
    } else {
    setGameboards(p1Board, p2Board);
    currentPlayer = 1;
    }
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
                if (leftBoard[i][j] === "O") {
                    divp1.style.backgroundColor = "green";
                } else if (leftBoard[i][j] === "X") {
                    divp1.style.backgroundColor = "red";
                } else {
                    divp1.style.backgroundColor = "black";
                    divp1.style.border = "1px solid white";
                }
            }
            if (rightBoard[i][j] == "X") {
                divp2.style.backgroundColor = "red";
            } else if (rightBoard[i][j] == "O") {
                divp2.style.backgroundColor = "green";
            }
            p1Container.appendChild(divp1);
            p2Container.appendChild(divp2);
        }
    }
};

    // settle players attacks and CPU's
   p2Container.addEventListener("click", e => {
      if (e.target.matches(".p2_div")) {
         const row = e.target.dataset.row;
         const col = e.target.dataset.col;

         p2Gameboard.receiveAttack(row, col);
               
         const divp2 = p2Container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
         const boardCellp2 = p2Gameboard.getBoard()[row][col];
         
         if (boardCellp2 === "O") {
            divp2.textContent = "O";
            divp2.style.backgroundColor = "green";
            p1ShotMessage.textContent = "You hit a ship!";
            if (p2Gameboard.isGameOver()) {
               turnMessage.textContent = "All CPU' ships are sunk, you won!";
               return;
            }
         } else {
            divp2.textContent = "X";
            divp2.style.backgroundColor = "red";
            p1ShotMessage.textContent = "Your shot missed!";
         }

            turnMessage.textContent = "It's CPU's turn to attack!";
         }

         if (game.getPlayer2().getType() === "cpu") {
            let x = randNum();
            let y = randNum();
            p1Gameboard.receiveAttack(x, y);

            const divp1 = p1Container.querySelector(`[data-row="${x}"][data-col="${y}"]`);
            const boardCellp1 = p1Gameboard.getBoard()[x][y];

            if (boardCellp1 === "O") {
               divp1.textContent = "O";
               divp1.style.backgroundColor = "green";
               p2ShotMessage.textContent = "CPU's hit your ship!";
               if (p1Gameboard.isGameOver()) {
                  turnMessage.textContent = "All your ships are sunk, CPU won!";
                  return;
               }
            
            } else {
               divp1.textContent = "X";
               divp1.style.backgroundColor = "red";
               p2ShotMessage.textContent = "CPU has missed!";
            }

            turnMessage.textContent = "It's player 1 turn to attack";
         }
   });


