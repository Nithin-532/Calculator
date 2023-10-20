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
    return NaN;
  }
  return a / b;
}

function operate(first, operator, second) {
  first = Number(firstNumber);
  second = Number(secondNumber);
  console.log(firstNumber + " " + operator + " " + secondNumber);
  if (operator === '+') {
    return add(first, second);
  }
  if (operator === '-') {
    return subtract(first, second);
  }
  if (operator === 'x') {
    return multiply(first, second);
  }
  if (operator === '&divide') {
    return divide(first, second);
  }
}

function backSpace() {
  output.textContent = output.textContent.toString().slice(0, -1);
}


const output = document.querySelector('.display');

function reset() {
  output.textContent = '';
  resetScreen = false;
}

function addContent(number) {
  if (output.textContent === '0' || resetScreen) {
    reset();
  }
  output.textContent += number;
}

function clear() {
  output.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
}

function useDecimal() {
  if (resetScreen) reset();
  if (output.textContent === '') {
    output.textContent = '0';
  } if (output.textContent.includes('.')) return;
  output.textContent += '.';
}

function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = output.textContent;
  currentOperator = operator;
  resetScreen = true;
}

function evaluate() {
  if (currentOperator === null || resetScreen) return
  secondNumber = output.textContent;
  output.textContent = round(operate(firstNumber, currentOperator, secondNumber));
  currentOperator = null;
}

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function compute(e) {
  const value = e.target.textContent;
  if (value === 'AC') {
    clear();
  }
  else if (value >= '0' && value <= '9') {
    addContent(value);
  }
  else if (value === '+/-') {
    output.textContent = -1 * output.textContent;
  }
  else if (value === '.') {
    useDecimal();
  } else if (value === '=') {
    evaluate();
  }
  else {
    setOperation(value);
  }
}

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) addContent(e.key)
  if (e.key === '.') useDecimal()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') backSpace()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '&divide'
  if (keyboardOperator === '*') return 'x'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', compute);
})
