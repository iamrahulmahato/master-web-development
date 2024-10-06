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

