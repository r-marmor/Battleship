import Ship from '../ship.js';

// HELPERS CONST

const SHIP_LENGTH = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    patrolBoat: 2
};

const SHIP_TYPES = [
    'carrier',
    'battleship',
    'destroyer',
    'submarine',
    'patrolBoat'
];

 // Custom board size
 const BOARD_SIZE = 10;

  // number max of ships by type
  const maxPerShip = {
    carrier: 1,
    battleship: 1,
    destroyer: 1,
    submarine: 2,
    patrolBoat: 2
};

// HELPERS FUNCTIONS

// checks if starting coordinates are inbounds
const isCoordOutbounds = (x, y) => {
    return (x < 0 || BOARD_SIZE <= x || y < 0 || BOARD_SIZE <= y);
};

 // generate rdm coord when CPU attacks
 const randNum = () => Math.floor(Math.random() * BOARD_SIZE);

const isGameOver = (x, y) => {
    if (x === y) {
        console.log("All your ships are sunk");
        return true;
    } else {
    return false;
    }
};

const isFleetCreated = () => {
    return shipsCount === maxShipsOnBoard;
 };

 const populateBoards = (p1Board, p2board) => {
    // player 1 fleet
    const ship1 = Ship("patrolBoat");
    const ship1a = Ship("patrolBoat");
    const ship2 = Ship("submarine");
    const ship2a = Ship("submarine");
    const ship3 = Ship("destroyer");
    const ship4 = Ship("battleship");
    const ship5 = Ship("carrier");

    p1Board.placeShip(ship1, 0, 0);
    p1Board.placeShip(ship1a, 1, 0);
    p1Board.placeShip(ship2, 2, 0);
    p1Board.placeShip(ship2a, 3, 0);
    p1Board.placeShip(ship3, 4, 0);
    p1Board.placeShip(ship4, 5, 0);
    p1Board.placeShip(ship5, 6, 0);  

    // player 2 fleet 
    const cpuShip1 = Ship("patrolBoat");
    const cpuShip1a = Ship("patrolBoat");
    const cpuShip2 = Ship("submarine");
    const cpuShip2a = Ship("submarine");
    const cpuShip3 = Ship("destroyer");
    const cpuShip4 = Ship("battleship");
    const cpuShip5 = Ship("carrier");

    p2board.placeShip(cpuShip1, 0, 0);
    p2board.placeShip(cpuShip1a, 1, 0);
    p2board.placeShip(cpuShip2, 2, 2);
    p2board.placeShip(cpuShip2a, 3, 0);
    p2board.placeShip(cpuShip3, 4, 0);
    p2board.placeShip(cpuShip4, 5, 0);
    p2board.placeShip(cpuShip5, 6, 0);
 };


export {
    isCoordOutbounds,
    randNum,
    isGameOver,
    isFleetCreated,
    populateBoards,
    BOARD_SIZE,
    SHIP_LENGTH,
    SHIP_TYPES,
    maxPerShip
};

