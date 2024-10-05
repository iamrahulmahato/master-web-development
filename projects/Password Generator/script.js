const field = document.querySelector('#password');
const create = document.querySelector('#create');
const clear = document.querySelector('#clear');
const copy = document.querySelector('#copy');
const passwordLength = document.querySelector('#passwordLength');
const lengthDisplay = document.querySelector('#lengthDisplay');

const uppercase = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const numbers = '1234567890';
const lowercase = 'qwertyuiopasdfghjklzxcvbnm';
const symbols = '!£$%&@#?';

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function randomPassword(length) {
    let characters = uppercase + lowercase + numbers + symbols;
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return password.shuffle();
}

clear.addEventListener('click', () => {
    field.value = '';
})

create.addEventListener('click', () => {
    const length = parseInt(passwordLength.value);
    field.value = randomPassword(length);
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(field.value);  
})

function updateLengthDisplay() {
    lengthDisplay.textContent = passwordLength.value;
}
