const passwordField = document.querySelector('#password');
const createButton = document.querySelector('#create');
const clearButton = document.querySelector('#clear');
const copyButton = document.querySelector('#copy');
const lengthInput = document.querySelector('#password-length');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const symbols = '!@#$%^&*()_+[]{}<>?/';

String.prototype.shuffle = function () {
    const array = this.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

function generateRandomPassword(length) {
    let password = '';
    const allCharacters = uppercase + lowercase + numbers + symbols;

    for (let i = 0; i < length; i++) {
        const randomChar = allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        password += randomChar;
    }

    return password.shuffle();
}

createButton.addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    if (length < 1 || length > 50) {
        alert('Password length must be between 8 and 50 characters');
    } else {
        passwordField.value = generateRandomPassword(length);
    }
});

clearButton.addEventListener('click', () => {
    passwordField.value = '';
    lengthInput.value = 12;
});

copyButton.addEventListener('click', () => {
    if (passwordField.value) {
        navigator.clipboard.writeText(passwordField.value).then(() => {
            alert('Password copied to clipboard');
        }).catch(err => {
            alert('Failed to copy password');
        });
    } else {
        alert('No password to copy!');
    }
});
