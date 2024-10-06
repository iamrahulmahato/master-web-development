let loggedInUser = null;
let posts = [];

document.getElementById("auth-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulated login; in a real app, you'd check against a database
    if (username && password) {
        loggedInUser = username;
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("feed").classList.remove("hidden");
        document.getElementById("post-content").focus();
    }
});

document.getElementById("toggle-text").addEventListener("click", function() {
    const authTitle = document.getElementById("auth-title");
    if (authTitle.innerText === "Login") {
        authTitle.innerText = "Register";
        document.getElementById("toggle-text").innerText = "Login";
        document.getElementById("auth-form").reset();
    } else {
        authTitle.innerText = "Login";
        document.getElementById("toggle-text").innerText = "Register";
        document.getElementById("auth-form").reset();
    }
});

