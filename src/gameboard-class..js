import { Ship } from "./ship-class";

export class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this.ships = [];
    this.sunkShips = 0;
  }

  // randomise ship orientatino and placement on board
  placeShipsRandomly() {
    const shipLengths = [5, 4, 3, 3, 2]; // Common battleship lengths
    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        const vertical = Math.random() < 0.5; // Random orientation
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        placed = this.#tryPlaceShip(new Ship(length), x, y, vertical);
      }
    });
  }

  // Helper function to attempt placing a single ship
  #tryPlaceShip(ship, x, y, vertical) {
    // Check boundaries
    if (vertical) {
      if (y + ship.length > 10) return false;
    } else {
      if (x + ship.length > 10) return false;
    }

    // Check for overlaps
    for (let i = 0; i < ship.length; i++) {
      let checkX, checkY;

      if (vertical) {
        checkX = x; // check vertical for overlaps
        checkY = y + i; // Increment Y for each ship segment
      } else {
        checkX = x + i; // check horizontal for overlaps by incrementing X for each ship segment
        checkY = y; // Y stays same
      }

      if (this.board[checkY][checkX] !== null) {
        return false; // Spot already occupied
      }
    }

    // Place the ship
    for (let i = 0; i < ship.length; i++) {
      let placeX, placeY;

      if (vertical) {
        placeX = x; // X stays same for vertical placement
        placeY = y + i; // Increment Y for each ship segment
      } else {
        placeX = x + i; // Increment X for horizontal placement
        placeY = y; // Y stays same
      }

      this.board[placeY][placeX] = {
        ship,
        position: i,
        hit: false,
      };
    }

    this.ships.push(ship);
    return true;
  }

  attack(row, col) {
    // coordinates will be the value held by the clickable DOM
    if (this.board[row][col] === null) {
      this.board[row][col] = "miss";
      return 0;
    } else {
      this.board[row][col].hit = true;
      this.board[row][col].ship.hit();
      this.board[row][col].ship.isSunk();
      if (this.board[row][col].ship.sunk === true) {
        this.sunkShips++;

        // dom manipulation to show a ship was sunk
        return 2;
      }
      // hit
      return 1;
    }
  }

  generateBoard(parentDiv, shipCount, message, showBoats = false) {
    parentDiv.innerHTML = "";
    shipCount.innerHTML = "";
    this.board.forEach((element, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      element.forEach((cell, cellIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";

        // colour cells appropriately
        if (cell?.ship instanceof Ship) {
          if (showBoats === true) {
            cellDiv.style.backgroundColor = "gray";
          }
          if (cell?.ship.sunk === true) {
            cellDiv.style.backgroundColor = "salmon";
          }
        }

        if (cell !== null) {
          if (cell.hit === true || cell === "miss") {
            cellDiv.innerHTML = "o";
            cellDiv.classList.add("miss");
          }
          if (cell.hit === true) {
            cellDiv.innerHTML = "x";
            cellDiv.classList.add("hit");
          }
        }

        // ship count
        shipCount.innerHTML = this.ships.length - this.sunkShips;

        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = cellIndex;

        cellDiv.addEventListener("click", (e) => {
          e.preventDefault();
          const clickedRow = cellDiv.dataset.row;
          const clickedCol = cellDiv.dataset.col;

          const attackOut = this.attack(clickedRow, clickedCol, message);
          this.messaging(attackOut, message);
          this.generateBoard(parentDiv, shipCount, message);
        });

        rowDiv.appendChild(cellDiv);
      });
      parentDiv.appendChild(rowDiv);
    });
  }

  messaging(attackOutput, message) {
    message.innerHTML = "";
    // miss
    if (attackOutput === 0) {
      message.innerHTML = "you missed!";
      return;
    }

    // hit
    if (attackOutput === 1) {
      message.innerHTML = "you hit a ship!";
      return;
    }

    // sink
    if (attackOutput === 2) {
      message.innerHTML = "you sunk a ship!";
      return;
    }
  }

  botChoice(playerBoard, playerShipCount, message) {
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let row = random(0, 9);
    let col = random(0, 9);

    let maxTries = 0;

    while (true) {
      if (this.board?.[row]?.[col] === null) {
        maxTries++;
        const botAttack = this.attack(row, col);
        this.messaging(botAttack, message);
        this.generateBoard(playerBoard, playerShipCount, message, true);
        break;
      }

      if (this.board?.[row]?.[col] === "miss") {
        row = random(0, 9);
        col = random(0, 9);
        continue;
      }

      if (this.board?.[row]?.[col]?.ship instanceof Ship) {
        if (this.board[row][col].hit === true) {
          row = random(0, 9);
          col = random(0, 9);
          continue;
        } else if (this.board?.[row]?.[col]?.hit === false) {
          maxTries++;
          const botAttack = this.attack(row, col);
          this.messaging(botAttack, message);
          this.generateBoard(playerBoard, playerShipCount, message, true);
          break;
        }
      }

      // max attempts reached
      if (maxTries >= 100) {
        break;
      }
    }
  }

  restart() {
    // generate clear board
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this.ships = [];
    this.sunkShips = 0;

    this.placeShipsRandomly();
  }
}
