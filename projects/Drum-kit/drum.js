var len = document.querySelectorAll(".drum").length;

for(var i = 0; i < len; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var content = this.textContent;
        audio_change(content);
        buttonAnimation(content);

    });
}
document.addEventListener("keydown", function (event){
    audio_change(event.key);
    buttonAnimation(event.key);
})


function audio_change(exp){
    switch(exp){
        case "w":
            var tom1 = new Audio("./tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("./tom-2.mp3");
            tom2.play();
            break; 
        case "s":
            var tom3 = new Audio("./tom-3.mp3");
            tom3.play();
            break; 
        case "d":
            var tom4 = new Audio("./tom-4.mp3");
            tom4.play();
            break; 
        case "j":
            var snare = new Audio("./snare.mp3");
            snare.play();
            break;     
        case "k":
            var crash = new Audio("./crash.mp3");
            crash.play();
            break; 
        case "l":
            var bass = new Audio("./kick-bass.mp3");
            bass.play();
            break;  
        default:
            alert(exp + " is not available");
            break;
    }
}


function buttonAnimation (currentKey) {
    var select = "." + currentKey;
    document.querySelector(select).classList.add("pressed");
    setTimeout(function () {
        document.querySelector(select).classList.remove("pressed");
    }, 100);
}