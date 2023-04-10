// Gameboard should allow to place ships at a specific coordinates
// have a receiveAttack() function that determinate if a ship
// got hit or not
// keep track of missed attacks
// report if all ships have been sunk or not

const  Gameboard = require("../gameBoard.js");
const Ship = require('../ship.js');

describe('Gameboard()', () => {
        const gameboard = Gameboard();
        
        const ship1 = Ship('patrolBoat');
        const ship2 = Ship('submarine');
        const ship3 = Ship('destroyer');
        const ship4 = Ship('battleship');
        const ship5 = Ship('carrier');

    describe('board', () => {
        

        test('the board is empty', () => {
            
            const actual = gameboard.getBoard().every(cells => cells.every(value => value === null));
            expect(actual).toBe(true);
        });

        test('board size is 10x10', () => {
            expect(gameboard.getBoard().length).toBe(10); // testing rows
            expect(gameboard.getBoard().every(rows => rows.length == 10)).toBe(true); // testing columns
        });
    });

    describe('placeShip()', () => {
        test('starting positions are inbounds', () => {
            const ship1 = Ship('patrolBoat');

            expect(() => gameboard.placeShip(ship1, -1, 0)).toThrow("coordinates are outbounds");
            expect(() => gameboard.placeShip(ship1, 0, -1)).toThrow("coordinates are outbounds");
            expect(gameboard.placeShip(ship1, 0, 0)).not.toBe(false);
            expect(gameboard.placeShip(ship1, 5, 4)).not.toBe(false);
            expect(() => gameboard.placeShip(ship1, 0, 10)).toThrow("coordinates are outbounds");
            expect(() => gameboard.placeShip(ship1, 10, 0)).toThrow("coordinates are outbounds");
        });
        
        test("Ships can't overlap", () => {
            const gameboard = Gameboard();
            const ship1 = Ship('submarine');
            const ship2 = Ship('destroyer');
            gameboard.placeShip(ship1, 0, 0); // placing 1st ship, can't overlap
            expect(() => gameboard.placeShip(ship2, 0, 1)).toThrow("ships can't overlap");
            expect(() => gameboard.placeShip(ship2, 0, 2)).toThrow("ships can't overlap");
            expect(gameboard.placeShip(ship2, 0, 3)).not.toBe(false);
            const ship3 = Ship('patrolBoat');
            ship3.changeDirection();
            expect(ship3.getDirection()).toBe("vertical");
            expect(() => gameboard.placeShip(ship3, 0, 0)).toThrow("ships can't overlap");
            expect(() => gameboard.placeShip(ship3, 0, 5)).toThrow("ships can't overlap");
            expect(gameboard.placeShip(ship3, 0, 6)).not.toBe(false);
            expect(() => gameboard.placeShip(ship1, 1, 5)).toThrow("ships can't overlap");
            expect(gameboard.getBoard()[1][6]).not.toBe(null); // "patrolBoat on it";
        });

    });

    describe('receiveAttack()', () => {
        const gameboard = Gameboard();
        test("takes a pair of coordinates, determines whether or not the attack hit a ship", () => {
            const ship1 = Ship('carrier');
            const ship2 = Ship('battleship');
            ship2.changeDirection();
            gameboard.placeShip(ship1, 0, 0);
            gameboard.placeShip(ship2, 1, 0);
            expect(gameboard.receiveAttack(0, 0)).toBe(true);
            expect(gameboard.receiveAttack(0, 4)).toBe(true);
            expect(gameboard.receiveAttack(0, 5)).not.toBe(true);
            expect(gameboard.receiveAttack(1, 0)).toBe(true);
            expect(gameboard.receiveAttack(4, 0)).toBe(true);
            expect(gameboard.receiveAttack(5, 0)).not.toBe(true);
        });

        test("sends the 'hit' to the correct ship", () => {
            const gameboard = Gameboard();
           const ship1 = Ship('patrolBoat'); // create a new ship
           expect(ship1.getHits()).toBe(0);
           gameboard.placeShip(ship1, 0, 0); // place it on board
           gameboard.receiveAttack(0, 0); // shot the ship
           expect(ship1.getHits()).toBe(1);
           gameboard.receiveAttack(0, 1); // shot the ship
           expect(ship1.getHits()).toBe(2);
           gameboard.receiveAttack(0, 3); // miss the ship
           expect(ship1.getHits()).toBe(2);
        });

        test("records the coordinates of the missed shot", () => {
            const gameboard = Gameboard();
            gameboard.placeShip(ship1, 0, 0);
            expect(gameboard.receiveAttack(1, 0)).toBe(false);
            expect(gameboard.receiveAttack(8, 8)).toBe(false);
            expect(gameboard.getBoard()[1][0]).toBe("X");
            expect(gameboard.getBoard()[8][8]).toBe("X");
        });
    });
});