// Fetch the canvas element and get its 2D rendering context
const canvas = document.getElementById("gameCanvas");
const input = document.querySelector("input");
const ctx = canvas.getContext("2d");
let gameState = "notStarted";
let gun;
let monster;
let animationFrame = null;
let monsterSpeed = 3;
let bullets = [];
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let lives = 7;

let gunImg = new Image();
gunImg.src = "./assets/gunimage.png";

let bulletImg = new Image();
bulletImg.src = "./assets/bulletImage.png";

let monsterImg = new Image();
monsterImg.src = "./assets/monsterimage.png";

let bulletListner;

function startGame() {
  gameState = "ongoing";
  document.getElementById("gameCanvas").style.background = "white";
  document.getElementById("startGameBtn").disabled = true;
  document.getElementById("currentLives").textContent = `❤️= ${lives}`;
  document.getElementById("currentScore").textContent = `Score: ${score}`;

  monster = new component(monsterImg, generateXPos(), 50, 40, 40, "monster");
  gun = new component(gunImg, 400, 500, 35, 35, "player");

  var lastMove = 0;
  bulletListner = document.addEventListener("keydown", function (event) {
    if(Date.now() - lastMove > 200) {
      genreateBullet(event);
      lastMove = Date.now();
    }
  });
    
  updateGameArea();
}

document.getElementById("highestScore").textContent = `High Score: ${highScore}`;

document.addEventListener("keydown", function (event) {
  //console.log(event.keyCode);
  if (event.keyCode == 65 || event.keyCode == 37) {
    gun.speedX -= gun.speedX < -2 ? 0 : 2;
    //console.log(gun.speedX);
  }
  if (event.keyCode == 68 || event.keyCode == 39) {
    gun.speedX += gun.speedX > 2 ? 0 : 2;
    //console.log(gun.speedX);
  }
  if (event.keyCode == 32) { //spacebar
    event.preventDefault(); // Prevent default (reload)
  }
});

document.addEventListener("keyup", function (event) {
  //console.log(event.keyCode);
  if (event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 37 || event.keyCode == 39) {
    gun.speedX = 0;
  }
});

function component(src, x, y, width, height, type) {
  this.width = width;
  this.height = height;
  type == "monster" ? (this.speedX = monsterSpeed) : (this.speedX = 0);
  type == "bullet" ? (this.speedY = -5) : this.speedY = 0;
  this.x = x;
  this.y = y;

  this.update = function () {
    ctx.drawImage(src, this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    if (
      type === "monster" &&
      (this.x === canvas.width - this.width || this.x === 0)
    ) {
      this.speedX = -this.speedX;
    }
    this.x += this.speedX;
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    this.y += this.speedY;
    //this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
  };
  this.crashWith = function(otherobj) {
    var mleft = this.x;
    var mright = this.x + (this.width);
    var mtop = this.y;
    var mbottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);

    var crash = true;
    if ((mbottom < othertop) || (mtop > otherbottom) || (mright < otherleft) || (mleft > otherright)) {
        crash = false;
    }
    
    return crash;
  }
}

function updateGameArea() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gun.newPos();
  gun.update();
  monster.newPos();
  monster.update();

  for (let i=0; i<bullets.length; i++) {
    bullets[i].newPos();
    bullets[i].update();

    if (monster.crashWith(bullets[i])) {
      // console.log("collision occured");
      // console.log(`Monster -> Left: ${monster.x}, Right: ${monster.x + monster.width}, Top: ${monster.y}, Bottom: ${monster.y + monster.height}`);
      // console.log(`Bullet -> Left: ${bullets[i].x}, Right: ${bullets[i].x + bullets[i].width}, Top: ${bullets[i].y}, Bottom: ${bullets[i].y + bullets[i].height}`);
      // Handle the bullet-monster collision
      bullets.splice(i, 1); // Remove the bullet from the array
      i--; // Adjust the index after removing the bullet
      // Move monster to a new random position
      monster.x = generateXPos();
      score++;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
      document.getElementById("currentScore").textContent = `Score: ${score}`;
      document.getElementById("highestScore").textContent = `High Score: ${highScore}`;
    } else if (bullets[i].y <= 0) {
      bullets.splice(i,1);
      i--;
      lives--;
      document.getElementById("currentLives").textContent = `❤️= ${lives}`;
      if (lives <= 0 ) {
        stopGame();
      }
    }
  }

  animationFrame = requestAnimationFrame(updateGameArea); 
}

function stopGame() {
  gameState = "ended";
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  document.getElementById("startGameBtn").disabled = false;
  document.getElementById("gameCanvas").style.background = "red";
  alert(`GamOver, Score = ${score}`);
  
  monster = null;
  gun = null;
  score = 0;
  lives = 7;
  bullets = [];
  console.log(bullets);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.removeEventListener("keydown");
  document.removeEventListener("keydown", bulletListner);
  
  window.location.reload();
}

function generateXPos() {
  return Math.floor(Math.random() * 790);
}

function genreateBullet(event) {
  if (event.keyCode == 32) { //spacebar
    event.preventDefault(); // Prevent default (reload)
    let bullet = new component(bulletImg, gun.x+10, gun.y-20, 6, 20, "bullet");
    bullets.push(bullet);
  } 
}

function setDifficulty(s) {
  if (s == "easy") {
    monsterSpeed = 3.2;
    if (monster) monster.speedX = 3.2;
  } else if (s == "medium") {
    monsterSpeed = 5;
    if (monster) monster.speedX = 5.7;
  } else if (s == "hard") {
    monsterSpeed = 7;
    if (monster) monster.speedX = 8;
  } else {
    monsterSpeed = 3.2;
  }
  //alert(`Difficulty Set to ${s}`);
}