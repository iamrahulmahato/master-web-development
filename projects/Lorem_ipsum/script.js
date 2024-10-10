const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."; // Example text

document.getElementById('generate').addEventListener('click', () => {
    const lines = parseInt(document.getElementById('lines').value);
    const outputDiv = document.getElementById('output');
    outputDiv.innerText = generateLoremIpsum(lines);
});

document.getElementById('copy').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    navigator.clipboard.writeText(outputDiv.innerText)
        .then(() => alert('Copied to clipboard!'))
        .catch(err => console.error('Error copying text: ', err));
});

function generateLoremIpsum(numLines) {
    let result = "";
    for (let i = 0; i < numLines; i++) {
        result += loremIpsumText + "\n"; // Adjust to create multiple lines
    }
    return result.trim(); // Remove trailing newline
}
