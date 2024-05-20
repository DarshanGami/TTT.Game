let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let drawMatch = document.querySelector(".drawMatch");
let drw = document.querySelector("#drw");
let newGameBtn1 = document.querySelector("#new-btn1");

let btnO = document.querySelector("#btnO");
let btnX = document.querySelector("#btnX");
let choice = document.querySelector(".choice");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

choice.classList.remove("hpp");

let turnO = false,turnX = false; // playerX , playerO
btnO.addEventListener("click",() => {
    turnO = true;
    // console.log("select O");
    choice.classList.add("hpp");
});

btnX.addEventListener("click",() => {
    turnX = true;
    // console.log("select X");
    choice.classList.add("hpp");
});

let cnt = 0;
let flag = true;
boxes.forEach((box) => {
     box.addEventListener("click",() => {
        // console.log("box was clicked");

        
        if(turnO) // playerO
        {
            box.innerText = "O";
            turnO = false;
            turnX = true;
            box.disabled = true;    
            cnt++;
        }
        else if(turnX) // playerX
        {
            box.innerText = "X";
            turnO = true;
            turnX = false;
            box.disabled = true;
            cnt++;
        }
        
        checkwinner();

        if(cnt===9 && flag)
        {
            CheckMatch();
            turnO = false;
            turnX = false; 
            cnt = 0;
        }

     });
});

const resetGame = () => {
    turnO = true;
    cnt = 0;
    flag = true;
    turnO = false;
    turnX = false; 
    enableBoxes();
    drawMatch.classList.add("Hd");
    msgContainer.classList.add("hide");
    choice.classList.remove("hpp");
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    choice.classList.add("hpp");
    disabledBoxes();
}

const CheckMatch = () => {
    drw.innerText = `Match is Draw`;
    drawMatch.classList.remove("Hd");
    choice.classList.add("hpp");
    disabledBoxes();
} 

const checkwinner = () => {
    for(pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]],
        //     boxes[pattern[1]],
        //     boxes[pattern[2]]
        // );
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 === pos2 && pos2 === pos3)
            {
                console.log("WINNER");
                flag = false;
                showWinner(pos1);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
newGameBtn1.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);