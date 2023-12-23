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
  let value = 0;
  switch(operator) {
    case '+':
      value = add(a,b);
      break;
    case '-':
      value = sub(a,b);
      break;
    case '*':
      value = mul(a,b);
      break;
    case '/':
      value = div(a,b);
      break;
    case '%':
      value = mod(a,b);
      break;
    case '^':
      value = exp(a,b);
      break;
    default:
      value = 'ERR';
  }
  return(value);
}

const topDisplay = document.querySelector('.top-display')
const btmDisplay = document.querySelector('.bottom-display');
const operators = ['+','-','*','/','^','%','-'];
const sto = {
  op: '',
  top: '',
  btm: ''
}

function updateDisplays(buttonId){
  // let btm = btmDisplay.innerText;
  switch(buttonId){
    case 'backspace':
      btmDisplay.innerText = (sto.btm = sto.btm.slice(0,-1));
      return;
    case 'clr':
      clearDisplays();
      return;
    case '.':
      if (!sto.btm.includes('.')) btmDisplay.innerText += '.';
      return;
    case '=':
      if (!sto.op) return;
  }

  if (!isNaN(buttonId)) {
    btmDisplay.innerText = (sto.btm += buttonId)
  } else if (operators.includes(buttonId)) {
      if (sto.op) {
      sto.btm = operate(parseFloat(sto.top), parseFloat(sto.btm), sto.op)
    }
    [sto.op, sto.top, sto.btm] = [buttonId, sto.btm, ''];
    topDisplay.innerText = sto.top + ` ${buttonId} `;
  } else if (buttonId === '=') {
    topDisplay.innerText = `${sto.top} ${sto.op} ${sto.btm} ${buttonId}`;
    sto.btm = operate(parseFloat(sto.top), parseFloat(sto.btm), sto.op);
    sto.op = '';
    btmDisplay.innerText = sto.btm;
  }
}

function updateNumber(number){
  return;
}

function clearDisplays(){
  topDisplay.textContent = '';
  btmDisplay.textContent = '';
  [sto.top, sto.btm, sto.op] = ['','',''];
}

const buttons = document.querySelectorAll('.buttons');
buttons.forEach( button => {
  button.addEventListener( 'click', () => {
    updateDisplays(button.id);
  });
});

document.body.addEventListener('keydown', e => {
  const keyPressed = e.key.toLowerCase();
  if (keyPressed.match(/[0123456789+-/*%=]/)){
    updateDisplays(e.key.toLowerCase());
  } else if (keyPressed === 'enter') {
    updateDisplays('=');
  } else if (keyPressed === 'backspace') {
    updateDisplays('backspace');
  }
  
})