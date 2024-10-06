//////////////Load manager
import { generateArray } from "./tileGenerator.js";
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.display = "none";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.display = "";
    }
};
//Game Board size vars
let height = 24;
let width = 24;
//Sounds
const clickSound = document.querySelector('#clickSound');
//html elements
let arrows = document.querySelectorAll(".arrow");
let widthEl = document.querySelector('#Width');
let heightEl = document.querySelector('#Height')
let decWidth = document.querySelector('#decWidth')
let incWidth = document.querySelector('#incWidth')
let decHeight = document.querySelector('#decHeight')
let incHeight = document.querySelector('#incHeight')
const startBtn = document.querySelector('#startBtn');
const sandboxBtn = document.querySelector('#sandboxBtn')
//Event Listeners
arrows.forEach(element => { // add a sound event listener on click for each Chevron
    element.addEventListener('click', function (e) {
        clickSound.play()
    })
})

decWidth.addEventListener('click', () => {
    modSize('decWidth')
})

incWidth.addEventListener('click', () => {
    modSize('incWidth')
})

decHeight.addEventListener('click', () => {
    modSize('decHeight')
})

incHeight.addEventListener('click', () => {
    modSize('incHeight')
})

startBtn.addEventListener('click', () => {//our start button which initiates an empty inventory and stores it in localStorage
    generateArray(width, height, 'normal')
    location.href = '/game.html'
    let inventory = {
        currentTool: 0,
        leaves: 0,
        ruby: 0,
        diamond: 0,
        coal: 0,
        tree: 0,
        grass: 0,
        stone: 0
    }

    localStorage.setItem('inv', JSON.stringify(inventory))
})
sandboxBtn.addEventListener('click', () => {//our sandbox button which initiates a full inventory and stores it in localStorage
    generateArray(width, height, 'sandbox')
    location.href = '/game.html'
    let inventory = {
        currentTool: 999,
        leaves: 999,
        ruby: 999,
        diamond: 999,
        coal: 999,
        tree: 999,
        grass: 999,
        stone: 999
    }
    localStorage.setItem('inv', JSON.stringify(inventory))
})



function modSize(params) { //Updates the board size values to be used later as arguments in our gridGenerator function.
    switch (params) {
        case 'decWidth':
            if (width > 10) {
                width--
            }
            updateNums('left');
            break;
        case 'incWidth':
            if (width < 40) {
                width++
            }
            updateNums('left');
            break;
        case 'decHeight':
            if (height > 10) {
                height--
            }
            updateNums('right');
            break;
        case 'incHeight':
            if (height < 40) {
                height++
            }
            updateNums('right');
            break;
        default:
            break;
    }

}
function updateNums(side) { //Updates the Numbers on board size selection box
    switch (side) {
        case 'left':
            widthEl.innerHTML = width
            widthEl.classList.toggle('jello')
            break;
        case 'right':
            heightEl.innerHTML = height
            heightEl.classList.toggle('jello')
            break;
        default:
            break;
    }
    setTimeout(() => {
        widthEl.classList.remove('jello')
        heightEl.classList.remove('jello')
    }, 500)

}



