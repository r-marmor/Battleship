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
const isOutbounds = (x, y) => {
    return (x < 0 || BOARD_SIZE <= x || y < 0 || BOARD_SIZE <= y);
};

 // generate rdm coord when CPU attacks => need to be externalised
 const randNum = () => Math.floor(Math.random() * BOARD_SIZE);

const isGameOver = () => {
    if (shipsSunk === shipsCount) {
        console.log("All your ships are sunk");
        return true;
    } else {
    return false;
    }
};

const isFleetCreated = () => {
    return shipsCount === maxShipsOnBoard;
 };

module.exports = {
    isOutbounds,
    randNum,
    isGameOver,
    isFleetCreated,
    BOARD_SIZE,
    SHIP_LENGTH,
    SHIP_TYPES,
    maxPerShip
};

