const imageUrl = 'https://picsum.photos/200/300';

// Function to fetch and display the image
async function fetchImage() {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const imageElement = document.getElementById('random-image');
        imageElement.src = imageUrl; // Set the src attribute of the img element
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Call the function to fetch and display the image
fetchImage();