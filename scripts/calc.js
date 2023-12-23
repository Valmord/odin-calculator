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

function operate(){
  let [a, b, operator] = [parseFloat(sto.top), parseFloat(sto.btm), sto.op]
  switch(operator) {
    case '+':
      return add(a,b);
    case '-':
      return sub(a,b);
    case '×':
      return mul(a,b);
    case '/':
      return div(a,b);
    case '%':
      return mod(a,b);
    case '^':
      return exp(a,b);
    default:
      return 'ERR';
  }
}

const topDisplay = document.querySelector('.top-display')
const btmDisplay = document.querySelector('.bottom-display');
const operators = ['+','-','×','/','^','%','-'];
const sto = {
  op: '',
  top: '',
  btm: '',
  fresh: true
}

function updateDisplays(buttonId){
  if (btmDisplay.textContent.substring(0,3) === 'ERR') clearDisplays();
  switch(buttonId){
    case 'backspace':
      updateBtmDisplay(sto.btm = sto.btm.toString().slice(0,-1));
      sto.top = sto.btm;
      return;
    case 'clr':
      clearDisplays();
      return;
    case '.':
      if (!sto.btm) {
        sto.btm = '0';
      } 
      if (!sto.btm.toString().includes('.')) updateBtmDisplay(sto.btm += '.');
      sto.fresh = true;
      return;
  }

  if (!isNaN(buttonId)) {
    if (sto.btm === '0') sto.btm = '';
    if (sto.fresh) {
      updateBtmDisplay(sto.btm += buttonId);
    } else {
      //if not fresh i.e. was previous calculation, first clears display.
      updateBtmDisplay(sto.btm = buttonId);
      sto.fresh = true;
    }
  } else if (buttonId === '-' && !sto.btm) { 
      updateBtmDisplay(sto.btm += '-');
      sto.fresh = true;
  } else if (operators.includes(buttonId) && (sto.top || sto.btm)) {
      if (sto.op && sto.btm && (sto.op===buttonId || sto.fresh))  {
      sto.top = operate();
      } else if (!sto.btm) {
        sto.btm = sto.top
        sto.btm = operate();
      }
      if (!sto.op) sto.top = sto.btm;
      sto.op = buttonId;
      updateTopDisplay(sto.top,buttonId);
      sto.fresh = false;
  } else if (buttonId === '=' && (sto.top || sto.btm)) {
      if (!sto.op) {
        updateTopDisplay(sto.btm, buttonId);
      } else {
          if (!sto.btm) sto.btm = sto.top;
          updateTopDisplay(`${sto.top} ${sto.op} ${sto.btm}`, buttonId);
          sto.btm = operate();
      }
      sto.top = sto.btm;
      sto.op = '';
      updateBtmDisplay(sto.btm);
      sto.fresh = false;
  }
}

function updateTopDisplay(number, operator){
  const MAX_STR_LENGTH = 28;
  const strNum = number.toString();
  let cLNum = strNum.substr(0, MAX_STR_LENGTH) + ` ${operator} `; //cL = correct length
  if (strNum.includes('e') && strNum.length > MAX_STR_LENGTH - 3) { //-3 for ' op '
    const strIndex = strNum.indexOf('e');
    cLNum = strNum.substr(0,MAX_STR_LENGTH-(strNum.length-strIndex)) 
    + strNum.substr(strIndex) + ` ${operator} `;
  }
  topDisplay.innerText = cLNum;
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
  if (keyPressed.match(/[0123456789+-/%=]/)){
    updateDisplays(e.key.toLowerCase());
  } else if (keyPressed === 'enter') {
    updateDisplays('=');
  } else if (keyPressed === 'backspace') {
    updateDisplays('backspace');
  } else if (keyPressed === "*") {
    updateDisplays('×');
  }
  
})