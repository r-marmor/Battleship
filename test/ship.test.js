import Ship from "./ship.js";

describe('Ship()', () => {
    it('hit() should increment the hits counter', () => {
        const ship1 = Ship('patrolBoat');
        expect(ship1.getHits()).toBe(0); // checks that the hits counter is 0 initially
        ship1.hit(); // call the hit method
        expect(ship1.getHits()).toBe(1);
        ship1.hit(); // call the method again
        expect(ship1.getHits()).toBe(2);
    });

    it("isSunk() should turns to true when the number of hits equals the ship's length", () => {
        const ship2 = Ship('patrolBoat'); // initialization
        expect(ship2.isSunk()).toBe(false); // default value must be false;
        ship2.hit();
        ship2.hit();
        ship2.hit(); // checks if the hit function stops if the ship is sunk
        expect(ship2.isSunk()).toBe(true);
    });
});