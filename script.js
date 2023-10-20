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

function operate(firstNumber, operator, secondNumber) {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);
  console.log(firstNumber + " " + operator + " " + secondNumber);
  if (operator === '+') {
    return add(firstNumber, secondNumber);
  }
  if (operator === '-') {
    return subtract(firstNumber, secondNumber);
  }
  if (operator === 'x') {
    return multiply(firstNumber, secondNumber);
  }
  if (operator === '&divide') {
    return divide(firstNumber, secondNumber);
  }
}

let firstNumber;
let operator = '';
let secondNumber;


const $input = document.querySelector(".display");
const BIRTHNUMBER_ALLOWED_CHARS_REGEXP = /[\d+\-/*%]+/;
$input.addEventListener("keydown", event => {
  if (!BIRTHNUMBER_ALLOWED_CHARS_REGEXP.test(event.key)) {
    event.preventDefault();
  }
});

// const clear = document.querySelector('.clear');
// clear.addEventListener('click' , function() {
//   $input.value = 0;
// })

// const sign = document.querySelector('.posorneg');
// sign.onclick = () => {
//   $input.value = -1 * $input.value;
//   console.log($input.value);
// } 

// const numbers = document.querySelectorAll('.number');
// numbers.forEach(number => {
//   number.addEventListener('click', ((e) => {
//     $input.value = $input.value + e.target.textContent;
//   }))
// })

// const compute = document.querySelectorAll('.compute');
// compute.forEach(operation => {
//   operation.addEventListener('click', ((e) => {
//     if (operator == '') {
//       firstNumber = $input.value;
//       operator = e.target.textContent;
//     } else {
//       if (isFinite($input.value)) {
//         $input.value = operate($input.value, e.target.textContent, $input.value);
//       } else {
//         $input.value = NaN;
//       }
//     }
//   }))
// });

// const equal = document.querySelector('.equal');
// equal.addEventListener('click', (e) => {
//   console.log(e.target);
//   let result = operate(firstNumber, operator, $input.value);
//   console.log(result);
//   $input.value = result;
// })

function compute(e) {
  const value = e.target.textContent;
  console.log(value);
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', compute);
})
