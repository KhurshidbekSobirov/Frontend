const pwd = document.getElementById('pwd');
const copy = document.getElementById('copy');
const len = document.getElementById('len');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const number = document.getElementById('number');
const symbol = document.getElementById('symbol');
const generate = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=';

function getUpperCase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowerCase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbols() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {

    if (len.value === '') {
        pwd.innerHTML = 'Password Length equal to 0';
        return;
    }

    if (upper.checked !== true &&
        lower.checked !== true &&
        number.checked !== true && 
        symbol.checked !== true) {
            pwd.innerHTML = 'Select your type password';
            return;
    } else {

    let password = '';

    const lenEl = len.value; 

    for (let i = 0; i < lenEl; i++) {
        const x = generateX();

        password += x;
    } 

    pwd.innerHTML = password;

    }
}


function generateX() {
    let xf = [];

    if (upper.checked) {
        xf.push(getUpperCase());
    }

    if (lower.checked) {
        xf.push(getLowerCase());
    }

    if (number.checked) {
        xf.push(getNumbers());
    }

    if (symbol.checked) {
        xf.push(getSymbols());
    }

    return xf[Math.floor(Math.random() * xf.length)];
}


generate.addEventListener('click', generatePassword)