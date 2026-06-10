// --- 1.4 Funciones de filtrado y transformación ---
const obtenerIngresos = valores => valores.filter(valor => valor > 0);
const obtenerGastos = valores => valores.filter(valor => valor < 0);
const montosAbsolutos = valores => valores.map(valor => Math.abs(valor));
const buscarPrimerGastoMayor = (valores, monto) => valores.find(valor => valor < -monto);

// --- 2.2 Funciones con reduce ---
const calcularSaldo = valores => valores.reduce((acc, val) => acc + val, 0);
const totalIngresos = valores => obtenerIngresos(valores).reduce((acc, val) => acc + val, 0);
const totalGastos = valores => obtenerGastos(valores).reduce((acc, val) => acc + val, 0);

// --- 2.4 Reporte ---
const generarValoresReporte = valores => [
  valores.length,
  totalIngresos(valores),
  totalGastos(valores),
  calcularSaldo(valores)
];

const imprimirReporte = (nombres, valores) => {
  console.log('--- Resumen Final ---');
  valores.forEach((valor, i) => {
    const tipo = valor > 0 ? 'ingreso' : 'gasto';
    console.log(`  ${i + 1}. ${nombres[i]} (${tipo}): $${Math.abs(valor).toFixed(2)}`);
  });
  
  const [cantidad, tIngresos, tGastos, saldo] = generarValoresReporte(valores);
  console.log('Total movimientos:', cantidad);
  console.log('Total ingresos: $' + tIngresos.toFixed(2));
  console.log('Total gastos: $' + Math.abs(tGastos).toFixed(2));
  console.log('Saldo: $' + saldo.toFixed(2));
};

// --- 3.1 & 3.2 Composición y DRY ---
const promedioIngresos = valores => {
  const ingresos = obtenerIngresos(valores);
  return ingresos.length === 0 ? 0 : totalIngresos(valores) / ingresos.length;
};

// --- Reto autónomo: validarPresupuesto ---
const validarPresupuesto = (valores, limite) => Math.abs(totalGastos(valores)) <= limite;