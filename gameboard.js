const BOARD_SIZE = 10;

function Gameboard() {
    // create a standard 10*10 gameboard 
    let _board = new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(null));
    const getBoard = () => _board;
    // tracks ships placed on board
    const shipsOnBoard = new Map();
    // number max of ships by type
    const maxPerShip = {
        carrier: 1,
        battleship: 1,
        destroyer: 1,
        submarine: 2,
        patrolBoat: 2
    };

    let shipsCount = 0;
    let shipsSunk = 0;

    // checks if starting coordinates are inbounds
    const isOutbounds = (x, y) => {
        return (x < 0 || BOARD_SIZE <= x || y < 0 || BOARD_SIZE <= y);
    };
    
    const placeShip = (ship, startPosX, startPosY) => {
        if (isOutbounds(startPosX, startPosY)) {
            throw new Error("coordinates are outbounds");
        }
    
        // tracks the fleet created in a Map
        // caps the creation of ships
        
        // if 1st instanciation of a ship type, create one
        // otherwise, just increment his number
        const currentCount = shipsOnBoard.get(ship.getId()) || 0;
        if (currentCount < maxPerShip[ship.getId()]) {
            shipsOnBoard.set(ship.getId(), currentCount + 1);
        } else {
            return false;
        }

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
            // if all values are null = no ship is on the path
            if (shipPath.every(val => val === null)) {
                // then implements the new ship
                for (let i = 0; i < shipLength; i++) {
                    _board[startPosX][startPosY + i] = ship;
                }
                shipsCount++;
                return true;
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
                    shipsCount++;
                    return true;
                } else {
                    throw new Error("ships can't overlap");
                }
        } else {
            return false;
        }
    };
    
    let missShots = []; // records missed shots

    const receiveAttack = (x, y) => {
        let squareShot = _board[x][y];
        if (squareShot === "O" || squareShot === "X") return;
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
        return shipsSunk === shipsCount;
    };

    return { getBoard, placeShip, receiveAttack, isGameOver };
}

module.exports = Gameboard;