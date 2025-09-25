const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let cells = [];

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (!gameActive) return;
  if (cells[index].textContent !== "") return;

  cells[index].textContent = currentPlayer;
  cells[index].classList.add("taken");

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if ([...cells].every(cell => cell.textContent !== "")) {
    status.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }
  return false;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  createBoard();
}

createBoard();
