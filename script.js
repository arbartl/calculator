function add(num1, num2) {
    total = num1 + num2;
    return total;
}

function subtract(num1, num2) {
    total = num1 - num2;
    return total;
}

function multiply(num1, num2) {
    total = num1 * num2;
    return total;
}

function divide(num1, num2) {
    total = num1 / num2;
    return total;
}

function exponent(num1, num2) {
    total = Math.pow(num1, num2);
    return total;
}

function operate(num1, operator, num2) {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2);
    } else if (operator == '^') {
        return exponent(num1, num2);
    }
}

let displayVariable = '';
let displayHistory = '';

let operator = '';
let num1 = 0;
let num2 = 0;
let subTotal = 0;

const displayText = document.querySelector("#display-text");
const displayHistoryText = document.querySelector('#display-history');

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
        let buttonId = e.target.getAttribute('id');
        if (buttonId === 'btn-clr') {
            displayText.textContent = 0;
            displayHistoryText.textContent = 0;
            num1 = 0;
            num2 = 0;
        } else if (buttonId === 'btn-add') {
            num1 = parseFloat(displayVariable);
            operator = '+';
            clearDisplay();
        } else if (buttonId === 'btn-sub') {
            num1 = parseFloat(displayVariable);
            operator = '-';
            clearDisplay();
        } else if (buttonId === 'btn-mul') {
            num1 = parseFloat(displayVariable);
            operator = '*';
            clearDisplay();
        } else if (buttonId === 'btn-div') {
            num1 = parseFloat(displayVariable);
            operator = '/';
            clearDisplay();
        } else if (buttonId === 'btn-exp') {
            num1 = parseFloat(displayVariable);
            operator = '^';
            clearDisplay();
        } else if (buttonId === 'btn-eva') {
            num2 = parseFloat(displayVariable);
            subTotal = operate(num1, operator, num2).toFixed(3);
            displayVariable = subTotal;
            num1 = subTotal;
            num2 = 0;
        } else {
            displayVariable += e.target.textContent;            
        }
        updateDisplay();
    });
});

function updateDisplay() {
    displayText.textContent = displayVariable;
}

function clearDisplay() {
    displayVariable = '';
    updateDisplay();
}