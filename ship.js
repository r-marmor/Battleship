function Ship(length) {
    let hits = 0;
    let sunk = false;

    const hit = () => {
    if (length == hits) return;
    hits++;
    };

    const getHits = () => hits;

    const isSunk = () => {
        return (length == hits);
    };

    return { length, hit, getHits, isSunk };
}

module.exports = Ship;