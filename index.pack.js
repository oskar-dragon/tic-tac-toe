/*
TO DO:
1. Create funtion that will check if its draw
2. Check why after restart names and "Xs" are mixed up
*/

let board = ["", "", "", "", "", "", "", "", ""];
let circleTurn = true;
let player1;
let player2;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};
// ELEMENT SELECTORS
const playerFormEl = document.querySelector(".player-form");
const gameBoardElement = document.querySelector(".gameboard");
const gameBoardSquareEl = document.querySelector(".squares");
const gameStatusSelection = document.querySelector(".game-status__player-name");
const winnerMessageEl = document.querySelector(".winning-message");
const winnerText = document.querySelector(".winner");
const restartBtn = document.querySelector(".btn--restart");

// EVENT LISTENERS
playerFormEl.addEventListener("submit", startGame);
restartBtn.addEventListener("click", restartGame);

// FUNCTIONS
function startGame(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const player1Name = formData.get("player1");
  const player2Name = formData.get("player2");
  player1 = Player(player1Name, "o");
  player2 = Player(player2Name, "x");
  gameStatusSelection.innerText = player1.getName();
  playerFormEl.classList.add("hide");
  gameBoardElement.classList.remove("hide");
  renderBoard();
}

function renderBoard() {
  board.forEach((el, index) => {
    let newElement = document.createElement("div");
    newElement.classList.add("square", "material-icons-outlined");
    newElement.dataset.index = index;
    newElement.addEventListener("click", handleClick, { once: true });
    gameBoardSquareEl.appendChild(newElement);
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentMarker = circleTurn ? player1.getMarker() : player2.getMarker();
  placeMark(cell, currentMarker);
  updateBoard();

  if (checkWin(currentMarker)) {
    winnerText.innerText = circleTurn ? player1.getName() : player2.getName();
    winnerMessageEl.classList.remove("hide");
  } else if (checkDraw()) {
    winnerText.innerText = "Nobody";
    winnerMessageEl.classList.remove("hide");
  } else {
    swapTurns();
    updateStatus();
  }
}

function placeMark(cell, currentMarker) {
  board[cell.dataset.index] = currentMarker;
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function updateBoard() {
  const squareEls = document.querySelectorAll(".square");
  squareEls.forEach((el, index) => {
    el.innerText = board[index];
    el.innerHTML =
      board[index] === "x"
        ? `<img class="cross-icon" src="icons/cross.svg">`
        : board[index] === "o"
        ? `<img class="circle-icon" src="icons/circle.svg">`
        : "";
  });
}

function updateStatus() {
  if (circleTurn) {
    gameStatusSelection.innerText = player1.getName();
  } else {
    gameStatusSelection.innerText = player2.getName();
  }
}

function checkWin(currentMarker) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return board[index].includes(currentMarker);
    });
  });
}

function checkDraw() {
  return board.every((el) => el !== "");
}

function restartGame() {
  for (let index in board) {
    board[index] = "";
  }

  clearBoard();
  renderBoard();

  winnerMessageEl.classList.add("hide");
}

function clearBoard() {
  gameBoardSquareEl.innerHTML = "";
}
