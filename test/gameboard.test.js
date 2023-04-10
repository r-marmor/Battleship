// Gameboard should allow to place ships at a specific coordinates
// have a receiveAttack() function that determinate if a ship
// got hit or not
// keep track of missed attacks
// report if all ships have been sunk or not

const  Gameboard = require("../gameBoard.js");
const Ship = require('../ship.js');

describe('Gameboard()', () => {
    describe('board', () => {
        const gameboard = Gameboard();

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
            const gameboard = Gameboard();
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
});