// Para pruebas iniciales, puedes descomentar esto:
// let nombres = ['Salario', 'Cena', 'Freelance', 'Transporte'];
// let valores = [3000, -45.50, 500, -30];

// Para flujo real de laboratorio:
let nombres = [];
let valores = [];

function registrarMovimiento() {
  const nombre = prompt('Nombre del movimiento:');
  const tipo = prompt('Tipo (ingreso / gasto):');
  const monto = parseFloat(prompt('Monto:'));

  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos.');
    return;
  }

  const valor = tipo === 'ingreso' ? monto : -monto;
  nombres.push(nombre);
  valores.push(valor);
}

// Bucle de captura
let continuar = 'si';
while (continuar.toLowerCase() === 'si' || continuar.toLowerCase() === 'sí') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

// Ejecución funcional
imprimirReporte(nombres, valores);
console.log('Promedio de ingresos: $' + promedioIngresos(valores).toFixed(2));