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

    describe('starting positions are inbounds', () => {
        const gameboard = Gameboard();
        const ship1 = Ship('patrolBoat');

        expect(gameboard.placeShip(ship1, -1, 0)).toBe(false);
        expect(gameboard.placeShip(ship1, 0, -1)).toBe(false);
        expect(gameboard.placeShip(ship1, 0, 0)).not.toBe(false);
        expect(gameboard.placeShip(ship1, 0, 10)).toBe(false);
        expect(gameboard.placeShip(ship1, 10, 0)).toBe(false);
    });
});