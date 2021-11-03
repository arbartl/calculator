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
    if (num2 == 0) {
        alert("Can't divide by Zero");
        num1 = null;
        num2 = null;
        subTotal = null;
        displayVariable = '';
        displayHistory = '';
        operatorLastPressed = null;
        updateDisplay();
        return null;
    } else {
        total = num1 / num2;
        return total;
    }
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
        return Math.round(add(num1, num2) * 100) / 100;
    } else if (operator == '-') {
        return Math.round(subtract(num1, num2) * 100) / 100;
    } else if (operator == '*') {
        return Math.round(multiply(num1, num2) * 100) / 100;
    } else if (operator == '/') {
        return Math.round(divide(num1, num2) * 100) / 100;
    } else if (operator == '^') {
        return Math.round(exponent(num1, num2) * 100) / 100;
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
        if (displayBuffer == null) {
            clearAll();
        }
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
        decButton.disabled = false;
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
        num1 = parseFloat(displayVariable);
        displayBuffer = [];
        displayHistory = displayVariable += operator;
    } else if (num2 == null && displayBuffer) {
        displayHistory = num1 + operator + displayBuffer.join('');
        num1 = operate(num1, operatorLastPressed, parseFloat(displayVariable));
        displayVariable = num1 + operator;
        displayBuffer = [];
    } else if (num2 == null && !displayBuffer) {
        displayHistory = num1 + operator;
        displayVariable = num1 + operator;
        displayBuffer = [];        
    }
    updateDisplay();
}

// Add functionality to Clear and Clear Entry buttons

const clearButton = document.querySelector('#btn-clr');

clearButton.addEventListener('click', function(e) {
    clearAll();
    decButton.disabled = false;
});

function clearAll() {
    num1 = null;
    num2 = null;
    subTotal = null;
    displayVariable = '';
    displayHistory = '';
    displayBuffer = [];
    operatorLastPressed = null;
    updateDisplay();
}

const clearEntryButton = document.querySelector('#btn-ce');

clearEntryButton.addEventListener('click', function(e) {
    clearDisplay();
    decButton.disabled = false;
});

// Add functionality to Negate button

const negateButton = document.querySelector('#btn-neg');

negateButton.addEventListener('click', function(e) {
    let negative = (parseFloat(displayBuffer.join('')) * -1);
    displayBuffer = [];
    displayBuffer.push(negative);
    displayVariable = displayBuffer.join('');
    updateDisplay();
});

// Add functionality to Evaluate button

const evalButton = document.querySelector('#btn-eva');

evalButton.addEventListener('click', function() {
    displayHistory = num1 + operatorLastPressed + displayBuffer.join('');
    num1 = operate(num1, operatorLastPressed, parseFloat(displayVariable));
    displayBuffer = null;
    displayVariable = num1;
    decButton.disabled = false;
    updateDisplay();
});

// Disable buttons that cause errors when entered incorrectly

const decButton = document.querySelector('#btn-dec');

decButton.addEventListener('click', function() {
    decButton.disabled = true;
});