const SHIP_TYPES = [
    'carrier',
    'battleship',
    'destroyer',
    'submarine',
    'patrolBoat'
];

const SHIP_LENGTH = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    patrolBoat: 2
};

function Ship(type) {
    // properties
    const id = type;
    const length = SHIP_LENGTH[type];
    let hits = 0;
    let sunk = false;
    let direction = 'horizontal'; // default direction

    const getDirection = () => direction;
    const changeDirection = () => {
        if (direction === 'horizontal') {
            direction = 'vertical';
        } else {
            direction = 'horizontal';
        }
    };

    const hit = () => {
    if (length === hits) return;
    hits++;
    };

    // getters
    const getHits = () => hits;
    const getId = () => id;
    const getLength = () => length;

    const isSunk = () => {
        if (length == hits) sunk = true;
        return sunk;
    };

    return { hit, getHits, isSunk, getId, getLength, getDirection, changeDirection };
}

module.exports = Ship;