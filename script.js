const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOver && !cell.textContent) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                message.textContent = `${currentPlayer} wins!`;
                gameOver = true;
            } else if ([...cells].every(cell => cell.textContent !== '')) {
                message.textContent = "It's a draw!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `${currentPlayer}'s Turn`;
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    message.textContent = "X's Turn";
    currentPlayer = 'X';
    gameOver = false;
});

function checkWin(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].classList.contains(player));
    });
}
