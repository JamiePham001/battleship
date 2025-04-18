import { Gameboard } from "./gameboard-class.";

export class Player extends Gameboard {
  constructor(name) {
    super();
    this.name = name;
  }
}
