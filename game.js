import Gameboard from "./gameboard.js";
import Player from "./players.js";
import Ship from "./ship.js";

export default function Game() {

   // create boards
   let player1;
   let player2;

   const p1Board = player1.getBoard();
   const p2Board = player2.getBoard();

   const getp1Board = () => p1Board;
   const getp2Board = () => p2Board;

   // Reset and start a new game
   const newGame = () => {
      player1 = Gameboard();
      player2 = Gameboard();
   };

   // create players

   // const p1 = Player("Michel", player1, "human");
   // const p2 = Player("cpu123", player2, "cpu");

   // player fleet
   const ship1 = Ship("patrolBoat");
   const ship1a = Ship("patrolBoat");
   const ship2 = Ship("submarine");
   const ship2a = Ship("submarine");
   const ship3 = Ship("destroyer");
   const ship4 = Ship("battleship");
   const ship5 = Ship("carrier");

   player1.placeShip(ship1, 0, 0);
   player1.placeShip(ship1a, 1, 0);
   player1.placeShip(ship2, 2, 0);
   player1.placeShip(ship2a, 3, 0);
   player1.placeShip(ship3, 4, 0);
   player1.placeShip(ship4, 5, 0);
   player1.placeShip(ship5, 6, 0);  

   // cpu fleet 
   const cpuShip1 = Ship("patrolBoat");
   const cpuShip1a = Ship("patrolBoat");
   const cpuShip2 = Ship("submarine");
   const cpuShip2a = Ship("submarine");
   const cpuShip3 = Ship("destroyer");
   const cpuShip4 = Ship("battleship");
   const cpuShip5 = Ship("carrier");

   player2.placeShip(cpuShip1, 0, 0);
   player2.placeShip(cpuShip1a, 1, 0);
   player2.placeShip(cpuShip2, 2, 0);
   player2.placeShip(cpuShip2a, 3, 0);
   player2.placeShip(cpuShip3, 4, 0);
   player2.placeShip(cpuShip4, 5, 0);
   player2.placeShip(cpuShip5, 6, 0); 

   return { newGame, getp1Board, getp2Board };

}

const test = Game();
console.log(test)