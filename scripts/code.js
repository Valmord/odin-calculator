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
  if (b === 0) {
    return "ERR - Cannot Divide by Zero";
  }
return a / b;
}

function mod(a,b){
  return a % b;
}

function exp(a,b){
  return a ** b;
}

function operate(a, b, operator){
  let sum = 0;
  switch(operator) {
    case '+':
      sum = add(a,b);
      break;
    case '-':
      sum = sub(a,b);
      break;
    case '*':
      sum = mul(a,b);
      break;
    case '/':
      sum = div(a,b);
      break;
    case '%':
      sum = mod(a,b);
      break;
    case '^':
      sum = exp(a,b);
      break;
    default:
      sum = 'ERR';
  }
  return(sum);
}

const firstOpDisplay = document.querySelector('.display-operand1')
const operatorDisplay = document.querySelector('.display-operator');
const secondOpDisplay = document.querySelector('.display-operand2');
function updateDisplays(buttonId){
  const firstOp = parseFloat(firstOpDisplay.textContent);
  const secondOp = parseFloat(secondOpDisplay.textContent);
  const operator = operatorDisplay.textContent;
  if (secondOpDisplay.textContent.slice(0,3) === 'ERR') return;
  if (!isNaN(buttonId)) {
    secondOpDisplay.textContent += buttonId;
    return;
  }
  if (buttonId === '.') {
    if (secondOpDisplay.textContent.includes('.')) return;
    secondOpDisplay.textContent += buttonId;
    return;
  }

  if (buttonId === '=') {
    if (firstOp && secondOp) {
      clearDisplays();
      secondOpDisplay.textContent = operate(firstOp, secondOp, operator);
    }
    return;
    } else if (firstOpDisplay.textContent && secondOpDisplay.textContent) {
    firstOpDisplay.textContent = operate(firstOp, secondOp, operator)
  } else if (!secondOp) {
  } else {
    firstOpDisplay.textContent = secondOp;
  }
  secondOpDisplay.textContent = '';
  operatorDisplay.textContent = buttonId;
};

function clearDisplays(){
  firstOpDisplay.textContent = '';
  operatorDisplay.textContent = '';
  secondOpDisplay.textContent = '';
}

const buttons = document.querySelectorAll('.buttons');
buttons.forEach( button => {
  if (button.id === 'clr') {
    button.onclick = clearDisplays;
  } else {
    button.addEventListener( 'click', () => {
      updateDisplays(button.id);
    })
  }
});