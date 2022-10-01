let currPlayer = 'X';
let GameStatus = '';

const boxes = document.querySelectorAll('.box');

const selectBox = (element) => {
    if (element.target.innerText === '') {
        element.target.innerText = currPlayer;
        switchPlayer();
    } 
    else {
        alert('Already filled');
    }
    checkWinner();
}

const switchPlayer = () => {
    currPlayer = currPlayer === 'X' ? 'O' : 'X';
    document.querySelector('#player').innerText = `${currPlayer}'s`;
}

const checkWinner = () => {
    const box1 = document.querySelector('#box1');
    const box2 = document.querySelector('#box2');
    const box3 = document.querySelector('#box3');
    const box4 = document.querySelector('#box4');
    const box5 = document.querySelector('#box5');
    const box6 = document.querySelector('#box6');
    const box7 = document.querySelector('#box7');
    const box8 = document.querySelector('#box8');
    const box9 = document.querySelector('#box9');

    if (box1.innerText !== '' && box1.innerText === box2.innerText && box1.innerText === box3.innerText) {
        GameStatus = `${box1.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
    if (box4.innerText !== '' && box4.innerText === box5.innerText && box4.innerText === box6.innerText) {
        GameStatus = `${box4.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
    if (box7.innerText !== '' && box7.innerText === box8.innerText && box7.innerText === box9.innerText) {
        GameStatus = `${box7.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
    if (box1.innerText !== '' && box1.innerText === box4.innerText && box1.innerText === box7.innerText) {
        GameStatus = `${box1.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
    if (box2.innerText !== '' && box2.innerText === box5.innerText && box2.innerText === box8.innerText) {
        GameStatus = `${box2.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
    if (box3.innerText !== '' && box3.innerText === box6.innerText && box3.innerText === box9.innerText) {
        GameStatus = `${box3.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
    if (box1.innerText !== '' && box1.innerText === box5.innerText && box1.innerText === box9.innerText) {
        GameStatus = `${box1.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }

    if (box3.innerText !== '' && box3.innerText === box5.innerText && box3.innerText === box7.innerText) {
        GameStatus = `${box3.innerText} won`;
        setTimeout(() => {
            alert(GameStatus);
            resetGame();
        }, 100);
        return;
    }
}

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
    })
}

boxes.forEach(box => {
    box.addEventListener('click', selectBox);
}
)

const reset = document.querySelector('#reset');
reset.addEventListener('click', resetGame);
