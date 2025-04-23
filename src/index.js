import "./styles.css";
import { Player } from "./player-class";

const player1 = new Player("Player 1");
const player2 = new Player("Bot");

player1.placeShipsRandomly();
player2.placeShipsRandomly();

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

const playerBoardCell = document.querySelector(".player-board");

playerBoardCell.addEventListener("click", async (e) => {
  e.preventDefault();
  if (player1.sunkShips === 5) {
    playerBoardCell.classList.add("loading");
    botMessage.innerHTML =
      "Bot Wins! All player ships have been sunk. Game restarts in 5s...";
    //   restart game
    setTimeout(() => {
      player1.restart();
      player2.restart();
      player1.generateBoard(botBoard, botShipCount, botMessage, true);
      player2.generateBoard(playerBoard, playerShipCount, playerMessage);
      botMessage.innerHTML = "";
      playerMessage.innerHTML = "";
    }, 5000);

    playerBoardCell.classList.remove("loading");
    return;
  } else if (player2.sunkShips === 5) {
    playerBoardCell.classList.add("loading");
    playerMessage.innerHTML =
      "Player Wins! All bot ships have been sunk. Game restartsin 5s...";
    //   restart game
    setTimeout(() => {
      player1.restart();
      player2.restart();
      player1.generateBoard(botBoard, botShipCount, botMessage, true);
      player2.generateBoard(playerBoard, playerShipCount, playerMessage);
      botMessage.innerHTML = "";
      playerMessage.innerHTML = "";
    }, 5000);

    playerBoardCell.classList.remove("loading");
    return;
  }
  //   bot select random cell
  player1.botChoice(botBoard, botShipCount, botMessage);
});
