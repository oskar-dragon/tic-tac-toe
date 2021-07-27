/* 
1. Create a factory function that will create players - Done
2. Create function that will render of the gameboard array to the webpage
3. Create function that allows palyers to add marks to specific spot on the board
4. Create a logic that checks when the game is over (should check for 3 in a row and a tie).
When the game is over, a restart button should show up
5. Create an interface where players can put their names. It should include start button
6. Create a display element, that congratulates the winning player

Optional: create an AI so that player can play against computer.
- Start by getting a computer to make random move
- Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable
 AI using the minimax algorithm (read about it here, some googling will help you out with this one)
*/

const CreatePlayer = (name, marker) => {
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
  const player1 = CreatePlayer(player1Name, "circle");
  const player2 = CreatePlayer(player2Name, "close");

  playerFromEl.classList.add("hide");
  gameBoardEl.classList.remove("hide");
  gameBoard.render();
}

const gameBoard = (() => {
  const board = ["x", "o", "", "", "", "", "", "", ""];

  let parentEl = document.querySelector(".squares");

  const render = () => {
    board.forEach((el, index) => {
      let newElement = document.createElement("div");
      newElement.classList.add("square", "material-icons-outlined");
      newElement.dataset.index = index + 1;
      newElement.innerHTML =
        el === "x"
          ? `<img class="circle-icon" src="icons/circle.svg">`
          : el === "o"
          ? `<img class="cross-icon" src="icons/cross.svg">`
          : "";
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
