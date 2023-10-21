let firstNumber = '';
let currentOperator = null;
let secondNumber = '';
let resetScreen = false;

window.addEventListener('keydown', keyboardInput);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    alert("Hey check the divison(not divided by zero)")
    return NaN;
  }
  return a / b;
}

function doOperation(firstNumber, currentOperator, secondNumber) {
  let first = Number(firstNumber);
  let second = Number(secondNumber);
  if (currentOperator === '+') {
    return add(first, second);
  }
  else if (currentOperator === '-') {
    return subtract(first, second);
  }
  else if (currentOperator === 'x') {
    return multiply(first, second);
  } else {
    return divide(first, second);
  }
}

const output = document.querySelector('.display');

function reset() {
  output.value = '';
  resetScreen = false;
}

function addContent(text) {
  if (resetScreen) reset();
  if (output.value.length >= 8) {
    alert("Can't handle more than 8 values");
    return;
  }
  output.value += text;
}

function clear() {
  output.value = '';
  firstNumber = '';
  currentOperator = null;
  secondNumber = '';
  resetScreen = false;
}

function addDecimal() {
  if (output.value >= 8) {
    alert("Please try another way as the maximum number length is 8");
    return;
  }
  if (output.value.includes('.')) {
    alert("Not possible");
    return;
  }
  output.value += '.';
}

function addOperator(value) {
  if (currentOperator !== null) {
    evaluate();
  }
  firstNumber = output.value;
  currentOperator = value;
  resetScreen = true;
}

function evaluate() {
  if (firstNumber === '' || currentOperator === null) {
    return;
  }
  secondNumber = output.value || firstNumber;
  let result = round(doOperation(firstNumber, currentOperator, secondNumber));
  result = result.toString();
  if (result.length >= 8) {
    let start = result[0];
    let size = result.length - 1;
    let nextNumber = result.slice(1, 5);
    result = `${start}.${nextNumber}e${size}`;
  }
  output.value = result;
  resetScreen = true;
  currentOperator = null;
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function compute(e) {
  let value = e.target.textContent;
  if (value >= '0' && value <= '9') addContent(value);
  else if (value === 'AC') clear();
  else if (value === '+/-') output.value = -1 * output.value;
  else if (value === '.') addDecimal();
  else if (value === '=') evaluate();
  else {
    addOperator(value);
  }
}

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) addContent(e.key);
  else if (e.key === '=' || e.key === 'Enter') evaluate();
  else if (e.key === '.') addDecimal();
  else if (e.key === 'Escape') clear();
  else if (isOperator(e.key)) {
    addOperator(e.key);
  }
  e.preventDefault();
  e.stopPropagation();
}

function isOperator(value) {
  if (value === '+') return '+';
  else if (value === '-') return '-';
  else if (value === '*') return 'x';
  else if (value === '/') return '&divide';
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', compute);
})
