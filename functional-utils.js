// --- Funciones de filtrado y transformación ---
const obtenerIngresos = movimientos => 
  movimientos.filter(movimiento => movimiento.tipo === 'ingreso');

const obtenerGastos = movimientos => 
  movimientos.filter(movimiento => movimiento.tipo === 'gasto');

// --- Funciones con reduce ---
const totalIngresos = movimientos => 
  obtenerIngresos(movimientos).reduce((acc, mov) => acc + mov.valor, 0);

const totalGastos = movimientos => 
  obtenerGastos(movimientos).reduce((acc, mov) => acc + mov.valor, 0);

// CAMBIO CLAVE: El saldo ahora es ingresos MENOS gastos (valores positivos)
const calcularSaldo = movimientos => 
  totalIngresos(movimientos) - totalGastos(movimientos);

// El signo se invierte: buscamos dónde el valor positivo supera al monto límite
const buscarPrimerGastoMayor = (movimientos, monto) => 
  obtenerGastos(movimientos).find(movimiento => movimiento.valor > monto);

// --- Reporte ---
const generarValoresReporte = movimientos => [
  movimientos.length,
  totalIngresos(movimientos),
  totalGastos(movimientos),
  calcularSaldo(movimientos)
];

const imprimirReporte = movimientos => {
  console.log('--- Resumen Final ---');
  movimientos.forEach((movimiento, i) => {
    // Si ya implementaste la Parte 2 (POO), puedes cambiar esta línea por movimiento.datosMovimiento()
    // Por ahora lee el objeto plano directamente:
    const formato = movimiento.datosMovimiento 
      ? movimiento.datosMovimiento() 
      : `${movimiento.nombre} (${movimiento.tipo}): $${movimiento.valor.toFixed(2)}`;
    
    console.log(`  ${i + 1}. ${formato}`);
  });
  
  const [cantidad, tIngresos, tGastos, saldo] = generarValoresReporte(movimientos);
  console.log('Total movimientos:', cantidad);
  console.log('Total ingresos: $' + tIngresos.toFixed(2));
  console.log('Total gastos: $' + tGastos.toFixed(2)); // Ya es positivo, sin Math.abs
  console.log('Saldo: $' + saldo.toFixed(2));
};

// --- Composición y DRY ---
const promedioIngresos = movimientos => {
  const ingresos = obtenerIngresos(movimientos);
  return ingresos.length === 0 ? 0 : totalIngresos(movimientos) / ingresos.length;
};

// --- Reto autónomo Parte 1: agruparPorTipo ---
const agruparPorTipo = movimientos => 
  movimientos.reduce((acc, mov) => {
    if (mov.tipo === 'ingreso') acc.ingresos.push(mov);
    if (mov.tipo === 'gasto') acc.gastos.push(mov);
    return acc;
  }, { ingresos: [], gastos: [] });