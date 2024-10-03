const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

document.getElementById('generate').addEventListener('click', () => {
    const lines = parseInt(document.getElementById('lines').value);
    const output = document.getElementById('output');
    const copyButton = document.getElementById('copy');
    
    if (isNaN(lines) || lines < 1) {
        output.innerHTML = "Please enter a valid number of lines.";
        copyButton.disabled = true; // Disable copy button if input is invalid
        return;
    }
    
    output.innerHTML = generateLorem(lines);
    copyButton.disabled = false;
});

document.getElementById('copy').addEventListener('click', () => {
    const output = document.getElementById('output');
    const textToCopy = output.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Text copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

function generateLorem(lineCount) {
    let result = '';
    const paragraphs = lorem.split('. ');
    for (let i = 0; i < lineCount; i++) {
        result += paragraphs[i % paragraphs.length] + '.\n';
    }
    return result;
}
