let balance = 10000;
let maxWithdraw = 6000;
let sumMaxWithdraw = 0;
let multWithdraw = 50;
let donation = 0;
let inputValue;
let historial = [];

const textScreen = document.getElementById('text-screen');

// botones izquierda
const btnL1 = document.getElementById('btn-l-1');
const btnL2 = document.getElementById('btn-l-2');
const btnL3 = document.getElementById('btn-l-3');
const btnL4 = document.getElementById('btn-l-4');
const btnL5 = document.getElementById('btn-l-5');

// botones div izquierda
const divTextL1 = document.getElementById('text-l-1');
const divTextL2 = document.getElementById('text-l-2');
const divTextL3 = document.getElementById('text-l-3');
const divTextL4 = document.getElementById('text-l-4');
const divTextL5 = document.getElementById('text-l-5');

// botones derecha
const btnL6 = document.getElementById('btn-r-6');
const btnL7 = document.getElementById('btn-r-7');
const btnL8 = document.getElementById('btn-r-8');
const btnL9 = document.getElementById('btn-r-9');
const btnL0 = document.getElementById('btn-r-0');

// botones div derecha
const divTextR6 = document.getElementById('text-r-6');
const divTextR7 = document.getElementById('text-r-7');
const divTextR8 = document.getElementById('text-r-8');
const divTextR9 = document.getElementById('text-r-9');
const divTextR0 = document.getElementById('text-r-0');

// ----------------------------------------------------------------------------

btnL0.addEventListener('click', inicio);
btnL1.addEventListener('click', numTable);
btnL3.addEventListener('click', saldo);
btnL4.addEventListener('click', quejas);
btnL5.addEventListener('click', movimientos);

// ----------------------------------------------------------------------------

inicio();

function inicio() {
  limpiarElementos(divTextL1, divTextL2, divTextL3, divTextL4, divTextL5);
  btnL1.removeEventListener('click', numTable);
  textScreen.innerHTML = 'B i e n v e n i d o';
  setTimeout(() => {
    mainMenu();
    btnL1.addEventListener('click', numTable);
    btnL3.addEventListener('click', saldo);
    btnL4.addEventListener('click', quejas);
  }, 3000);
}

// ------------------------------------------------------------------------------

function limpiarElementos(...elementos) {
  elementos.forEach((elemento) => {
    if (elemento) {
      elemento.innerText = '';
    }
  });
}

// ----------------------------------------------------------------------------------------

function mainMenu() {
  divTextL1.innerText = `Retirar (multiplos de $50)`;
  divTextL2.innerText = `Depositos (multiplos de $50)`;
  divTextL3.innerText = `Consultar Saldo`;
  divTextL4.innerText = `Quejas`;
  divTextL5.innerText = `Ultimo Movimiento`;
  divTextR0.innerText = 'Exit';
  textScreen.innerText = '';
}

// ------------------------------------------------------------------------------------

function retirarDinero(numero) {
  if (
    numero <= balance &&
    numero % multWithdraw === 0 &&
    numero <= maxWithdraw - sumMaxWithdraw
  ) {
    balance -= numero;
    sumMaxWithdraw += numero;
    textScreen.innerText = `Current balance: $${balance}
      Available: ${maxWithdraw - sumMaxWithdraw}`;
    agregarHistorial(numero, balance);
    setTimeout(() => {
      donacion();
    }, 2500);
  } else if (numero % multWithdraw !== 0) {
    textScreen.innerHTML = 'Ingrese múltiplos de: $50';
    setTimeout(() => {
      numTable();
    }, 2500);
  } else if (numero > balance) {
    textScreen.innerHTML = 'Fondos insuficientes';
    setTimeout(() => {
      mainMenu();
    }, 2500);
  } else if (numero > sumMaxWithdraw - maxWithdraw) {
    textScreen.innerHTML = `Su máximo a retirar: $${
      maxWithdraw - sumMaxWithdraw
    }`;
    setTimeout(() => {
      numTable();
    }, 2500);
  }
}

// --------------------------------------------------------------------------------

function saldo() {
  textScreen.innerText = `Saldo Actual:  $${balance}`;
  limpiarElementos(divTextL1, divTextL2, divTextL3, divTextL4, divTextL5);
  setTimeout(() => {
    mainMenu();
  }, 2500);
}

// --------------------------------------------------------------------------------

function quejas() {
  textScreen.innerText =
    'No disponible por el momento, favor de comunicarse al 000-000-000';
  limpiarElementos(divTextL1, divTextL2, divTextL3, divTextL4, divTextL5);
  setTimeout(() => {
    mainMenu();
  }, 2500);
}

// ------------------------------------------------------------------------------------

function movimientos() {
  limpiarElementos(divTextL1, divTextL2, divTextL3, divTextL4, divTextL5);
  textScreen.innerHTML = `<p>Ultima operacion:</p>
    <div>
          <p>Cantidad retirada: ${
            historial[historial.length - 1]['Cantidad retirada']
          }</p>
              <p>Cantidad restante: ${
                historial[historial.length - 1]['Cantidad restante']
              }</p>
          <p>Fecha: ${historial[historial.length - 1].fecha}</p>
    </div>
  `;
}

// ------------------------------------------------------------------------------------

function numTable() {
  btnL3.removeEventListener('click', saldo);
  btnL4.removeEventListener('click', quejas);
  creacionNumerosHTML();

  const cantidadParagraph = document.getElementById('cantidad');
  const submitValue = document.getElementById('btn-enter-id');

  const btnNums = [...document.getElementsByClassName('btn-num')];
  btnNums.forEach((btn) => {
    btn.addEventListener('click', () => {
      ingresarNumero(btn.innerText);
    });
  });

  // ------

  function ingresarNumero(numero) {
    const currentNumber = cantidadParagraph.innerText;
    if (numero === 'clear') {
      cantidadParagraph.innerText = '0';
    } else {
      cantidadParagraph.innerText =
        currentNumber === '0' ? numero : currentNumber + numero;
    }
  }

  submitValue.addEventListener('click', function () {
    const cantidadValue = parseInt(cantidadParagraph.innerText);
    retirarDinero(cantidadValue);
  });
}

// ------------------------------------------------------------------------------------

function donacion() {
  textScreen.innerHTML = `Desea donar $200 pesos?

  <div class="div-btn-yes-no">
  <button class="btn-yes" id="btn-enter-si" type="submit">Si</button>
  <button class="btn-no" id="btn-enter-no" type="submit">No</button>
  </div>`;

  const siButton = document.getElementById('btn-enter-si');
  const noButton = document.getElementById('btn-enter-no');

  siButton.addEventListener('click', () => {
    if (balance >= 200) {
      balance -= 200;
      donation += 200;
      textScreen.innerText = `Gracias! 
  
      Usted dono $200 pesos
  
      Fondos: $${balance}`;
      setTimeout(() => {
        mainMenu();
      }, 3000);
    } else {
      textScreen.innerText = 'No cuenta con fondos suficientes';
    }
  });
  noButton.addEventListener('click', () => {
    textScreen.innerText = `Bonito dia!`;
    setTimeout(() => {
      mainMenu();
    }, 2500);
  });
}

// -------------------------------------------------------------------------

function agregarHistorial(retiro, restante) {
  const fecha = new Date();

  const operacion = {
    'Cantidad retirada': retiro,
    'Cantidad restante': restante,
    fecha:
      fecha.getFullYear() +
      '-' +
      (fecha.getMonth() + 1) +
      '-' +
      fecha.getDate(),
  };

  historial.push(operacion);
}

// -------------------------------------------------------------------------

function creacionNumerosHTML() {
  limpiarElementos(divTextL1, divTextL2, divTextL3, divTextL4, divTextL5);

  textScreen.innerHTML = `
    <p>Balance: $${balance}</p>
    <p>Monto máximo de retiro: $${maxWithdraw - sumMaxWithdraw}</p>
    <p>Ingrese la cantidad:</p>
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
}
