const Ship = require("./ship");

const BOARD_SIZE = 10;

function Gameboard() {
    // create a standard 10*10 gameboard 
    let _board = new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(null));
    const getBoard = () => _board;

    const placeShip = (ship, startPosX, startPosY) => {

        // checks if coordinates are inbounds
        if (startPosX < 0 || BOARD_SIZE <= startPosX || startPosY < 0 || BOARD_SIZE <= startPosY)
            throw new Error("coordinates are outbounds");
        
        // get ship properties
        const shipLength = ship.getLength();
        const direction = ship.getDirection();

        // check if ship is inbound
        if (direction === "horizontal" && startPosY + shipLength <= BOARD_SIZE) {
            // stores ship path for following if statement
            const shipPath = []; 
            for (let i = 0; i < shipLength; i++) {
                shipPath.push(_board[startPosX][startPosY + i]);
            }
            // check if all values are null = no ship is on the path
            if (shipPath.every(val => val === null)) {
                // then start implementing the new ship
                for (let i = 0; i < shipLength; i++) {
                    _board[startPosX][startPosY + i] = ship;
                }
            } else {
                throw new Error("ships can't overlap");
            }
        // same statements as above with vertical direction
        } else if (direction === "vertical" && startPosX + shipLength <= BOARD_SIZE) {
            const shipPath = [];
                for (let i = 0; i < shipLength; i++) {
                    shipPath.push(_board[startPosX + i][startPosY]);
                }
                if (shipPath.every(val => val === null)) {
                    for (let i = 0; i < shipLength; i++) {
                        _board[startPosX + i][startPosY] = ship;
                    }
                } else {
                    throw new Error("ships can't overlap");
                }
        }       
    };

    const receiveAttack = (x, y) => {
        const squareShotted = _board[x][y];
        
        if (squareShotted !== null) {
            // if shot hit a ship, call the hit function to the ship hit
            squareShotted.hit();
            return true;
        }
    };


    return { getBoard, placeShip, receiveAttack };
}

// const gameBoard = Gameboard();
// const ship1 = Ship('patrolBoat');
// gameBoard.placeShip(ship1, 0, 0);
// console.log(gameBoard.getBoard()[0][0]);

module.exports = Gameboard;