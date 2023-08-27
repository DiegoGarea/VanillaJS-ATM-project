let balance = 10000;
let maxWithdraw = 6000;
let sumMaxWithdraw = 0;
let multWithdraw = 50;
let credit = -400;
let donation = 0;
let transactionHistory = [];
let errorCount = 0;

const textScreen = document.getElementById('text-screen');

// left buttons
const btnL1 = document.getElementById('btn-l-1');
const btnL2 = document.getElementById('btn-l-2');
const btnL3 = document.getElementById('btn-l-3');
const btnL4 = document.getElementById('btn-l-4');
const btnL5 = document.getElementById('btn-l-5');

// left text buttons
const divTextL1 = document.getElementById('text-l-1');
const divTextL2 = document.getElementById('text-l-2');
const divTextL3 = document.getElementById('text-l-3');
const divTextL4 = document.getElementById('text-l-4');
const divTextL5 = document.getElementById('text-l-5');

// right buttons
const btnR6 = document.getElementById('btn-r-6');
const btnR7 = document.getElementById('btn-r-7');
const btnR8 = document.getElementById('btn-r-8');
const btnR9 = document.getElementById('btn-r-9');
const btnR0 = document.getElementById('btn-r-0');

// right text buttons
const divTextR6 = document.getElementById('text-r-6');
const divTextR7 = document.getElementById('text-r-7');
const divTextR8 = document.getElementById('text-r-8');
const divTextR9 = document.getElementById('text-r-9');
const divTextR0 = document.getElementById('text-r-0');

// ----------------------------------------------------------------------------

// cree estas dos funciones de abajo que llaman a la funcion numPad('retiro') y numPad('deposito') por que los eventlistener no funcionan bien cuando los agregue en forma
// anonima, ejemplo:

// btnL1.addEventListener('click', function () {
//   numPad('retiro');
// });

// ya que al querer removerla no se desactivaba el eventlistener, lo detectaba como un eventlistener diferente por la funcion anonima dentro de ella, mi forma de componer esta
// situacion, fue creando estas dos funciones de abajo que interactuan como intermediarios para activar y desactivar los eventlistener con una funcion de invocacion con su parametro
// y ahora con los addEventListener y removeEventListener mandando llamar al intermediario funciona correctamente.

function withdrawMoney() {
  numPad('retiro');
}

function saveMoney() {
  numPad('deposito');
}

function pay() {
  numPad('pago credito');
}
// ---------------------------------------------------------------------------------

start();
function start() {
  errorCount = 0;
  cleanElements(
    divTextL1,
    divTextL2,
    divTextL3,
    divTextL4,
    divTextL5,
    divTextR6
  );
  btnL1.removeEventListener('click', withdrawMoney);
  btnL2.removeEventListener('click', saveMoney);
  btnL3.removeEventListener('click', checkBalance);
  btnL4.removeEventListener('click', complaints);
  btnL5.removeEventListener('click', movements);
  btnR6.removeEventListener('click', pay);
  btnR7.removeEventListener('click', buttonError);
  btnR8.removeEventListener('click', buttonError);
  btnR9.removeEventListener('click', buttonError);
  textScreen.innerHTML = 'L o a d i n g . . .';
  setTimeout(() => {
    btnL1.addEventListener('click', withdrawMoney);
    btnL2.addEventListener('click', saveMoney);
    btnL3.addEventListener('click', checkBalance);
    btnL4.addEventListener('click', complaints);
    btnL5.addEventListener('click', movements);
    btnR6.addEventListener('click', pay);
    btnR7.addEventListener('click', buttonError);
    btnR8.addEventListener('click', buttonError);
    btnR9.addEventListener('click', buttonError);
    btnR0.addEventListener('click', start);
    mainMenu();
  }, 2500);
}

// ----------------------------------------------------------------------------------

function mainMenu() {
  divTextL1.innerText = `Retirar (multiplos de $50)`;
  divTextL2.innerText = `Depositos (multiplos de $50)`;
  divTextL3.innerText = `Consultar Saldo`;
  divTextL4.innerText = `Quejas`;
  divTextL5.innerText = `Ultimo Movimiento`;
  divTextR6.innerText = 'Pago a Tarjeta de Credito';
  divTextR0.innerText = 'Exit';
  textScreen.innerText = '';
}

// ------------------------------------------------------------------------------------

function cleanElements(...elements) {
  elements.forEach((element) => {
    if (element) {
      element.innerText = '';
    }
  });
}

// --------

function cleanEvents() {
  btnL1.removeEventListener('click', withdrawMoney);
  btnL2.removeEventListener('click', saveMoney);
  btnL3.removeEventListener('click', checkBalance);
  btnL4.removeEventListener('click', complaints);
  btnL5.removeEventListener('click', movements);
  btnR6.removeEventListener('click', pay);
  btnR7.removeEventListener('click', buttonError);
  btnR8.removeEventListener('click', buttonError);
  btnR9.removeEventListener('click', buttonError);
}

// ------------------------------------------------------------------------------------

function withdrawFounds(type, amount) {
  errorCount = 0;
  const number = amount;

  if (
    number <= balance &&
    number % multWithdraw === 0 &&
    number <= maxWithdraw - sumMaxWithdraw
  ) {
    balance -= number;
    sumMaxWithdraw += number;
    textScreen.innerText = `Retiro existoso!
    Saldo Total: $${balance}
      Saldo Disponible: ${maxWithdraw - sumMaxWithdraw}`;
    setTimeout(() => {
      donationAnnouncement(type, number, balance);
    }, 2500);
  } else if (number % multWithdraw !== 0) {
    textScreen.innerHTML = 'Ingrese múltiplos de: $50';
    setTimeout(() => {
      numPad('retiro');
    }, 2500);
  } else if (number > balance) {
    textScreen.innerHTML = 'Fondos insuficientes';
    setTimeout(() => {
      numPad('retiro');
    }, 2500);
  } else if (number > sumMaxWithdraw - maxWithdraw) {
    textScreen.innerHTML = `Su máximo a retirar: $${
      maxWithdraw - sumMaxWithdraw
    }`;
    setTimeout(() => {
      numPad('retiro');
    }, 2500);
  } else if (balance === 0) {
    textScreen.innerText = 'Sin fondos';
    setTimeout(() => {
      start();
    }, 2500);
  }
}

// ---------------------------------------------------------------------------

function donationAnnouncement(type, number, balance) {
  textScreen.innerHTML = `Desea donar $200 pesos?
  

  <div class="div-btn-yes-no">
  <button class="btn-yes" id="btn-enter-si" type="submit">Si</button>
  <button class="btn-no" id="btn-enter-no" type="submit">No</button>
  </div>`;

  const yesButton = document.getElementById('btn-enter-si');
  const noButton = document.getElementById('btn-enter-no');

  yesButton.addEventListener('click', () => {
    if (balance >= 200) {
      balance -= 200;
      donation += 200;
      textScreen.innerText = `Gracias! 
  
      Usted dono $200 pesos
  
      Fondos: $${balance}`;
      addTransactionHistory(type, number, balance);
      setTimeout(() => {
        start();
      }, 2500);
    } else {
      textScreen.innerText = 'No cuenta con fondos suficientes';
      setTimeout(() => {
        start();
      }, 2500);
    }
  });
  noButton.addEventListener('click', () => {
    addTransactionHistory(type, number, balance);
    textScreen.innerText = `Bonito dia!`;
    setTimeout(() => {
      start();
    }, 2500);
  });
}

// --------------------------------------------------------------------------------

function checkBalance() {
  errorCount = 0;
  cleanEvents();
  textScreen.innerText = `Saldo Actual:  $${balance}
  Tarjeta de Credito: ${credit}`;
  cleanElements(
    divTextL1,
    divTextL2,
    divTextL3,
    divTextL4,
    divTextL5,
    divTextR6
  );
  setTimeout(() => {
    start();
  }, 2500);
}

// --------------------------------------------------------------------------------

function complaints() {
  errorCount = 0;
  cleanEvents();
  textScreen.innerText =
    'No disponible por el momento, favor de comunicarse al 000-000-000';
  cleanElements(
    divTextL1,
    divTextL2,
    divTextL3,
    divTextL4,
    divTextL5,
    divTextR6
  );
  setTimeout(() => {
    start();
  }, 2500);
}

// ------------------------------------------------------------------------------------

function movements() {
  errorCount = 0;
  cleanEvents();
  if (transactionHistory.length === 0) {
    cleanElements(
      divTextL1,
      divTextL2,
      divTextL3,
      divTextL4,
      divTextL5,
      divTextR6
    );
    textScreen.innerText = 'No hay historial de movimientos.';
  } else {
    cleanElements(
      divTextL1,
      divTextL2,
      divTextL3,
      divTextL4,
      divTextL5,
      divTextR6
    );
    const ultimaOperacion = transactionHistory[transactionHistory.length - 1];

    textScreen.innerHTML = `
      <p>Última operación:</p>
      <div>
        <p>Operación: ${ultimaOperacion.Operacion}</p>
        <p>Cantidad: ${ultimaOperacion.Cantidad}</p>
        <p>Cantidad restante: ${ultimaOperacion['Cantidad restante']}</p>
        <p>Fecha: ${ultimaOperacion.fecha}</p>
      </div>
    `;
  }
}

// -----------------------------------------------------------------------------------

function savingFounds(type, amount) {
  errorCount = 0;
  const number = amount;
  if (number % multWithdraw === 0) {
    balance += number;
    textScreen.innerText = `Depósito exitoso: $${number}
    Nuevo saldo: $${balance}`;
    addTransactionHistory(type, number, balance);
    setTimeout(() => {
      start();
    }, 2500);
  } else if (number % multWithdraw !== 0) {
    textScreen.innerHTML = 'Ingrese múltiplos de: $50';
    setTimeout(() => {
      numPad('deposito');
    }, 2500);
  }
}

// -------------------------------------------------------------------------------------

function payCredit(type, amount) {
  const number = amount;

  if (balance >= number) {
    balance -= number;
    credit += number;
    textScreen.innerText = `Gracias!
    Pago exitoso $${number}
    Deuda de Credito: $${credit}
    Nuevo saldo: $${balance}`;

    addTransactionHistory(type, number, balance);
    setTimeout(() => {
      start();
    }, 3000);
  } else if (balance === 0) {
    textScreen.innerText = 'Sin fondos';
    setTimeout(() => {
      start();
    }, 3000);
  } else {
    textScreen.innerText = 'Fondos insuficientes';
    setTimeout(() => {
      numPad('retiro');
    }, 2500);
  }
}

// ------------------------------------------------------------------------------------

function numPad(type) {
  btnL1.removeEventListener('click', withdrawMoney);
  btnL2.removeEventListener('click', saveMoney);
  btnL3.removeEventListener('click', checkBalance);
  btnL4.removeEventListener('click', complaints);
  btnL5.removeEventListener('click', movements);
  btnR6.removeEventListener('click', pay);
  btnR7.removeEventListener('click', buttonError);
  btnR8.removeEventListener('click', buttonError);
  btnR9.removeEventListener('click', buttonError);

  numberPadCreation(type);

  const quantityParagraph = document.getElementById('cantidad');
  const submitValue = document.getElementById('btn-enter-id');

  const btnNums = [...document.getElementsByClassName('btn-num')];
  btnNums.forEach((btn) => {
    btn.addEventListener('click', () => {
      enterNumber(btn.innerText);
    });
  });

  // ------------

  function enterNumber(number) {
    const currentNumber = quantityParagraph.innerText;
    if (number === 'clear') {
      quantityParagraph.innerText = '0';
    } else {
      quantityParagraph.innerText =
        currentNumber === '0' ? number : currentNumber + number;
    }
  }

  submitValue.addEventListener('click', function () {
    const valueAmount = parseInt(quantityParagraph.innerText);
    transaction(type, valueAmount);
  });
}

// -------------------------------------------------------------------------------

function transaction(type, amount) {
  if (type === 'retiro') {
    withdrawFounds(type, amount);
  } else if (type === 'deposito') {
    savingFounds(type, amount);
  } else if (type === 'pago credito') {
    payCredit(type, amount);
  }
}

// ------------------------------------------------------------------------------

function addTransactionHistory(type, amount, balance) {
  const transactionDate = new Date();

  let operacion = {
    Operacion: type,
    Cantidad: amount,
    'Cantidad restante': balance,
    fecha:
      transactionDate.getFullYear() +
      '-' +
      (transactionDate.getMonth() + 1) +
      '-' +
      transactionDate.getDate(),
  };
  transactionHistory.push(operacion);
  console.log(transactionHistory);
}

// ------------------------------------------------------------------------------

function numberPadCreation(type) {
  cleanElements(
    divTextL1,
    divTextL2,
    divTextL3,
    divTextL4,
    divTextL5,
    divTextR6
  );

  let balanceP = `<p>Balance: $${balance}</p>`;
  let withdrawP = `Monto máximo de retiro: $${maxWithdraw - sumMaxWithdraw}`;
  let creditCard = `Deuda de Credito: $${credit}`;
  let rest = `<p>Ingrese la cantidad:</p>
<p id="cantidad">0</p>
<button class="btn-enter" id="btn-enter-id" type="submit">Submit</button>
<div class="div-btn-num">
  <button class="btn-num">1</button>
  <button class="btn-num">2</button>
  <button class="btn-num">3</button>
</div>
<div class="div-btn-num">
  <button class="btn-num">4</button>
  <button class="btn-num">5</button>
  <button class="btn-num">6</button>
</div>
<div class="div-btn-num">
  <button class="btn-num">7</button>
  <button class="btn-num">8</button>
  <button class="btn-num">9</button>
</div>
<div class="div-btn-num">
  <button class="btn-num">0</button>
  <button class="btn-num btn-clear" id="btn-clear">clear</button>
</div>
`;

  if (type === 'retiro') {
    textScreen.innerHTML = `
    <p>${balanceP}</p>
    <p>${withdrawP}</p>
    ${rest}`;
  } else if (type === 'deposito') {
    textScreen.innerHTML = `
    <p>${balanceP}</p>
    ${rest}`;
  } else if (type === 'pago credito') {
    textScreen.innerHTML = `
    <p>${balanceP}</p>
    <p>${creditCard}</p>
    ${rest}`;
  }
}

// ----------------------------------------------------------------------------------

function buttonError() {
  if (buttonError) {
    errorCount++;
    if (errorCount === 3) {
      cleanEvents();
      cleanElements(
        divTextL1,
        divTextL2,
        divTextL3,
        divTextL4,
        divTextL5,
        divTextR6
      );
      errorCount = 0;
      textScreen.innerText = `Error 404...
      Reiniciando...`;
      setTimeout(() => {
        start();
      }, 3000);
    }
  }
}
