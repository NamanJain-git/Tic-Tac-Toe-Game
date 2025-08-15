let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newg-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //PlayerX  PlayerO

let count = 0;

const winPatterns = [  //2d array for all winning patterns
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {  //Player O
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
            count = count + 1;
            console.log(count);
        }
        else {   //Player X
            box.innerText = "X";
            box.style.color = "#3e40b0ff";
            turnO = true;
            count = count + 1;
            console.log(count);
        }
        box.disabled = true;

        checkWinner();
        checkDraw();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
}

const checkDraw = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (count % 9 == 0) {
            if (pos1val != pos2val && pos2val != pos3val) {
                msg.innerText = `The game is Draw`
                msgContainer.classList.remove("hide");
                disableBoxes();
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);