function Ship(length) {
    let hits = 0;
    let sunk = false;

    const hit = () => {
    if (length == hits) return;
    hits++;
    };

    const getHits = () => hits;

    const isSunk = () => {
        if (length == hits) sunk = true;
        return sunk;
    };

    return { length, hit, getHits, isSunk };
}



module.exports = Ship;