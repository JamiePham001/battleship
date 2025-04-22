import "./styles.css";
import { Player } from "./player-class";

const player1 = new Player("Player 1");
const player2 = new Player("Bot");

player1.placeShipsRandomly();
player2.placeShipsRandomly();

console.log(player1.board);
console.log(player1.ships.length);

// board elements of player and bot
const playerBoard = document.querySelector(".player-board");
const botBoard = document.querySelector(".bot-board");

// ship counter of player and bot
const playerShipCount = document.querySelector(".player-ship-count");
const botShipCount = document.querySelector(".bot-ship-count");

// message bot of player and bot
const playerMessage = document.querySelector(".message-box");
const botMessage = document.querySelector(".bot-message-box");

player1.generateBoard(botBoard, botShipCount, botMessage, true);
player2.generateBoard(playerBoard, playerShipCount, playerMessage);
