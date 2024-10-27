window.onload = function() {
    let button = document.getElementById("calculate");
    button.addEventListener("click", calculateLove)
}

function calculateLove() {
    let yourName = document.getElementById("fname").value;
    let crushName = document.getElementById("cname").value;
    let spinner = document.getElementById("loading-spinner");
    let result = document.getElementById("result");

    if (yourName !== "" && crushName !== "") {
        spinner.style.display = "block"; // Show loading spinner
        result.style.display = "none"; // Hide result

        setTimeout(() => {
            spinner.style.display = "none"; // Hide loading spinner
            let percentage = Math.floor(Math.random() * 101);
            document.getElementById("result-message").innerText = `${yourName} and ${crushName}'s chance of love: `;
            document.getElementById("result-percentage").innerText = `${percentage}%`;
            result.style.display = "block"; // Show result
        }, 2000); // Delay for 2 seconds to simulate loading
    }
}
