const createPlayer = (name, marker) => {
  return { name, marker };
};

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

gameBoard.render();

const displayController = (() => {
  const player1 = createPlayer("Player 1", "x");
  const player2 = createPlayer("Player 2", "o");

  const squares = document.querySelectorAll(".square");

  const addMarker = (e) => {};

  for (const square of squares) {
    square.addEventListener("click", addMarker);
  }
})();
