// 1) Variables Globales
let nombres = [];
let valores = [];

// 2) Funciones
function registrarMovimiento() {
  const nombre = prompt("Nombre del movimiento:");
  const tipo = prompt("Tipo (ingreso / gasto):");
  const monto = parseFloat(prompt("Monto:"));

  if (!nombre || (tipo !== "ingreso" && tipo !== "gasto") || isNaN(monto) || monto <= 0) {
    alert("Datos inválidos. Intenta de nuevo.");
    return; // Sale de la función sin guardar nada
  }

  let valor = (tipo === "ingreso") ? monto : -monto;

  nombres.push(nombre);
  valores.push(valor);
  console.log("Movimiento registrado.");
}

function calcularSaldo() {
  let saldo = 0;
  for (let i = 0; i < valores.length; i++) {
    saldo = saldo + valores[i];
  }
  return saldo;
}

function mostrarResumen() {
  console.log('--- Resumen Final ---');
  console.log('Total de movimientos:', nombres.length);
  // Llamamos a calcularSaldo() dentro de mostrarResumen()
  console.log('Saldo total: $' + calcularSaldo().toFixed(2));
}

// 3) Flujo de ejecución
let continuar = 'si';
while (continuar.toLowerCase() === 'si' || continuar.toLowerCase() === 'sí') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

mostrarResumen();