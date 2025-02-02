const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create the game board dynamically
function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.setAttribute("aria-label", `Cell ${index + 1}`);
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

// Handle player moves
function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for a winner or a draw
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.textContent = `Player ${gameBoard[a]} wins! 🎉`;
            highlightWinningCells(pattern);
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a draw! 🤝";
        gameActive = false;
    }
}

// Highlight the winning cells
function highlightWinningCells(winningPattern) {
    winningPattern.forEach(index => {
        const cell = board.children[index];
        cell.classList.add("winner");
    });
}

// Restart the game
restartBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    createBoard();
});

// Initialize the game
createBoard();
