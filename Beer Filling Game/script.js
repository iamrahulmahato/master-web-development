var mugHeight;
var beerHeight;
var percentFilled;
var roundedPercent;
var game = Math.floor(Math.random() * 100 + 1);

function getHeights() {
    mugHeight = $("#mug").height();
    beerHeight = $("#beer").height();
    percentFilled = (beerHeight / mugHeight) * 100;
    roundedPercent = Math.round(percentFilled);
    $("#percent-filled").html("Percent Filled: " + roundedPercent + "%");
}

$("#handle").hover(
    function () {
        $("#beer").addClass("fill");
        $("#beer").css("animation-play-state", "running");
        $("#pour").addClass("pouring");
    },
    function () {
        getHeights();
        $("#beer").css("animation-play-state", "paused");
        $("#pour").removeClass("pouring");
        if (roundedPercent === 0) {
            // do nothing
        } else if (roundedPercent === game) {
            $("#result").html("Nailed it! Good job!");
        } else if (game - roundedPercent < 5 && game - roundedPercent > -5) {
            $("#result").html("Eh. Close enough.");
        } else {
            $("#result").html("You stink");
        }
    }
);

$("#mug").click(function () {
    $("#beer").removeClass("fill");
    getHeights();
    $("#result").html("");
    game = Math.floor(Math.random() * 100 + 1);
    $("#target").html(game);
});

$(document).ready(function () {
    $("#target").html(game);
});
