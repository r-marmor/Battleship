import {BOARD_SIZE, randNum} from './helpers/helpers.js';
import Gameboard  from"./gameboard.js";
import Ship from './ship.js';

export default function Player (playerName, gameboard, type = "human") {

    const name = playerName || "*Generate rdm player name*";

    const getName = () => name;
    const getType = () => type;
    const getPlayerGameboard = () => gameboard;
    const getPlayerBoard = () => gameboard.getBoard();


    return { getName, getType, getPlayerGameboard, getPlayerBoard };
    
}