import { clickTile, resetBtn, restartBtn } from "./game.js";

let matrixBoard = JSON.parse(localStorage.getItem('map')); // pulls out the map generated earlier by tileGenerator.js

export let inventory = JSON.parse(localStorage.getItem('inv'));
const grid = document.querySelector('#gamegrid')
const rocks = document.querySelector('#rocksSound')

export function buildPlayerBoard() { // laying the "bricks"
    rocks.play()
    let tileDelay = 0 // just a delay counter for our setTimeout "drop" animation.
    grid.style.gridTemplateRows = `repeat(${matrixBoard.length},1fr)` //sets our grid rows
    grid.style.gridTemplateColumns = `repeat(${matrixBoard[0].length},1fr)` //sets our grid columns
    matrixBoard.forEach((rows, ridx) => { // starts laying the bricks by reading our matrixBoard and making descisions 
        rows.forEach((col, cidx) => {
            let tile = document.createElement('div')
            tile.classList.add('tile')
            switch (col) {
                case 'leaves':
                    tile.classList.add('leaves')
                    break;
                case 'ruby':
                    tile.classList.add('ruby')
                    break;
                case 'diamond':
                    tile.classList.add('diamond')
                    break;
                case 'coal':
                    tile.classList.add('coal')
                    break;
                case 'tree':
                    tile.classList.add('tree')
                    break;
                case 'grass':
                    tile.classList.add('grass')
                    break;
                case 'stone':
                    tile.classList.add('stone')
                    break;
                case 'sky':
                    tile.classList.add('sky')
                    break;
                default:
                    break;
            }
            tileDelay += 10
            setTimeout(() => {
                grid.appendChild(tile)
                tile.classList.add('bounce')
                tile.id = `x${ridx}x${cidx}` // sets an id , so we can later use it to identify if there is a block or sky tile above us
                tile.addEventListener('click', (e) => { // adding an event listener to each individual tile.
                    clickTile(e)
                })

            }, tileDelay)
        })
    })
    setTimeout(() => { //stops our falling rocks sfx , and brings out our game menu buttons
        rocks.pause()
        restartBtn.classList.remove('hidden')
        resetBtn.disabled = false
    }, tileDelay)
}