/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
// board is an array of 6 arrays, each with 7 "cells"
/* [[ud, ud, ud, ud, ud, ud, ud],
    [ud, ud, ud, ud, ud, ud, ud],
    [ud, ud, ud, ud, ud, ud, ud],
    [ud, ud, ud, ud, ud, ud, ud],
    [ud, ud, ud, ud, ud, ud, ud],
    [ud, ud, ud, ud, ud, ud, ud]] */
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
      board.push(Array.from({length: WIDTH}));
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // selecting the table in HTML with the id of board, in HTML file
  let htmlBoard = document.getElementById('board');

  // TODO: add comment for this code

  // creates a table row element
  let top = document.createElement("tr");
  // sets its id to column-top
  top.setAttribute("id", "column-top");
  // adds a click event listener that runs the function handleClick when you click on the top table row
  top.addEventListener("click", handleClick);

  // loops for WIDTH amount of times
  for (let x = 0; x < WIDTH; x++) {
    // creates a head cell which is a table data element, a single cell that contains data/can be manipulated in a table fashion
    let headCell = document.createElement("td");
    // sets the newly created td to have an id of a number between 0 - WIDTH, representing each column of the board
    headCell.setAttribute("id", x);
    // appends these head cells to the table row created in the previous step
    top.append(headCell);
  }
  // appends the top row to the html board made on line 29
  htmlBoard.append(top);

  // TODO: add comment for this code

  // loops for HEIGHT amount of times
  for (let y = 0; y < HEIGHT; y++) {
    // creates a table row element
    const row = document.createElement("tr");
    // loops WIDTH amount of times
    for (let x = 0; x < WIDTH; x++) {
      // creates table data cell
      const cell = document.createElement("td");
      // sets its id to be HEIGHT-WIDTH representing the place on the board
      cell.setAttribute("id", `${y}-${x}`);
      // appends the cell to the row
      row.append(cell);
    }
    // appends the row of cells to the html <table> in the HTML file
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  // find the lowest empty spot in the game board
    // return the y coordinate or null if column is filled
  for (let y = board.length - 1; y > 0; y--){
    if (y !== null) {
      return x;
    }
  }

  // return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);

  let correctTd = document.querySelector(`td[id='${y}-${x}']`);
  correctTd.append(piece);
}

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
    // x will be 0 - 6 (7 total)
    // evt.target is for the top selector column to choose where to place the piece
  let x = +evt.target.id;
  console.log(x)

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row=>{row.every(cell=>cell===null)})) {
    endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
    // how do we switch players?
    // if currPlayer === 1, on this CLICK, we switch currPlayer to 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
