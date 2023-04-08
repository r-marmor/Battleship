// Gameboard should allow to place ships at a specific coordinates
// have a receiveAttack() function that determinate if a ship
// got hit or not
// keep track of missed attacks
// report if all ships have been sunk or not

const Gameboard = require("../gameBoard.js");

describe('Gameboard()', () => {
    
    const gameboard = Gameboard();

    test('the board is empty', () => {
        const actual = gameboard.getBoard().every(cells => cells.every(value => value === null));
        const expected = true;
        expect(actual).toBe(expected);
    });

    test('board size is 10x10', () => {
        expect(gameboard.getBoard().length).toBe(10); // testing rows
        expect(gameboard.getBoard().every(rows => rows.length == 10)).toBe(true); // testing columns
    });

    test('returns any square of the board', () => {
        gameboard.getBoard()[0][0] = "TEST";
        expect(gameboard.returnCoordinates(0, 0)).toBe("TEST");
    });

});