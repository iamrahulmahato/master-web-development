document.getElementById("postButton").addEventListener("click", function() {
    const input = document.getElementById("postInput");
    const postText = input.value.trim();

    if (postText) {
        const postsContainer = document.getElementById("postsContainer");
        
        // Create a new post element
        const post = document.createElement("div");
        post.className = "post";
        post.innerText = postText;

        // Append the new post to the container
        postsContainer.prepend(post);

        // Clear the input field
        input.value = '';
    }
});
