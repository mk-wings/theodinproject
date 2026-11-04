const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";
let moves = 0;
let gameOver = false;

function checkWinner() {
    for (const line of winningLines) {
        const first = cells[line[0]];
        const second = cells[line[1]];
        const third = cells[line[2]];

        if (
            first.textContent === currentPlayer &&
            second.textContent === currentPlayer &&
            third.textContent === currentPlayer
        ) {
            first.classList.add("winner");
            second.classList.add("winner");
            third.classList.add("winner");
            return true;
        }
    }

    return false;
}

function finishGame(text) {
    gameOver = true;
    statusText.textContent = text;

    cells.forEach(function (cell) {
        cell.disabled = true;
    });
}

cells.forEach(function (cell, index) {
    cell.addEventListener("click", function () {
        if (gameOver || cell.textContent !== "") {
            return;
        }

        cell.textContent = currentPlayer;
        cell.setAttribute("aria-label", "Клетка " + (index + 1) + ": " + currentPlayer);
        cell.disabled = true;
        moves++;

        if (checkWinner()) {
            finishGame("Победил: " + currentPlayer + "!");
            return;
        }

        if (moves === 9) {
            finishGame("Ничья!");
            return;
        }

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        statusText.textContent = "Ходит: " + currentPlayer;
    });
});

restartButton.addEventListener("click", function () {
    currentPlayer = "X";
    moves = 0;
    gameOver = false;
    statusText.textContent = "Ходит: X";

    cells.forEach(function (cell, index) {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("winner");
        cell.setAttribute("aria-label", "Клетка " + (index + 1) + ": пусто");
    });
});
