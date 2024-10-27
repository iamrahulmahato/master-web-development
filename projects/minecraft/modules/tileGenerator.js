let result = [] //initiates a new array to hold our generated Grid

export function fillArray(width, height) {// filles the array above with arrays full of 0's according to the user's width and height selection
    let tempres = []
    for (let i = 0; i < height; i++) {
        let zeroArr = new Array(width).fill(0)
        tempres.push(zeroArr)

    }
    result = tempres
}

export function generateArray(width, height, mode) { //generates a randomized map by my algorithm , takes 3 parameters width , height , and gamemode.
    fillArray(width, height)
    if (mode === 'normal') {//if user has chosen normal mode starts generation of world
        let maxTrees = Math.floor(width * 0.3) - 2 // defines the maximum amount of trees considering map size
        let currentLayer = 4 // holds the current layer of map construction sky is 4 , leaves are 3 , trees are 2 etc..
        for (let row = 0; row < height; row++) { // starts iterating over the "result" arrays 
            for (let col = 0; col < width; col++) { // iterates inside the current array
                if (row < height * 0.2) { // lays down the sky on 20% mapsize
                    result[row][col] = 'sky'

                } else if (row < height * 0.4) { // lays down leaves on 40% mapsize
                    currentLayer = 3
                    let roll = Math.floor(Math.random() * 16) + 1
                    if (result[row][col] == 0 && roll < 8 && currentLayer == 3 && maxTrees > 0) {
                        result[row][col] = 'leaves'
                        result[row][col + 1] = 'leaves'
                        result[row][col + 2] = 'leaves'
                        maxTrees--
                    }
                    else if (result[row - 1][col] === 'leaves' && result[row][col] == 0) {
                        result[row][col] = 'leaves'
                        result[row][col + 1] = 'leaves'
                        result[row][col + 2] = 'leaves'
                    } else if (result[row][col] == 0) {
                        result[row][col] = 'sky'
                    }
                } else if (row < height * 0.7) {//lays down tree trunks in the middle the right position , using some logic.
                    if (result[row - 1][col + 1] === 'leaves' && result[row][col] == 0) {
                        result[row][col] = 'sky'
                        result[row][col + 1] = 'sky'
                        result[row][col + 2] = 'tree'
                    } else if (result[row - 1][col + 1] === 'tree' && result[row][col] == 0) {
                        result[row][col] = 'sky'
                        result[row][col + 1] = 'tree'
                        result[row][col + 2] = 'sky'
                    } else if (result[row][col] === 0) {
                        result[row][col] = 'sky'
                    }
                } else if (row < height * 1) { // lays a layer of grass and continues on from the next layer to lay materials randomly
                    let roll2 = Math.floor(Math.random() * 4) + 1
                    if (result[row - 1][col] === 'sky' && result[row][col] == 0) {
                        result[row].fill('grass')
                    } else if (result[row][col] == 0) {
                        switch (roll2) {
                            case 1:
                                result[row][col] = 'diamond'
                                break;
                            case 2:
                                result[row][col] = 'stone'
                                break;
                            case 3:
                                result[row][col] = 'coal'
                                break;
                            case 4:
                                result[row][col] = 'ruby'
                                break;

                            default:
                                break;
                        }

                    }
                }

            }
        }
    } else if (mode === 'sandbox') { // in sandbox mode generates an empy map according to users mapsize selection
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {

                result[row][col] = 'sky'
            }
        }
    }
    localStorage.setItem('map', JSON.stringify(result))
}