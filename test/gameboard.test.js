// Gameboard should allow to place ships at a specific coordinates
// have a receiveAttack() function that determinate if a ship
// got hit or not
// keep track of missed attacks
// report if all ships have been sunk or not

import Gameboard from "../gameboard.js";
import Ship from '../ship';

describe('Gameboard()', () => {
        const gameboard = Gameboard();
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

        test("you can't place more than the limited number of ship type", () => {
            const gameboard = Gameboard();
            const carrier = Ship('carrier'); // can only be 1
            const patrolBoat = Ship('patrolBoat'); // max of 2
            expect(gameboard.placeShip(carrier, 0, 0)).not.toBe(false); // 1st one
            expect(gameboard.placeShip(carrier, 1, 0)).toBe(false); // can't have 2
            expect(gameboard.placeShip(patrolBoat, 2, 0)).not.toBe(false); // 1st one
            expect(gameboard.placeShip(patrolBoat, 3, 0)).not.toBe(false); // 2nd one
            expect(gameboard.placeShip(patrolBoat, 4, 0)).toBe(false); // can't have a 3rd
        });
        
        test("Ships can't overlap", () => {
            const gameboard = Gameboard();
            expect(gameboard.getBoard().every(cells => cells.every(value => value === null))).toBe(true);
            const ship1 = Ship('submarine');
            const ship2 = Ship('destroyer');
            const ship3 = Ship('patrolBoat');
            const ship4 = Ship('carrier');
            const ship5 = Ship('battleship');

            gameboard.placeShip(ship1, 0, 0); // placing 1st ship, can't overlap
            expect(() => gameboard.placeShip(ship2, 0, 1)).toThrow("ships can't overlap");
            expect(() => gameboard.placeShip(ship4, 0, 2)).toThrow("ships can't overlap");
            expect(gameboard.placeShip(ship1, 0, 3)).not.toBe(false);
            ship3.changeDirection();
            expect(ship3.getDirection()).toBe("vertical");
            expect(() => gameboard.placeShip(ship3, 0, 5)).toThrow("ships can't overlap");
            expect(gameboard.placeShip(ship3, 0, 6)).not.toBe(false);
            expect(() => gameboard.placeShip(ship5, 1, 5)).toThrow("ships can't overlap");
            expect(gameboard.getBoard()[1][6]).not.toBe(null); // "patrolBoat on it";
        });

        test('To start a game, all ships must be on board', () => {
            const gameboard = Gameboard();
            const ship1 = Ship('battleship');
            const ship2 = Ship('destroyer');
            const ship3 = Ship('patrolBoat');
            const ship4 = Ship('patrolBoat');
            const ship5 = Ship('carrier');
            const ship6 = Ship('submarine');
            const ship7 = Ship('submarine');
            const ship8 = Ship('submarine');
            // the fleet size is capped at 7
            gameboard.placeShip(ship1, 0, 0);
            gameboard.placeShip(ship2, 1, 0);
            gameboard.placeShip(ship3, 2, 0);
            gameboard.placeShip(ship4, 3, 0);
            gameboard.placeShip(ship5, 4, 0);
            gameboard.placeShip(ship6, 5, 0); // fleet size = 6
            expect(gameboard.isFleetCreated()).toBe(false);
            gameboard.placeShip(ship7, 6, 0); // fleet size = 7, max reached
            expect(gameboard.isFleetCreated()).toBe(true);
            expect(() => gameboard.placeShip(ship8, 7, 0)).toThrow("Your fleet is full");
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
            const ship1 = Ship('patrolBoat');
            gameboard.placeShip(ship1, 0, 0);
            expect(gameboard.receiveAttack(1, 0)).toBe(false);
            expect(gameboard.receiveAttack(8, 8)).toBe(false);
            expect(gameboard.getBoard()[1][0]).toBe("X");
            expect(gameboard.getBoard()[8][8]).toBe("X");
        });

        test("The same coordinates can't be shot twice", () => {
            const gameboard = Gameboard();
            const ship1 = Ship('patrolBoat');
            gameboard.placeShip(ship1, 0, 0);
            expect(gameboard.receiveAttack(0, 0)).toBe(true); // shot hit a ship
            expect(() => gameboard.receiveAttack(0, 0)).toThrow("Can't shot twice a square already hit"); // can't shot twice the same coord
            expect(gameboard.receiveAttack(9, 9)).toBe(false); // no ship on that square
            expect(() => gameboard.receiveAttack(9, 9)).toThrow("Can't shot twice a square already hit"); // even if there is no ship on it
        });

        test("The game is over when all ships of a board are sunk", () => {
            const gameboard = Gameboard();
            const ship1 = Ship('patrolBoat');
            const ship2 = Ship('destroyer');
            gameboard.placeShip(ship1, 0, 0);
            gameboard.receiveAttack(0, 0);
            expect(gameboard.isGameOver()).toBe(false);
            gameboard.receiveAttack(0, 1);
            expect(gameboard.isGameOver()).toBe(true);
            gameboard.placeShip(ship2, 1, 0);
            gameboard.receiveAttack(1, 0);
            gameboard.receiveAttack(1, 1);
            gameboard.receiveAttack(1, 2);
            expect(gameboard.isGameOver()).toBe(true);

        });
    });
});