const boxes = document.querySelectorAll('.bt');
const resultContainer = document.querySelector('.result-container');
const resultText = document.querySelector('.result-text');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleBoxClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        boxes[index].value = currentPlayer;
        checkWin();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    resultText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            resultText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            resetButton.disabled = false;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        resultText.textContent = 'It\'s a draw!';
        gameActive = false;
        resetButton.disabled = false;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.value = '';
    });
    currentPlayer = 'X';
    resultText.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
    resetButton.disabled = true;
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleBoxClick(index);
    });
});

resetButton.addEventListener('click', () => {
    resetGame();
});

resetGame(); // Initialize the game
