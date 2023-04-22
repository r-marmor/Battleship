import Gameboard from "./gameboard.js";
import { randNum } from "./helpers/helpers.js";
import Player from "./players.js";
import Ship from "./ship.js";

export default function Game(player1Type, player2Type) {

   // create boards
   const p1 = Gameboard();
   const p2 = Gameboard();

   const getp1 = () => p1;
   const getp2 = () => p2;

   const getp1Board = () => p1.getBoard();
   const getp2Board = () => p2.getBoard();

   // const player1 = Player("Michel", p1, player1Type);
   // const player2 = Player("cpu123", p2, player2Type);

   // player fleet
   const ship1 = Ship("patrolBoat");
   const ship1a = Ship("patrolBoat");
   const ship2 = Ship("submarine");
   const ship2a = Ship("submarine");
   const ship3 = Ship("destroyer");
   const ship4 = Ship("battleship");
   const ship5 = Ship("carrier");

   p1.placeShip(ship1, 0, 0);
   p1.placeShip(ship1a, 1, 0);
   p1.placeShip(ship2, 2, 0);
   p1.placeShip(ship2a, 3, 0);
   p1.placeShip(ship3, 4, 0);
   p1.placeShip(ship4, 5, 0);
   p1.placeShip(ship5, 6, 0);  

   // cpu fleet 
   const cpuShip1 = Ship("patrolBoat");
   const cpuShip1a = Ship("patrolBoat");
   const cpuShip2 = Ship("submarine");
   const cpuShip2a = Ship("submarine");
   const cpuShip3 = Ship("destroyer");
   const cpuShip4 = Ship("battleship");
   const cpuShip5 = Ship("carrier");

   p2.placeShip(cpuShip1, 0, 0);
   p2.placeShip(cpuShip1a, 1, 0);
   p2.placeShip(cpuShip2, 2, 2);
   p2.placeShip(cpuShip2a, 3, 0);
   p2.placeShip(cpuShip3, 4, 0);
   p2.placeShip(cpuShip4, 5, 0);
   p2.placeShip(cpuShip5, 6, 0);

   const turnMessage = document.querySelector('.message');
   const p2Container = document.querySelector('.p2-container');
   const p1Container = document.querySelector('.p1-container');
   const p1ShotMessage = document.querySelector('.player1-message')

         turnMessage.textContent = "It's player 1 turn to attack";
         
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
               } else {
                  divp2.textContent = "X";
                  divp2.style.backgroundColor = "red";
                  p1ShotMessage.textContent = "Your shot missed!";
               }

               turnMessage.textContent = "It's CPU's turn to attack!";

               if (player2Type === "cpu") {
                  let x = randNum();
                  let y = randNum();
                  getp1().receiveAttack(x, y);
                  
               }
            }
         });

         
      
   return { getp1Board, getp2Board, getp1, getp2 };

}