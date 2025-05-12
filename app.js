let gameSeq = [];
let userSeq = [];
let btns = ["pink", "blue", "brown", "yellow"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");

document.addEventListener("keypress", function () {
    if (!start) {
        console.log("Game Started");
        start = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 300);
}
function updateScore() {
    scoreDisplay.innerText = `Score: ${level * 1}`; 
}


function levelUp() {
    level++;
    userSeq = [];
    h2.innerText = `Level ${level}`;
    updateScore();
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct move");

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br> Press any key to start.`;
        document.querySelector("body").style.color = "red";
        setTimeout(function () {
            document.querySelector("body").style.color = "white"; 
        },1000   );
        reset();
    }
}

function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute("id");

    userFlash(btn);
    userSeq.push(userColor);

    checkAns();
}

function reset() {
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));