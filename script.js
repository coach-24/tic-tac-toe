const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.index);

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  board[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  clickedCell.textContent = currentPlayer;

  checkWin();
  if (gameActive) {
      checkDraw();
  }
  if (gameActive) {
    switchPlayer();
  }
}


function checkWin() {
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      messageDisplay.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      celebrateWin();
      return;
    }
  }
}

function checkDraw() {
  let draw = !board.includes("");

  if (draw) {
    messageDisplay.textContent = "It's a draw!";
    gameActive = false;
  }
}


function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
}


function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  messageDisplay.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

function celebrateWin() {
  const numberOfConfetti = 100;
  const numberOfCrackers = 5; //Number of cracker elements

  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;


    const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const endX = (Math.random() - 0.5) * window.innerWidth;
    const endY = window.innerHeight * 1.5;

    confetti.style.setProperty('--confetti-end-x', `${endX}px`);
    confetti.style.setProperty('--confetti-end-y', `${endY}px`);


    document.body.appendChild(confetti);

    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }

  // Cracker Animations
  for (let i = 0; i < numberOfCrackers; i++) {
        const cracker = document.createElement('div');
        cracker.classList.add('cracker');

        // Randomize the cracker's starting X position at the bottom of the screen
        const startX = Math.random() * window.innerWidth;
        cracker.style.setProperty('--cracker-start-x', `${startX}px`);


        document.body.appendChild(cracker);

        cracker.addEventListener('animationend', () => {
            cracker.remove();
        });
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

messageDisplay.textContent = `Player ${currentPlayer}'s turn`;