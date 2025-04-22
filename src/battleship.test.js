import { Player } from "./player-class";

let newPlayer = new Player("new player");

test("ship random insertion", () => {
  newPlayer.placeShipsRandomly();
  expect(newPlayer.ships.length).toBe(5);
});
