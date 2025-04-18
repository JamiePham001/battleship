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
      };
    }

    this.ships.push(ship);
    return true;
  }

  attack(row, col) {
    // coordinates will be the value held by the clickable DOM
    if (this.board[row][col] === null) {
      this.board[row][col] === "miss";
      return false;
    } else {
      this.board[row][col] === "hit";
      cell.ship.hit();
      if (cell.ship.isSunk()) {
        this.sunkShips++;
        this.checkWinner();
        return true;
      }
      // hit
      return false;
    }
  }

  checkWinner() {
    if (this.sunkShips === this.ships.length) {
      return true;
    }
    return false;
  }

  generateBoard() {
    //   parentDiv.innerHtml = ""
    this.board.forEach((element, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      rowindex.forEach((element, cellIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";

        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = cellIndex;

        cellDiv.addEventListener("click", (e) => {
          e.preventDefault();
          const clickedRow = cellDiv.dataset.row;
          const clickedCol = cellDiv.dataset.col;

          this.attack(clickedRow, clickedCol);
        });

        rowDiv.appendChild(cellDiv);
      });
      //   parentDiv.appendChild(rowDiv)
    });
  }
}
