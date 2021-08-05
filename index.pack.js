class Player {
  constructor(playerName, marker) {
    this.playerName = playerName;
    this.marker = marker;
  }

  get getName() {
    return this.playerName;
  }

  get getMarker() {
    return this.marker;
  }
}

class Gameboard {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  render() {
    this.board.forEach((el, index) => {
      let newElement = document.createElement("div");
      newElement.classList.add("square", "material-icons-outlines");
      newElement.dataset.index = index;
      newElement.addEventListener("click", handleClick, { once: true });
      gameBoardSquareEl.appendChild(newElement);
    });
  }

  updateBoard() {
    const squareEls = document.querySelectorAll(".square");
    squareEls.forEach((el, index) => {
      el.innerText = this.board[index];
      el.innerHTML =
        this.board[index] === "x"
          ? `<img class="cross-icon" src="icons/cross.svg">`
          : this.board[index] === "o"
          ? `<img class="circle-icon" src="icons/circle.svg">`
          : "";
    });
  }

  placeMark(cell, currentMarker) {
    this.board[cell.dataset.index] = currentMarker;
  }

  checkDraw() {
    return this.board.every((el) => el !== "");
  }

  checkWin(currentMarker) {
    return this.winningCombinations.some((combination) => {
      return combination.every((index) => {
        return this.board[index].includes(currentMarker);
      });
    });
  }
}

class Game {
  constructor() {
    this.gameboard = new Gameboard();
    this.players = [new Player(), new Player()];
    this.circleTurn = true;
  }

  swapTurns() {
    this.circleTurn = !this.circleTurn;
  }
}

let game = new Game();
const playerFormEl = document.querySelector(".player-form");
const gameBoardElement = document.querySelector(".gameboard");
const gameBoardSquareEl = document.querySelector(".squares");
const gameStatusSelection = document.querySelector(".game-status__player-name");
const winnerMessageEl = document.querySelector(".winning-message");
const winnerText = document.querySelector(".winner");
const restartBtn = document.querySelector(".btn--restart");

playerFormEl.addEventListener("submit", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const player1Name = formData.get("player1");
  const player2Name = formData.get("player2");
  game.players[0] = new Player(player1Name, "o");
  game.players[1] = new Player(player2Name, "x");
  updateStatus();
  playerFormEl.classList.add("hide");
  gameBoardElement.classList.remove("hide");
  game.gameboard.render();
}

function handleClick(e) {
  const cell = e.target;
  const currentMarker = game.circleTurn ? game.players[0].getMarker : game.players[1].getMarker;
  game.gameboard.placeMark(cell, currentMarker);
  game.gameboard.updateBoard();

  if (game.gameboard.checkWin(currentMarker)) {
    winnerText.innerText = game.circleTurn ? game.players[0].getName : game.players[1].getName;
    winnerMessageEl.classList.remove("hide");
  } else if (game.gameboard.checkDraw()) {
    winnerText.innerText = "Nobody";
    winnerMessageEl.classList.remove("hide");
  } else {
    game.swapTurns();
    updateStatus();
  }
}

function updateStatus() {
  if (game.circleTurn) {
    gameStatusSelection.innerText = game.players[0].getName;
  } else {
    gameStatusSelection.innerText = game.players[1].getName;
  }
}

function restartGame() {
  for (let index in game.gameboard.board) {
    game.gameboard.board[index] = "";
  }

  gameBoardSquareEl.innerHTML = "";
  game.gameboard.render();
  winnerMessageEl.classList.add("hide");
}
