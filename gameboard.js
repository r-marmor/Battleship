const Ship = require('./ship.js');

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

    // caps the number of ships we can place on board
    const maxShipsOnBoard = Object.values(maxPerShip).reduce((a, b) => a + b);

    // to start the game, checks if at least 1 ship isn't sunk
    // const startGame = () => {
    //     if (isAllShipsSunk()) return false;
    // };
    
    // checks if all ships are sunk
    // const isAllShipsSunk = () => {
        // checks if no ship has been created yet
    //     if (shipsOnBoard.size !== 0) {
    //         const ships = Array.from(shipsOnBoard.keys());
    //         return ships.every(ship => ship.isSunk() == true);
    //     } else {
    //         return false;
    //     }
    // };

    const placeShip = (ship, startPosX, startPosY) => {
        // checks if starting coordinates are inbounds
        if (startPosX < 0 || BOARD_SIZE <= startPosX || startPosY < 0 || BOARD_SIZE <= startPosY)
            throw new Error("coordinates are outbounds");
        // tracks the fleet created in a Map
        // caps the creation of ships
        
        // if 1st instanciation of a ship type, create one
        const currentCount = shipsOnBoard.get(ship) || 0;
        if (currentCount < maxPerShip[ship.getId()] && !shipsOnBoard.has(ship.getId())) {
            shipsOnBoard.set(ship, currentCount + 1);
        } else {
            return false;
        }

        console.log(shipsOnBoard);

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
        } else {
            return false;
        }
    };
    
    let missShots = []; // records missed shots

    const receiveAttack = (x, y) => {
        let squareShoted = _board[x][y];
        if (squareShoted === "O" || squareShoted === "X") return;
        // if shot hit a ship, call the hit function to the ship hit
        if (squareShoted !== null) {
            _board[x][y] = "O";
            squareShoted.hit();
            return true;
        } else {
            // if a shot miss, mark the square, store the coordinates
            _board[x][y] = "X";
            missShots.push(`[${x}, ${y}]`);
            return false;
        }
    };

    return { getBoard, placeShip, receiveAttack };
}

// const gameboard = Gameboard();
// const ship1 = Ship('patrolBoat');
// gameboard.placeShip(ship1, 0, 0);

            const gameboard = Gameboard();
            // const ship1 = Ship('patrolBoat');
            // const ship2 = Ship('patrolBoat');
            const ship3 = Ship('carrier');
            const ship4 = Ship('carrier');
            // const ship5 = Ship('submarine');
            // const ship6 = Ship('submarine');
            // const ship7 = Ship('destroyer');

            // gameboard.placeShip(ship1, 0, 0);
            // gameboard.placeShip(ship2, 1, 0);
            gameboard.placeShip(ship3, 2, 0);
            // gameboard.placeShip(ship4, 3, 0);
            // gameboard.placeShip(ship5, 4, 0);
            // gameboard.placeShip(ship6, 5, 0);
            // gameboard.placeShip(ship7, 6, 0);
            // gameboard.placeShip(ship3, 7, 0);



module.exports = Gameboard;