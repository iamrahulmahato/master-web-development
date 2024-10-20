const getColor = () => {
    const randomNo = Math.floor(Math.random() * 16777215);
    const randomCode = "#" + randomNo.toString(16).padStart(6, '0');
    
    // Update background color and text
    document.body.style.backgroundColor = randomCode;
    document.getElementById("color-code").innerText = randomCode;

    // Copy to clipboard and show copy notification
    navigator.clipboard.writeText(randomCode).then(() => {
        const copyMessage = document.getElementById("copy-message");
        copyMessage.classList.remove("hidden");

        // Hide the message after 2 seconds
        setTimeout(() => {
            copyMessage.classList.add("hidden");
        }, 2000);
    }).catch(err => console.log('Error copying to clipboard: ', err));
}

// Add event listener to button
document.querySelector(".btn").addEventListener("click", getColor);

// Initialize with a random color on page load
getColor();
