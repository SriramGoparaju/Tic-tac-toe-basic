const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
];
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
      "[data-winning-mesage-text]"
);
const restartButton = document.getElementById("restartButton");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
let oTurn;

// this function is called to start the game
startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
      // starting with X's turn
      oTurn = false;
      cellElements.forEach((cell) => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener("click", handleClick);
            cell.addEventListener("click", handleClick, { once: true });
      });
      setBoardHoverClass();
      winningMessageElement.classList.remove("show");
}

function handleClick(e) {
      const cell = e.target;
      const currentClass = oTurn ? O_CLASS : X_CLASS;
      placeMark(cell, currentClass);
      if (checkWin(currentClass)) {
            endgame(false);
      } else if (isDraw()) {
            endgame(true);
      }
      swapTurns();
      setBoardHoverClass();
}

// This function is run after the game is done, takes an boolen argument
function endgame(draw) {
      if (draw) {
            winningMessageTextElement.innerText = "DRAW";
      } else {
            winningMessageTextElement.innerText = `${
                  oTurn ? "O's WIN !!" : "X's WIN !!"
            }`;
      }
      winningMessageElement.classList.add("show");
}

function isDraw() {
      return [...cellElements].every((cell) => {
            return (
                  cell.classList.contains(X_CLASS) ||
                  cell.classList.contains(O_CLASS)
            );
      });
}

// Places mark based on whose turn it is
function placeMark(cell, currentClass) {
      // Each cell can have a class or O or X
      cell.classList.add(currentClass);
}

function swapTurns() {
      oTurn = !oTurn;
}

// removes all the existing classes for board and sets the class of current player
function setBoardHoverClass() {
      board.classList.remove(X_CLASS);
      board.classList.remove(O_CLASS);
      if (oTurn) {
            board.classList.add(O_CLASS);
      } else {
            board.classList.add(X_CLASS);
      }
}

function checkWin(currentClass) {
      return WINNING_COMBINATIONS.some((combination) => {
            return combination.every((index) => {
                  return cellElements[index].classList.contains(currentClass);
            });
      });
}
