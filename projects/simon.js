function onClick(event){
    $(event.target).css("opacity", "0.5");
    setTimeout(function () {
        $(event.target).css("opacity", "1");
    }, 100);
}

$("button").click(onClick);

function playColor(exp) {
    switch(exp){
        case "red":
            var red = new Audio("./red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("./blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("./green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("./yellow.mp3");
            yellow.play();
            break;
    }
}

var level = 0;
var compSeq = [];
var userSeq = [];
var colors = ["red", "green", "yellow", "blue"];

// COMPUTER SEQUENCE

function playSeq() {
    userSeq = [];
    function randomNum(){
        var num = Math.random();
        num = Math.floor(num * 4);
        return num;
    }
    var colorChosen = colors[randomNum()]; 
    compSeq.push(colorChosen);
    for (let i = 0; i < compSeq.length; i++){
        setTimeout(function () {
        playColor(compSeq[i]);
            $("#" + compSeq[i]).fadeOut(100).fadeIn(100);
        }, i*600);
    }
}


// // USER SEQUENCE


$(".box").click(function () {
    var userColor = $(this).attr("id");
    playColor(userColor);
    userSeq.push(userColor);
    checkSequence(userSeq.length - 1);
});

function checkSequence(currentItem) {
    if (compSeq[currentItem] === userSeq[currentItem]){
        if(userSeq.length === compSeq.length){
            setTimeout(function () {
                level ++;
                $(".levels").text("Level " + (level+1));
                $(".levels").addClass("count");
                playSeq();
            }, 1000);
        }
    }
    else{
        wrongPlay();
    }
}

function wrongPlay() {
    wrong = new Audio("./wrong.mp3");
    wrong.play();
    $("html, button").addClass("wrong");
    setTimeout(function (){
        $("html, button").removeClass("wrong");
    }, 100);
    $(".replay").text("Restart");
    if (level === 1 || level === 0){
        $(".levels").text("Cleared " + level + " level");
    } else{
        $(".levels").text("Cleared " + level + " levels");
    }
    
}

$(".replay").click(function(){
    userSeq = [];
    compSeq = [];
    level = 0;
    setTimeout(function (){
        playSeq();
        $(".levels").text("Level 1");
        $(".levels").addClass("count");
    }, 500);
});

$(".instruct").click(
    function (){
        var yes = $("li").hasClass("down");
        if (yes){
            $("li").removeClass("down");
            $("li").addClass("up");
        } else{
            $("li").addClass("down");
            $("li").removeClass("up");
        }
    }
);






