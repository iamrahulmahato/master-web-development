// alert("Welcome to Poki-Verse");
const loader = document.body.querySelector(".loader");
const forLoadingBody=document.body.querySelector(".forLoadingBody");

window.addEventListener("load", (e) => {
  setTimeout(()=>{
    loader.classList.add("removeLoader");
    forLoadingBody.classList.remove("forLoadingBody");
  }, 2000);
});


let bodyNode=document.querySelector("body");
let choose=document.querySelector("#choose");
let chooseText=document.querySelector("#chooseText");
let fight=document.querySelector("#fight");
let fightText=document.querySelector("#fightText");



let yourScore=document.querySelector("#yourScore");
let computerScore=document.querySelector("#computerScore");

let userchoice;
let randchoice;



function choice(){
  chooseText.innerText=`Your Pokemon ${userchoice}-type fought with ${randchoice}-type`;
}


function win(){
  fightText.innerText= "You Won!";
  fight.style.color="#25f505";
  fightText.style.color="#25f505";
  yourScore.innerText=Number(yourScore.innerText)+1;
  yourScore.style.color="#1e6133";
  computerScore.style.color="whitesmoke";
}
function lost(){
   fightText.innerText="You Lost!";
   fightText.style.color="red";
   fight.style.color="red";
  computerScore.innerText=Number(computerScore.innerText)+1;
  yourScore.style.color="whitesmoke";
  computerScore.style.color="maroon";
}
function draw(){
   fightText.innerText="its Draw!";
  fightText.style.color="white";
   fight.style.color="white";
  yourScore.style.color="#394e5c";
  computerScore.style.color="#394e5c";
}

bodyNode.style.backgroundImage = "url('pxfuelDark.jpg')";



let mod=document.querySelector("#mode");
let modText=document.querySelector("#modeText");
let anchorColors=document.querySelectorAll("a");
let wel=document.querySelector("#welcome");

let mode="dark";
 document.body.style.color="white";

mod.addEventListener("click",(e) =>{
  if (mode === "dark") {
    mode = "light";
    bodyNode.style.backgroundImage = "url('pxfuel.jpg')";
    document.body.style.color="black";
    modText.innerText="Dark Mode";
    
    anchorColors.forEach((a) => {
      a.style.color = "#01438a";
    });
  } else {
    mode = "dark";
    bodyNode.style.backgroundImage = "url('pxfuelDark.jpg')";
     document.body.style.color="white";
    modText.innerText="Light Mode";
    
    anchorColors.forEach((a) => {
      a.style.color = "#aef2f5";
    });
  }}
);

anchorColors.forEach((a) => {
  a.addEventListener("mousemove",(e)=>{
    a.style.fontSize="20px";
    a.style.transition="all 0.3s ease"
  });
  a.addEventListener("mouseleave",(e)=>{
    a.style.fontSize="16px";
  });
});







let ground=document.querySelector("#ground");
let fire=document.querySelector("#fire");
let grass=document.querySelector("#grass");
let water=document.querySelector("#water");
let flying=document.querySelector("#flying");

ground.addEventListener("click",(e) =>{
  userchoice="ground";
  console.log(`Your Choice ${userchoice}`);
  computerPlay();
  result(userchoice,randchoice);
})
fire.addEventListener("click",(e) =>{
  userchoice="fire";
  console.log(`Your Choice ${userchoice}`);
  computerPlay();
  result(userchoice,randchoice);
})
grass.addEventListener("click",(e) =>{
  userchoice="grass";
  console.log(`Your Choice ${userchoice}`);
  computerPlay();
  result(userchoice,randchoice);
})
water.addEventListener("click",(e) =>{
  userchoice="water";
  console.log(`Your Choice ${userchoice}`);
  randchoice=computerPlay();
  result(userchoice,randchoice);
})

flying.addEventListener("click",(e) =>{
  userchoice="flying";
  
  console.log(`Your Choice ${userchoice}`);
  randchoice=computerPlay();
  result(userchoice,randchoice);
})

let computerchoice = ["ground", "fire", "grass", "water", "flying"];

function computerPlay() {
 randchoice= computerchoice[Math.floor(Math.random()*computerchoice.length)];
console.log(`Computer Choice ${randchoice}`);
return randchoice;
}

function result(userchoice,randchoice){
if(userchoice===randchoice){
  console.log("It's a tie!");
  draw();
  choice();
}
else{
   if( (userchoice==="ground") &&(randchoice==="flying" ||randchoice==="fire")){
     console.log("You win!");
     win();
     choice();
   }
   else if( (userchoice==="ground") &&(randchoice==="grass" ||randchoice==="water")){
       console.log("You Lost!");
      lost();
     choice();
     }
     else if( (userchoice==="flying") &&(randchoice==="water" ||randchoice==="grass")){
        console.log("You win!");
        win();
       choice();
      }
     else if( (userchoice==="flying") &&(randchoice==="fire" ||randchoice==="ground")){
            console.log("You Lost!");
        lost();
       choice();
          }
  else if( (userchoice==="water") &&(randchoice==="fire" ||randchoice==="ground")){
    console.log("You win!");
     win();
    choice();
  } 
  else if( (userchoice==="water") &&(randchoice==="grass" ||randchoice==="flying")){
         console.log("You Lost!");
     lost();
    choice();
       }
  else if( (userchoice==="fire") &&(randchoice==="flying" ||randchoice==="grass")){
    console.log("You win!");
     win();
    choice();
  }
   else if( (userchoice==="fire") &&(randchoice==="water" ||randchoice==="ground")){
         console.log("You Lost!");
      lost();
     choice();
       }
  else if( (userchoice==="grass") &&(randchoice==="water" ||randchoice==="ground")){
    console.log("You win!");
     win();
    choice();
  }
     else if( (userchoice==="grass") &&(randchoice==="fire" ||randchoice==="flying")){
         console.log("You Lost!");
        lost();
       choice();
       }
  }
}




let aboutmeFrame = document.querySelector("#aboutmeFrame");
let scaledFrameNode = document.querySelector("#scaledFrame");
scaledFrameNode.classList.add("removeFrame");
let frame=0;
  
aboutmeFrame.addEventListener("click", (e) => {
  if (frame === 0){
    scaledFrameNode.classList.remove("removeFrame");
    frame=1;
  }
  else{
    scaledFrameNode.classList.add("removeFrame");
    frame=0;
  }
});


let anchorFontAwesome=document.querySelectorAll("a");

anchorFontAwesome.forEach((a) => {
  a.addEventListener("mouseenter",(e)=>{
    console.log("Mouse over anchor element:", a.textContent);
    a.style.display="inline";
    let icon = document.createElement("icon");
    icon.innerHTML = '  <i class="fas fa-up-right-from-square" style="display:inline"></i>';
    a.append(icon);
    icon.style.fontSize="16px";
    icon.style.transition="all 1s ease";
  });
  a.addEventListener("mouseleave",(e)=>{
    let icon = a.querySelector("icon");
    if (icon) {
      a.removeChild(icon);
    }
  });
});

















