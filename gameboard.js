function Gameboard() {
    // create a standard 10*10 gameboard 
    let _board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    
    const getBoard = () => _board;

    const returnCoordinates = (x, y) => {
        return _board[x][y];
    };

    return { getBoard, returnCoordinates };
}

module.exports = Gameboard;