const Ship = require("./ship");

const BOARD_SIZE = 10;

function Gameboard() {
    // create a standard 10*10 gameboard 
    let _board = new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(null));
    const getBoard = () => _board;
    
    //records ships placed on board
    const shipsOnBoard = new Map();
    // number max of ship by type
    const maxPerShip = {
        carrier: 1,
        battleship: 1,
        destroyer: 1,
        submarine: 2,
        patrolBoat: 2
    };
   
    // const isAllSunk = () => shipsOnBoard.every(obj => obj.isSunk() == true);

    const placeShip = (ship, startPosX, startPosY) => {

        // checks if coordinates are inbounds
        if (startPosX < 0 || BOARD_SIZE <= startPosX || startPosY < 0 || BOARD_SIZE <= startPosY)
            throw new Error("coordinates are outbounds");

        // tracks the fleet created
        // if 1st instanciation of a ship type, create one
        if (!shipsOnBoard.has(ship.getId())) {
        shipsOnBoard.set(ship.getId(), 1);
        // if already exists, checks if the max number allowed is reach, if not increment the counter
        } else if (shipsOnBoard.get(ship.getId()) < maxPerShip[ship.getId()]) {
            shipsOnBoard.set(ship.getId(), shipsOnBoard.get(ship.getId()) + 1);
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

    let missShots = []; // records missed shots

    const receiveAttack = (x, y) => {
        let squareShoted = _board[x][y];
        // if shot hit a ship, call the hit function to the ship hit
        if (squareShoted !== null) {
            squareShoted.hit();
            return true;
        } else {
            _board[x][y] = "X";
            missShots.push(`[${x}, ${y}]`);
            return false;
        }
    };

    return { getBoard, placeShip, receiveAttack };
}

// const gameboard = Gameboard();
// const ship1 = Ship('carrier');
// const ship2 = Ship('carrier');
// const ship3 = Ship('patrolBoat');
// const ship4 = Ship('patrolBoat');
// const ship5 = Ship('patrolBoat');
// const ship6 = Ship('patrolBoat');
// gameboard.placeShip(ship1, 0, 0);
// gameboard.placeShip(ship2, 1, 0);
// gameboard.placeShip(ship3, 2, 0);
// gameboard.placeShip(ship4, 3, 0);
// gameboard.placeShip(ship5, 4, 0);
// gameboard.placeShip(ship6, 5, 0);
// gameboard.receiveAttack(0, 0);
// gameboard.receiveAttack(0, 1);

module.exports = Gameboard;