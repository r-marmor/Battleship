import Gameboard from "./gameboard.js";
import { populateBoards } from "./helpers/helpers.js";
import Player from "./players.js";

export default function Game() {

   const p1Gameboard = Gameboard();
   const p2Gameboard = Gameboard();

   const player1 = Player('Michel', p1Gameboard, "human");
   const player2 = Player('cpu123', p2Gameboard, "cpu");

   const getPlayer1 = () => player1;
   const getPlayer2 = () => player2;

   populateBoards(p1Gameboard, p2Gameboard); 

   return { getPlayer1, getPlayer2 };

}



