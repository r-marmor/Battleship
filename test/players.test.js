const Player = require('../players');
const Gameboard = require('../gameBoard');

describe('Player()', () => {
    test('Creates a player with inputed name', () => {
        const newPlayer = Player('Jean');
        expect(newPlayer.getName()).toEqual('Jean');
    });

    describe('attackEnnemyBoard', () => {
        test('Takes coordinates and attacks enemy board', () => {
            const cpuBoard = Gameboard();
            const playerBoard = Gameboard();
            const player1 = Player('John', playerBoard, "human");
            
            expect(player1.attackEnnemyBoard(0, 0, cpuBoard)).toBe(true);
            expect(() => player1.attackEnnemyBoard(0, 0, cpuBoard)).toThrow("Can't shot twice a square already hit");
            
        });
    });
    
});