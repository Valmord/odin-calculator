// Calculator Functions

function add(a, b){
  return a + b;
}

function sub(a,b){
  return a - b
}

function mul(a,b){
  return a * b;
}

function div(a,b){
return a / b;
}

function mod(a,b){
  return a % b;
}

function exp(a,b){
  return a ** b;
}

function operate(a,operator,b){
  switch(operator) {
    case '+':
      return add(a,b);
      break;
    case '-':
      return sub(a,b);
      break;
    case '*':
      return mul(a,b);
      break;
    case '/':
      return div(a,b);
      break;
    case '%':
      return mod(a,b);
      break;
    case '^':
      return exp(a,b);
      break;
    default:
      return 'ERR';
  }
}

// ----
let num1;
let num2;
let operator;

const buttons = document.querySelectorAll('.buttons');
const display = document.querySelector('.display');
buttons.forEach( button => {
  if (button.id === "clear" || button.id === "=") {

  } else {
    button.addEventListener( 'click', () => {
      display.textContent += button.id;
    })
  }
});