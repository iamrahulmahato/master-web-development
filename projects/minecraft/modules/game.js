//imports
import { buildPlayerBoard } from "./gridGenerator.js"
import { inventory } from "./gridGenerator.js"
//initialize board
buildPlayerBoard()
document.addEventListener('DOMContentLoaded', function () {
    updateUI()

}, false);
//dom elements
const leavesAmt = document.querySelector('#leaves-amt');
const grassAmt = document.querySelector('#grass-amt');
const treeAmt = document.querySelector('#tree-amt');
const stoneAmt = document.querySelector('#stone-amt');
const coalAmt = document.querySelector('#coal-amt');
const rubyAmt = document.querySelector('#ruby-amt');
const diamondAmt = document.querySelector('#diamond-amt');
const pickaxe = document.querySelector('#pickaxe');
const hatchet = document.querySelector('#hatchet');
const shovel = document.querySelector('#shovel');
const invblocks = document.querySelectorAll('.control-shadow')
const body = document.querySelector('body')
const gamegrid = document.querySelector('#gamegrid')
//buttons
export const restartBtn = document.querySelector('#restartBtn')
const menuBtn = document.querySelector('#menuBtn')
const nvmBtn = document.querySelector('#nvmBtn')
export const resetBtn = document.querySelector('#resetBtn')

//Inventory listeners
restartBtn.addEventListener('click', (e) => {
    e.target.classList.add('hidden')
    resetBtn.classList.remove('hidden')
    menuBtn.classList.remove('hidden')
    nvmBtn.classList.remove('hidden')
})
nvmBtn.addEventListener('click', (e) => {
    e.target.classList.add('hidden')
    resetBtn.classList.add('hidden')
    menuBtn.classList.add('hidden')
    restartBtn.classList.remove('hidden')
})
menuBtn.addEventListener('click', () => {
    location.href = './'
})
resetBtn.addEventListener('click', (e) => {
    e.target.classList.add('hidden')
    menuBtn.classList.add('hidden')
    nvmBtn.classList.add('hidden')
    restartBtn.classList.add('hidden')
    resetBtn.disabled = true
    resetWorld()
})

function resetWorld() { //resets our world and inventory on the current configuration without going back to menu.
    let inv = JSON.parse(localStorage.getItem('inv'));
    inventory.coal = inv.coal
    inventory.ruby = inv.ruby
    inventory.stone = inv.stone
    inventory.tree = inv.tree
    inventory.diamond = inv.diamond
    inventory.grass = inv.grass
    inventory.leaves = inv.leaves
    updateUI()
    gamegrid.innerHTML = ''
    buildPlayerBoard()
}

//UI Listeners
leavesAmt.addEventListener('click', (e) => {
    if (inventory.leaves > 0) {
        resetTools()
        e.target.classList.add('control-active')
        body.style.cursor = `url('/assets/images/blocks/Cursors/leaves.cur') , auto`
        setTool('leaves')
    }
})
grassAmt.addEventListener('click', (e) => {
    if (inventory.grass > 0) {
        resetTools()
        body.style.cursor = `url('/assets/images/blocks/Cursors/grass.cur') , auto`
        e.target.classList.add('control-active')
        setTool('grass')
    }
})
treeAmt.addEventListener('click', (e) => {
    if (inventory.tree > 0) {
        resetTools()
        body.style.cursor = `url('/assets/images/blocks/Cursors/tree.cur') , auto`
        e.target.classList.add('control-active')
        setTool('tree')
    }
})
stoneAmt.addEventListener('click', (e) => {
    if (inventory.stone > 0) {
        resetTools()
        body.style.cursor = `url('/assets/images/blocks/Cursors/stone.cur') , auto`
        e.target.classList.add('control-active')
        setTool('stone')
    }
})
coalAmt.addEventListener('click', (e) => {
    if (inventory.coal > 0) {
        resetTools()
        body.style.cursor = `url('/assets/images/blocks/Cursors/coal.cur') , auto`
        e.target.classList.add('control-active')
        setTool('coal')
    }
})
rubyAmt.addEventListener('click', (e) => {
    if (inventory.ruby > 0) {
        resetTools()
        body.style.cursor = `url('/assets/images/blocks/Cursors/ruby.cur') , auto`
        e.target.classList.add('control-active')
        setTool('ruby')
    }
})
diamondAmt.addEventListener('click', (e) => {
    if (inventory.diamond > 0) {
        resetTools()
        body.style.cursor = `url('/assets/images/blocks/Cursors/diamond.cur') , auto`
        e.target.classList.add('control-active')
        setTool('diamond')
    }
})
pickaxe.addEventListener('click', (e) => {
    resetTools()
    body.style.cursor = `url('/assets/images/blocks/Cursors/pickaxe.cur') , auto`
    e.target.classList.add('control-active')
    setTool('pickaxe')
})
hatchet.addEventListener('click', (e) => {
    resetTools()
    body.style.cursor = `url('/assets/images/blocks/Cursors/hatchet.cur') , auto`
    e.target.classList.add('control-active')
    setTool('hatchet')
})
shovel.addEventListener('click', (e) => {
    resetTools()
    body.style.cursor = `url('/assets/images/blocks/Cursors/shovel.cur') , auto`
    e.target.classList.add('control-active')
    setTool('shovel')
})

function setTool(tool) {//sets our current tool variable's value so we can identify what were clicking with
    inventory.currentTool = tool;
}


export function clickTile(e) {//holds our tile "harvesting" logic
    let tool = inventory.currentTool;
    let classList = e.target.classList
    let tileId = e.target.id.split('x')
    tileId[1]--
    let nextTileAbove = document.querySelector(`#${tileId.join('x')}`)
    if (classList.contains('leaves') && tool === 'hatchet' && nextTileAbove.classList.contains('sky')) {
        classList.remove('leaves')
        classList.add('sky')
        leavesAmt.classList.add('pulse')
        inventory.leaves += 1
    } else if (classList.contains('ruby') && tool === 'pickaxe' && nextTileAbove.classList.contains('sky')) {
        classList.remove('ruby')
        classList.add('sky')
        rubyAmt.classList.add('pulse')
        inventory.ruby += 1
    } else if (classList.contains('diamond') && tool === 'pickaxe' && nextTileAbove.classList.contains('sky')) {
        classList.remove('diamond')
        classList.add('sky')
        diamondAmt.classList.add('pulse')
        inventory.diamond += 1
    } else if (classList.contains('coal') && tool === 'pickaxe' && nextTileAbove.classList.contains('sky')) {
        classList.remove('coal')
        classList.add('sky')
        coalAmt.classList.add('pulse')
        inventory.coal += 1
    } else if (classList.contains('tree') && tool === 'hatchet' && nextTileAbove.classList.contains('sky')) {
        classList.remove('tree')
        classList.add('sky')
        treeAmt.classList.add('pulse')
        inventory.tree += 1
    } else if (classList.contains('grass') && tool === 'shovel' && nextTileAbove.classList.contains('sky')) {
        classList.remove('grass')
        classList.add('sky')
        grassAmt.classList.add('pulse')
        inventory.grass += 1
    } else if (classList.contains('stone') && tool === 'pickaxe' && nextTileAbove.classList.contains('sky')) {
        classList.remove('stone')
        classList.add('sky')
        stoneAmt.classList.add('pulse')
        inventory.stone += 1
    } else if (classList.contains('sky') && nextTileAbove != null) {
        layTile(e)
    }
    updateUI()
}

function layTile(e) {//holds our tile "laying" logic
    let classList = e.target.classList
    let currentTool = inventory.currentTool
    if (currentTool === 'leaves' && inventory.leaves > 0) {
        classList.add('leaves')
        classList.remove('sky')
        inventory.leaves--

    } else if (currentTool === 'ruby' && inventory.ruby > 0) {
        classList.add('ruby')
        classList.remove('sky')
        inventory.ruby--

    } else if (currentTool === 'diamond' && inventory.diamond > 0) {
        classList.add('diamond')
        classList.remove('sky')
        inventory.diamond--

    } else if (currentTool === 'coal' && inventory.coal > 0) {
        classList.add('coal')
        classList.remove('sky')
        inventory.coal--

    } else if (currentTool === 'grass' && inventory.grass > 0) {
        classList.add('grass')
        classList.remove('sky')
        inventory.grass--

    } else if (currentTool === 'tree' && inventory.tree > 0) {
        classList.add('tree')
        classList.remove('sky')
        inventory.tree--

    } else if (currentTool === 'stone' && inventory.stone > 0) {
        classList.add('stone')
        classList.remove('sky')
        inventory.stone--

    }
}

function resetTools() {//sets all tools to "unactive" visually
    invblocks.forEach(element => {
        element.classList.remove('control-active')
    })
}

function updateUI() { // updates our UI
    invblocks.forEach(element => {
        setTimeout(() => { element.classList.remove('pulse') }, 500)
    })
    leavesAmt.innerHTML = inventory.leaves
    grassAmt.innerHTML = inventory.grass
    treeAmt.innerHTML = inventory.tree
    stoneAmt.innerHTML = inventory.stone
    coalAmt.innerHTML = inventory.coal
    rubyAmt.innerHTML = inventory.ruby
    diamondAmt.innerHTML = inventory.diamond
}