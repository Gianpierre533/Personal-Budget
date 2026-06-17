// Instanciamos el gestor global de presupuesto
const miPresupuesto = new Presupuesto();

function registrarMovimiento() {
  const nombre = prompt('Nombre del movimiento:');
  const tipo = prompt('Tipo (ingreso / gasto):');
  const monto = parseFloat(prompt('Monto:'));

  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos. Intenta de nuevo.');
    return;
  }

  // Creamos la instancia usando la clase del molde y la agregamos al presupuesto
  const nuevoMovimiento = new Movimiento(nombre, tipo, monto);
  miPresupuesto.agregar(nuevoMovimiento);
}

// Bucle de captura interactiva
let continuar = 'si';
while (continuar.toLowerCase() === 'si' || continuar.toLowerCase() === 'sí') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

// --- Ejecución y Muestreo de Reportes ---

// 1. Usando las utilidades funcionales adaptadas de la Parte 1
console.log('%c--- REPORTES DE PARTE 1 & 2 (Funcional + Instancias) ---', 'color: cyan; font-weight: bold;');
imprimirReporte(miPresupuesto.movimientos); 
console.log('Promedio de ingresos: $' + promedioIngresos(miPresupuesto.movimientos).toFixed(2));

// 2. Usando la encapsulación de la Clase Presupuesto de la Parte 3
console.log('%c--- REPORTE DE PARTE 3 (Encapsulado en Clase) ---', 'color: lime; font-weight: bold;');
console.log('Objeto Resumen:', miPresupuesto.resumen());

// Prueba rápida de los retos autónomos en consola
console.log('Agrupados por tipo:', agruparPorTipo(miPresupuesto.movimientos));
console.log('Top 2 Gastos más altos:', miPresupuesto.topGastos(2));