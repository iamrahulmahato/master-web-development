const field = document.querySelector('#password');
const create = document.querySelector('#create');
const copy = document.querySelector('#copy');
const passwordLength = document.querySelector('#passwordLength');
const lengthDisplay = document.querySelector('#lengthDisplay');
const lowercaseCheck = document.querySelector('#lowercase');
const uppercaseCheck = document.querySelector('#uppercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');

const uppercase = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const numbers = '1234567890';
const lowercase = 'qwertyuiopasdfghjklzxcvbnm';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

function randomPassword(length) {
    let characters = '';
    if (lowercaseCheck.checked) characters += lowercase;
    if (uppercaseCheck.checked) characters += uppercase;
    if (numbersCheck.checked) characters += numbers;
    if (symbolsCheck.checked) characters += symbols;

    if (characters === '') {
        alert('Please select at least one character type.');
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return shuffleString(password);
}

function generatePassword(length, options) {
    let characters = '';
    let password = '';
    
    if (options.lowercase) characters += lowercase;
    if (options.uppercase) characters += uppercase;
    if (options.numbers) characters += numbers;
    if (options.symbols) characters += symbols;

    if (characters === '') {
        throw new Error('Please select at least one character type.');
    }

    // Ensure at least one character from each selected type
    if (options.lowercase) password += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (options.uppercase) password += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (options.numbers) password += numbers[Math.floor(Math.random() * numbers.length)];
    if (options.symbols) password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return shuffleString(password);
}

function updatePasswordStrength(password) {
    const strengthMeter = document.querySelector('#strengthMeter');
    const strength = calculatePasswordStrength(password);
    
    strengthMeter.value = strength;
    strengthMeter.className = getStrengthClass(strength);
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
}

function getStrengthClass(strength) {
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

create.addEventListener('click', () => {
    const length = parseInt(passwordLength.value);
    const options = {
        lowercase: lowercaseCheck.checked,
        uppercase: uppercaseCheck.checked,
        numbers: numbersCheck.checked,
        symbols: symbolsCheck.checked
    };

    try {
        const password = generatePassword(length, options);
        field.value = password;
        updatePasswordStrength(password);
    } catch (error) {
        alert(error.message);
    }
});

field.addEventListener('input', () => {
    updatePasswordStrength(field.value);
});

copy.addEventListener('click', () => {
    if (field.value) {
        navigator.clipboard.writeText(field.value);
        alert('Password copied to clipboard!');
    }
});

function updateLengthDisplay() {
    lengthDisplay.textContent = passwordLength.value;
}

// Initialize length display
updateLengthDisplay();

// Initialize password strength meter
updatePasswordStrength(field.value);
