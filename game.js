const { SHIP_TYPES, BOARD_SIZE, randNum } = require('./helpers/helpers')
const Gameboard = require("./gameBoard");
const Player = require("./players");
const Ship = require("./ship");


const Game = () => {

   // create boards
   const p1Board = Gameboard();
   const cpuBoard = Gameboard();

   // create players
   const p1 = Player("Michel", p1Board, "human");
   const p2 = Player("cpu123", cpuBoard, "cpu");

   // player fleet
   const ship1 = Ship("patrolBoat");
   const ship1a = Ship("patrolBoat");
   const ship2 = Ship("submarine");
   const ship2a = Ship("submarine");
   const ship3 = Ship("destroyer");
   const ship4 = Ship("battleship");
   const ship5 = Ship("carrier");
   const ship6 = Ship("submarine");

   p1Board.placeShip(ship1, 0, 0);
   p1Board.placeShip(ship1a, 1, 0);
   p1Board.placeShip(ship2, 2, 0);
   p1Board.placeShip(ship2a, 3, 0);
   p1Board.placeShip(ship3, 4, 0);
   p1Board.placeShip(ship4, 5, 0);
   p1Board.placeShip(ship5, 6, 0);  

   // cpu fleet 
   const cpuShip1 = Ship("patrolBoat");
   const cpuShip1a = Ship("patrolBoat");
   const cpuShip2 = Ship("submarine");
   const cpuShip2a = Ship("submarine");
   const cpuShip3 = Ship("destroyer");
   const cpuShip4 = Ship("battleship");
   const cpuShip5 = Ship("carrier");

   cpuBoard.placeShip(cpuShip1, 0, 0);
   cpuBoard.placeShip(cpuShip1a, 1, 0);
   cpuBoard.placeShip(cpuShip2, 2, 0);
   cpuBoard.placeShip(cpuShip2a, 3, 0);
   cpuBoard.placeShip(cpuShip3, 4, 0);
   cpuBoard.placeShip(cpuShip4, 5, 0);
   cpuBoard.placeShip(cpuShip5, 6, 0); 


};

Game();