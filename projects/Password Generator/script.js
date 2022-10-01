const field = document.querySelector('#password');
const create = document.querySelector('#create');
const clear = document.querySelector('#clear');


const characters = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm!£$%&@#?';

function randomPassword(){
    let password = '';
    for (let i = 0; i < 10; i++){
        password += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return password
}

clear.addEventListener('click', ()=>{
    field.value = '';
})

create.addEventListener('click', ()=>{
    field.value = randomPassword();
})