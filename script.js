let operator = '';
let num1 = null;
let num2 = null;
let subTotal = 0;

//Operator Functions
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

function negate(num1) {
    return num1 * (-1);
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

// MouseOver background color change functions
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener('mouseover', function(e) {
        if (e.target.getAttribute('id') === 'btn-clr' ||
            e.target.getAttribute('id') === 'btn-ce') {
            e.target.style.backgroundColor = '#520000';
        } else {
            e.target.style.backgroundColor = 'grey';
        }
    });
});

buttons.forEach((button) => {
    button.addEventListener('mouseout', function(e) {
        if (e.target.getAttribute('id') === 'btn-clr' ||
            e.target.getAttribute('id') === 'btn-ce') {
            e.target.style.backgroundColor = 'maroon';
        } else {
            e.target.style.backgroundColor = 'darkgrey';
        }
    });
});

// Update screen display
let displayVariable = '';
let displayHistory = '';
let displayBuffer = [];

const displayText = document.querySelector("#display-text");
const displayHistoryText = document.querySelector('#display-history');

function updateDisplay() {
    displayText.textContent = displayVariable;
    displayHistoryText.textContent = displayHistory;
}

function clearDisplay() {
    displayBuffer = [];
    displayVariable = '';
    updateDisplay();
}

// Add listener to number buttons

const numberPad = document.querySelector('#buttons');
const numberButtons = numberPad.querySelectorAll('.number-button');

numberButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        displayBuffer.push(e.target.textContent);
        displayVariable = displayBuffer.join('');
        updateDisplay();
    });
});

// Add listener to operator buttons
let operatorLastPressed = null;

const operatorButtons = numberPad.querySelectorAll('.operator-button');

operatorButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        if (e.target.getAttribute('id') === 'btn-add') {
            processClick('+');
            operatorLastPressed = '+';            
        } else if (e.target.getAttribute('id') === 'btn-sub') {
            processClick('-');
            operatorLastPressed = '-';  
        } else if (e.target.getAttribute('id') === 'btn-mul') {
            processClick('*');
            operatorLastPressed = '*';
        } else if (e.target.getAttribute('id') === 'btn-div') {
            processClick('/');
            operatorLastPressed = '/';
        } else if (e.target.getAttribute('id') === 'btn-exp') {
            processClick('^');
            operatorLastPressed = '^';
        }
    });
});

function processClick(operator) {
    if (num1 == null && displayBuffer) {
        num1 = parseFloat(displayBuffer.join(''));
        displayVariable = displayBuffer.join('') + operator;
        displayHistory = displayVariable;
        displayBuffer = [];
    } else if (num1 && !num2 && displayBuffer) {
        displayHistory += displayVariable + operator;
        num2 = parseFloat(displayBuffer.join(''));
        subTotal = operate(num1, operatorLastPressed, num2);
        displayVariable = subTotal + operator;
        displayBuffer = [];
    } else if (num1 && num2) {
        displayHistory += displayVariable + operator;
        num1 = subTotal;
        num2 = parseFloat(displayBuffer.join(''));
        subTotal = operate(num1, operatorLastPressed, num2);
        displayVariable = subTotal + operator;
        displayBuffer = [];
    }
    updateDisplay();
}
