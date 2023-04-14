const Gameboard = require("./gameBoard");
const Ship = require('./ship');

const BOARD_SIZE = 10; // need to check how to export that const

function Player (playerName, board, type = "human") {

    const name = playerName || "*Generate rdm player name*";

    const getName = () => name;
    const getType = () => type;
    const getPlayerBoard = () => board;

    // if player is human
    const attackEnnemyBoard = (x, y, ennemyBoard) => {
        if (ennemyBoard === board) throw new Error("You can't shot at your own board!");
        ennemyBoard.receiveAttack(x, y);
        console.log("You shot at ennemyboard!");
        return true;
    };

    // generate rdm coord when CPU attacks => need to be externalised
    const randNum = () => Math.floor(Math.random() * BOARD_SIZE);
    const randCoord = () => [randNum(BOARD_SIZE), randNum(BOARD_SIZE)];

    // if player is a CPU
    const autoAttack = (playerBoard) => {
        const [x, y] = randCoord();
        playerBoard.receiveAttack(x, y);
    };

    return { getName,
             getType,
             getPlayerBoard,
             randNum, 
             randCoord, 
             autoAttack, 
             attackEnnemyBoard
            };
}

module.exports = Player;