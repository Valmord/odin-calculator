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

function operate(a, b, operator){
  // equationString
  // let [a, b, operator] = getOpsFromString(equationString);
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

function getOpsFromString(equationString){
  const eqArr = equationString.match(/([-+])?([0-9]+)([+-/*%])([0-9]+)/);
  let op1 = eqArr[1] ? parseFloat(eqArr[1] + eqArr[2]) : parseFloat(eqArr[2]); // Allow for Negatives
  let op2 = parseFloat(eqArr[4]);
  let operator = eqArr[3];  
  return [op1, op2, operator];
}

const firstOpDisplay = document.querySelector('.display-operand1')
const operatorDisplay = document.querySelector('.display-operator');
const secondOpDisplay = document.querySelector('.display-operand2');
function updateDisplays(buttonId){
  const firstOp = parseFloat(firstOpDisplay.textContent);
  const secondOp = parseFloat(secondOpDisplay.textContent);
  const operator = operatorDisplay.textContent;
  if (!isNaN(buttonId)) {
    secondOpDisplay.textContent += buttonId;
    return;
  }

  if (firstOpDisplay.textContent && secondOpDisplay.textContent) {
    if (buttonId = '=') {
      clearDisplays();
      secondOpDisplay.textContent = operate(firstOp, secondOp, operator);
      return;
    }
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

// ----

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


// if (button.id === "=") {
//   button.addEventListener('click', () => {
//     operate(display.textContent);
//   })
// } else if (button.id === "clr" ) {
//   button.addEventListener( 'click', () => {
//     display.textContent = '';
//   })
// } else {
//   button.addEventListener( 'click', () => {
//     updateDisplay(button.id);
//   })
// }