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
    return "ERR Cant Divide by Zero";
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
  btm: '',
  fresh: true
}

function updateDisplays(buttonId){
  if (topDisplay.textContent.substring(0,3) === 'ERR') clearDisplays();
  switch(buttonId){
    case 'backspace':
      updateBtmDisplay(sto.btm = sto.btm.toString().slice(0,-1));
      return;
    case 'clr':
      clearDisplays();
      return;
    case '.':
      if (!sto.btm.includes('.')) updateBtmDisplay(sto.btm += '.');
      return;
    case '=':
      if (!sto.op) return;
  }

  if (!isNaN(buttonId)) {
    if (sto.fresh) {
      updateBtmDisplay(sto.btm += buttonId);
    } else {
      updateBtmDisplay(sto.btm = buttonId);
      sto.fresh = true;
    }
  } else if (operators.includes(buttonId) && (sto.top || sto.btm)) {
      if (sto.op) {
      sto.btm = operate(parseFloat(sto.top), parseFloat(sto.btm), sto.op)
    }
    [sto.op, sto.top, sto.btm] = [buttonId, sto.btm, ''];
    topDisplay.innerText = sto.top + ` ${buttonId} `;
    sto.fresh = false;
  } else if (buttonId === '=' && sto.btm) {
    topDisplay.innerText = `${sto.top} ${sto.op} ${sto.btm} ${buttonId}`;
    sto.btm = operate(parseFloat(sto.top), parseFloat(sto.btm), sto.op);
    sto.op = '';
    updateBtmDisplay(sto.btm);
    sto.fresh = false;
  }
}

function updateTopDisplay(number){
  const MAX_STR_LENGTH = 28;
  const strNum = number.toString();
}

function updateBtmDisplay(number){
  const MAX_STR_LENGTH = 20;
  const strNum = number.toString();
  let cLNum = strNum; // cL = correct length number
  if (strNum.includes('ERR')) {
    //skip
  } else if (strNum.includes('e')) {
    const strIndex = strNum.indexOf('e');
    cLNum = strNum.substr(0,MAX_STR_LENGTH-(strNum.length-strIndex)) + strNum.substr(strIndex);
  } else if (strNum.length > MAX_STR_LENGTH && strNum.includes('.')) {
    cLNum = strNum.substr(0,MAX_STR_LENGTH);
  } else if (strNum.length > MAX_STR_LENGTH-1) {
    cLNum = strNum.substr(0,MAX_STR_LENGTH-2  ) + "…"
  }
  btmDisplay.innerText = cLNum;
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