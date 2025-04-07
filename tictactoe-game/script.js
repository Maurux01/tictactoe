// filepath: /tictactoe-game/tictactoe-game/script.js

let board = ['', '', '', '', '', '', '', '', '']; // Corrected to 9 elements
let currentPlayer = 'X';
let isGameActive = true;
let timer;
let timeLeft = 30; // 30 seconds for each turn
let isFirstMove = true;

const statusDisplay = document.getElementById('status');
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const timerDisplay = document.getElementById('timer');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    isGameActive = true;
    board.fill('');
    currentPlayer = 'X';
    timeLeft = 30;
    updateStatus();
    renderBoard();
    isFirstMove = true; // Reset for a new game
    timerDisplay.innerHTML = `Time left: ${timeLeft}s`; // Show initial time
    clearInterval(timer); // Clear any existing timer
}

function updateStatus() {
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
    timerDisplay.innerHTML = `Time left: ${timeLeft}s`;
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerHTML = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] !== '' || !isGameActive) {
        return;
    }
    board[index] = currentPlayer;
    renderBoard();
    checkResult();
    if (isGameActive) {
        switchPlayer();
        if (isFirstMove) {
            startTimer();
            isFirstMove = false;
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
    resetTimer();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }
    if (!board.includes('')) {
        statusDisplay.innerHTML = 'It\'s a draw!';
        isGameActive = false;
        return;
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            statusDisplay.innerHTML = `Player ${currentPlayer} has run out of time!`;
            isGameActive = false;
            // Optionally, you can switch the player after timeout
            switchPlayer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    if (!isFirstMove) {
        startTimer();
    }
}

restartButton.addEventListener('click', startGame);
startGame();