document.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset");
    let resultDisplay = document.createElement("h2");
    let turnO = true;
    let gameActive = true;

    resultDisplay.id = "result";
    document.querySelector("h1").after(resultDisplay);

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (!gameActive || box.textContent !== "") return;

            let currentPlayer = turnO ? "O" : "X";
            box.textContent = currentPlayer;
            box.classList.add(currentPlayer === "O" ? "o-color" : "x-color");

            if (checkWinner(currentPlayer)) {
                resultDisplay.textContent = `${currentPlayer} Wins!`;
                gameActive = false;
                return;
            }

            if ([...boxes].every(box => box.textContent !== "")) {
                resultDisplay.textContent = "It's a Draw!";
                gameActive = false;
                return;
            }

            turnO = !turnO;
        });
    });

    function checkWinner(player) {
        return winPatterns.some(pattern =>
            pattern.every(index => boxes[index].textContent === player)
        );
    }

    resetBtn.addEventListener("click", () => {
        gameActive = true;
        turnO = true;
        resultDisplay.textContent = "";
        boxes.forEach(box => {
            box.textContent = "";
            box.classList.remove("o-color", "x-color");
        });
    });
});