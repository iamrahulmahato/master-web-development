const gameSeq = [];
let userSeq = [];
let highscore = 0;

let started = false;
let level = 0;
const btns = ["green", "red", "yellow", "blue"];
const h2 = document.querySelector("h2");
const highscoreEle = document.querySelector("#highscore");

document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) { 
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) { 
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        const currScore = level;
        h2.innerHTML = `Game over..! Your score was: <b>${currScore}</b> <br>Press any key to start.`;

        if (currScore > highscore) {
            highscore = currScore;
            highscoreEle.innerText = `High Score: ${highscore}`;
        }

        reset();

        document.querySelector("main").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("main").style.backgroundColor = "black";
        }, 150);   
    }
}

function btnPress() {
    const btn = this;
    console.log(this);

    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");

allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function reset() {
    started = false;
    gameSeq.length = 0;
    userSeq.length = 0;
    level = 0;
}
