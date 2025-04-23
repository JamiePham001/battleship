# Battleship Game

A modern frontend JavaScript implementation of the classic Battleship game featuring player vs computer gameplay with randomized ship placement.

## Features

- **Player vs Computer Gameplay**: Human player battles against an AI opponent
- **Randomized Ship Placement**: Ships are placed randomly at game start
- **Visual Feedback**: Color-coded cells show hits, misses, and sunk ships
- **Ship Tracking**: Displays remaining ships for both players
- **Auto-Restart**: Game automatically resets after a winner is determined

## Game Components

### Ship Class

- Tracks ship length, hit count, and sunk status
- Methods:
  - `hit()`: Increments hit counter
  - `isSunk()`: Checks if ship is sunk based on hits vs length

### Gameboard Class

- Manages 10x10 game board state
- Key Methods:
  - `placeShipsRandomly()`: Randomly places ships with collision detection
  - `attack(row, col)`: Processes attacks (returns 0=miss, 1=hit, 2=sunk)
  - `generateBoard()`: Renders the board to DOM
  - `botChoice()`: AI logic for selecting attack coordinates

### Player Class

- Extends Gameboard with player-specific functionality
- Includes name property for player identification

## How to Play

1. The game automatically places ships for both players
2. Click on the bot's board to attack a coordinate
3. The bot will automatically counter-attack
4. Game continues until all ships of one player are sunk
5. Winner is announced and game resets after 5 seconds

## Technical Details

- **Board Representation**:

  - 2D array (10x10) storing cell states
  - `null` = empty water
  - `{ ship, position, hit }` = ship segment
  - `"miss"` = missed attack

- **AI Logic**:

  - Random coordinate selection with validation
  - Avoids re-attacking same spots
  - Limited to 100 attempts to prevent infinite loops

- **DOM Interaction**:
  - Dynamic board generation
  - Visual feedback for hits/misses/sunk ships
  - Ship counter updates in real-time

## Setup

1. Clone repository
2. Open `index.html` in browser
3. No dependencies required - runs with vanilla JavaScript

## Code Structure

battleship/
├── index.html # Main HTML file
├── styles.css # Game styling
├── ship-class.js # Ship class implementation
├── gameboard-class.js # Gameboard logic
└── player-class.js # Player class extending Gameboard
