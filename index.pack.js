const createPlayer = (name, marker) => {
  return { name, marker };
};

const playerFromEl = document.querySelector(".player-form");
const gameBoardEl = document.querySelector(".gameboard");

playerFromEl.addEventListener("submit", startGame);

function startGame(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const player1Name = formData.get("player1");
  const player2Name = formData.get("palyer2");
  const player1 = createPlayer(player1Name, "circle");
  const player2 = createPlayer(player2Name, "cross");

  playerFromEl.classList.add("hide");
  gameBoardEl.classList.remove("hide");
  gameBoard.render();
}

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  let parentEl = document.querySelector(".squares");

  const render = () => {
    board.forEach((el, index) => {
      let newElement = document.createElement("div");
      newElement.classList.add("square", "material-icons-outlined");
      newElement.dataset.index = index + 1;
      newElement.innerText = el;
      parentEl.appendChild(newElement);
    });
  };

  return {
    render,
  };
})();

const displayController = (() => {
  const squares = document.querySelectorAll(".square");

  const addMarker = (e) => {};

  for (const square of squares) {
    square.addEventListener("click", addMarker, { once: true });
  }
})();
