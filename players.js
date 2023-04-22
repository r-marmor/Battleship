import {BOARD_SIZE, randNum} from './helpers/helpers.js';
import Gameboard  from"./gameboard.js";
import Ship from './ship.js';

export default function Player (playerName, board, type = "human") {

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

    // if player is a CPU
    const autoAttack = (playerBoard) => {
        playerBoard.receiveAttack(randNum(), randNum());
    };

    return { getName,
             getType,
             getPlayerBoard,
             randNum,  
             autoAttack, 
             attackEnnemyBoard
            };
}