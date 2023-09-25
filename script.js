const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer);
        
        if (checkWin()) {
            status.textContent = `Jogador ${currentPlayer} ganhou!`;
            gameActive = false;
        } else if (checkDraw()) {
            status.textContent = 'Empate!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `É a vez do jogador ${currentPlayer}`;
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    status.textContent = '';
    gameActive = true;
}

board.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
        const cellIndex = Array.from(cells).indexOf(e.target);
        makeMove(cellIndex);
    }
});

status.textContent = `É a vez do jogador ${currentPlayer}`;
