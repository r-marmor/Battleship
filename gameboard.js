import { BOARD_SIZE, maxPerShip, isCoordOutbounds } from './helpers/helpers.js';

export default function Gameboard() {
    // create a standard 10*10 gameboard 
    let _board = new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(null));
    const getBoard = () => _board;

    // tracks ships placed on board
    const shipsOnBoard = new Map();
    // max size fleet
    const maxShipsOnBoard = Object.values(maxPerShip).reduce((prev, curr) => prev + curr); 
    
    let shipsCount = 0; // tracks the fleet size
    let shipsSunk = 0; // tracks the remaining ships not sunk

    const placeShip = (ship, startPosX, startPosY) => {
        // get ship properties
        const shipLength = ship.getLength();
        const direction = ship.getDirection();
        
        if (isFleetCreated()) throw new Error("Your fleet is full");
        
        if (isCoordOutbounds(startPosX, startPosY)) throw new Error("coordinates are outbounds");
        
        if (!isShipInbounds(startPosX, startPosY, shipLength)) throw new Error("Ship is outbounds");

        if (!isValidPlacement(ship, startPosX, startPosY, direction)) throw new Error("Ships can't overlap");


        // otherwise, just increment his number
        const currentCount = shipsOnBoard.get(ship.getId()) || 0;
        if (currentCount < maxPerShip[ship.getId()]) {
            shipsOnBoard.set(ship.getId(), currentCount + 1);
        } else {
            return false;
        }
    
            for (let i = 0; i < shipLength; i++) {
                if (direction === "horizontal") {
                        _board[startPosX][startPosY + i] = ship;    
                    } else if (direction === "vertical") {
                        _board[startPosX + i][startPosY] = ship;
                        
                    } else {
                        return false;
                    }
                } 
                shipsCount++;
                return true;
    };
        

    let missShots = []; // records missed shots

    const receiveAttack = (x, y) => {
        let squareShot = _board[x][y];
        if (squareShot === "O" || squareShot === "X") throw new Error("Can't shot twice a square already hit");
        // if shot hit a ship, call the hit function to the ship hit
        if (squareShot !== null) {
            _board[x][y] = "O";
            squareShot.hit();
            if (squareShot.isSunk()) {
                shipsSunk++;
                isGameOver();
            }
            return true;
        } else {
            // if a shot miss, mark the square, store the coordinates
            _board[x][y] = "X";
            missShots.push(`[${x}, ${y}]`);
            return false;
        }
    };

    const isGameOver = () => {
        return (shipsSunk === shipsCount);
    };

    const isFleetCreated = () => {
        return shipsCount === maxShipsOnBoard;
    };

    const isShipInbounds = (xPos, yPos, length) => {
        return (xPos + length <= BOARD_SIZE === true || yPos + length <= BOARD_SIZE === true);
    };

    const isValidPlacement = (shipTested, xPos, yPos, direction) => {
        for (let i = 0; i < shipTested.getLength(); i++) {
            if (direction === "horizontal") {
                if (_board[xPos][yPos + i] !== null) {
                    return false;
                } 
            } else if (direction === "vertical") {
                if (_board[xPos + i][yPos] !== null) {
                    return false;
                } 
            } 
        }
        return true;
    };

    return { getBoard, placeShip, receiveAttack, isGameOver, isFleetCreated };
}
