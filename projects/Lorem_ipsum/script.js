const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."; // Example text

document.getElementById('generate').addEventListener('click', () => {
    const lines = parseInt(document.getElementById('lines').value);
    const outputDiv = document.getElementById('output');
    
    if (isNaN(lines) || lines <= 0) {
        showToast('Invalid number of lines. Please enter a valid number.');
        return; // Exit if invalid input
    }

    outputDiv.innerText = generateLoremIpsum(lines);
    showToast('Lorem Ipsum Generated!');
});

document.getElementById('copy').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    
    if (outputDiv.innerText.trim() === "") {
        showToast('Nothing to copy! Generate some text first.');
        return; // Exit if there's no text to copy
    }

    navigator.clipboard.writeText(outputDiv.innerText)
        .then(() => {
            showToast('Copied to clipboard!');
        })
        .catch(err => console.error('Error copying text: ', err));
});

function generateLoremIpsum(numLines) {
    let result = "";
    for (let i = 0; i < numLines; i++) {
        result += loremIpsumText + "\n";
    }
    return result.trim(); // Remove trailing newline
}

// Function to show toast notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000); // Display for 3 seconds
}
