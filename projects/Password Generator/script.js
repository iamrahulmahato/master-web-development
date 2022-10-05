const field = document.querySelector('#password');
const create = document.querySelector('#create');
const clear = document.querySelector('#clear');


const uppercase = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const numbers = '1234567890';
const lowercase = 'qwertyuiopasdfghjklzxcvbnm';
const symbols = '!£$%&@#?';

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function randomPassword(){
    let password = '';
    for (let i = 0; i < 3; i++){
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
    }
    for (let i = 0; i < 3; i++){
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
    }
    for (let i = 0; i < 2; i++){
        password += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    for (let i = 0; i < 2; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    return password.shuffle();
}

clear.addEventListener('click', ()=>{
    field.value = '';
})

create.addEventListener('click', ()=>{
    field.value = randomPassword();
})