import Gameboard from "./gameboard.js";
import { populateBoards } from "./helpers/helpers.js";
import Player from "./players.js";

export default function Game() {

   const p1Gameboard = Gameboard();
   const p2Gameboard = Gameboard();

   const player1 = Player('Michel', p1Gameboard, "human");
   const player2 = Player('cpu123', p2Gameboard, "cpu");

   const getPlayer1 = () => player1;
   const getPlayer2 = () => player2;

   populateBoards(p1Gameboard, p2Gameboard); 

   const turnMessage = document.querySelector('.message');
const p2Container = document.querySelector('.p2-container');
const p1Container = document.querySelector('.p1-container');
const p1ShotMessage = document.querySelector('.player1-message');
const p2ShotMessage = document.querySelector('.player2-message');
      
   p2Container.addEventListener("click", e => {
      if (e.target.matches(".p2_div")) {
         const row = e.target.dataset.row;
         const col = e.target.dataset.col;

         getp2().receiveAttack(row, col);
               
         const divp2 = p2Container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
         const boardCellp2 = getp2().getBoard()[row][col];
         
         if (boardCellp2 === "O") {
            divp2.textContent = "O";
            divp2.style.backgroundColor = "green";
            p1ShotMessage.textContent = "You hit a ship!";
            if (getp2().isGameOver()) {
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

         if (player2.getType() === "cpu") {
            let x = randNum();
            let y = randNum();
            getp1().receiveAttack(x, y);

            const divp1 = p1Container.querySelector(`[data-row="${x}"][data-col="${y}"]`);
            const boardCellp1 = getp1().getBoard()[x][y];

            if (boardCellp1 === "O") {
               divp1.textContent = "O";
               divp1.style.backgroundColor = "green";
               p2ShotMessage.textContent = "CPU's hit your ship!";
               if (getp1().isGameOver()) {
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

   return { getPlayer1, getPlayer2 };

}



