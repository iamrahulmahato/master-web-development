let board = document.getElementById('board');
let scoreEl = document.getElementById('score');
// object
let inputDirection = {x:0,y:0};
let snakeArray = [
   {x:13,y:15}
];

let score=0;

// Food is not array because food is only one particle
let food = {x:6,y:7}

function main(){
    // console.log('Game Engine Called');
    gameEngine();
}

function isCollide(snake){
    
    // if snake bumps into itself
    for(let i = 1; i < snakeArray.length;i++){
        
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }
    }
    
    // if collide into wall
    if(snake[0].x >= 18 || snake[0].y >= 18 || snake[0].x <= 0 || snake[0].y <= 0){
        return true;
    }

    return false;
}

function gameEngine(){

    // Updating Snake array which has location of snake body parts
    // If snake collides with wall then game over
       if(isCollide(snakeArray)){
            inputDirection = {x:0,y:0};
            alert("Game Over ! Press OK to play again");
            //  After OK Game starts again when we press a key
            snakeArray = [
                {x:13,y:15}
            ];
            score = 0;
        scoreEl.innerHTML = "SCORE : " + score;
        }


    // If food Eaten increment score and Regenarate food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        score+=10;
        scoreEl.innerHTML = "SCORE : " + score;
        // unshift adds element in the starting of the array
        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x , y: snakeArray[0].y + inputDirection.y});
        let a =2 , b =16;
        food = {x :Math.round(a+(b-a)*Math.random()) , y :Math.round(a+(b-a)*Math.random())};

    }

        // Moving the snake
        for (let i = snakeArray.length - 2; i>=0; i--) { 
            // we use destructuring so new object is created 
            //we start from the second last array element and keep moving each array element one step ahead
            snakeArray[i+1] = {...snakeArray[i]};
        }
        // For the zeroth array element we move it like this
        snakeArray[0].x += inputDirection.x;
        snakeArray[0].y += inputDirection.y;
    

    // Then render the snake and food(display)
    // We want the board to be empty initially
    board.innerHTML= '';
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        // Add style to the div element we have created
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.innerHTML = '0'
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
 
    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x
    foodElement.innerHTML = '*'
    foodElement.classList.add('food');
    board.appendChild(foodElement);

   
}

// If any key is clicked ,start the game
window.addEventListener("keydown",e =>{
            inputDirection = {x:0,y:1};//start game

            // Which key pressed
            switch(e.key){

                case 'w' :
                inputDirection.x = 0;
                inputDirection.y = -1;
                console.log('Up Key');
                break;

                case 's' :
                inputDirection.x = 0;
                inputDirection.y = 1;
                console.log('Down Key');
                break;
                
                case 'a' :
                inputDirection.x = -1;
                inputDirection.y = 0;
                console.log('Left Key');
                break;

                case 'd' :
                inputDirection.x = 1;
                inputDirection.y = 0;
                console.log('Right Key');
                break;

                default:break;
            }

        });


setInterval(main,200);

 