let score = 0;

document.getElementById('hitButton').addEventListener('click', function() {
    let runs = Math.floor(Math.random() * 7); // Random runs between 0-6
    score += runs;

    document.getElementById('score').textContent = score;

    let message = "";
    if (runs === 0) {
        message = "Out! You scored " + score + " runs.";
    } else {
        message = "You scored " + runs + " runs!";
    }
    document.getElementById('message').textContent = message;
});
