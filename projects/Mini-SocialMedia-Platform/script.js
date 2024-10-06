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

document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const content = document.getElementById("post-content").value;

    if (content) {
        const post = {
            user: loggedInUser,
            content: content,
            likes: 0,
            comments: []
        };
        posts.push(post);
        document.getElementById("post-content").value = '';
        renderPosts();
    }
});

function renderPosts() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <strong>${post.user}</strong>
            <p>${post.content}</p>
            <button onclick="likePost(${index})">Like (${post.likes})</button>
            <div class="comment-section">
                <input type="text" id="comment-input-${index}" placeholder="Add a comment">
                <button onclick="addComment(${index})">Comment</button>
                <div id="comments-${index}"></div>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function likePost(index) {
    posts[index].likes++;
    renderPosts();
}

