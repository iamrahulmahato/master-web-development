let loggedInUser = null;
let posts = [];

document.getElementById("auth-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

