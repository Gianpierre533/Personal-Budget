const form = document.getElementById('form-mov');
const lista = document.getElementById('lista');
const presupuesto = new Presupuesto();

// Movimientos de prueba iniciales
presupuesto.agregar(new Movimiento('Salario', 'ingreso', 3000));
presupuesto.agregar(new Movimiento('Cena', 'gasto', 45.50));
presupuesto.agregar(new Movimiento('Freelance', 'ingreso', 500));

// Plantilla dinámica para las filas (Clases-propiedad con semántica de color)
function liHTML(m) {
  const ingreso = m.esIngreso();
  
  let caja = ingreso ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
  let texto = ingreso ? 'text-green-700' : 'text-red-700';
  let signo = ingreso ? '+' : '-';

  return `<li class="flex items-center justify-between p-3 border-l-4 rounded ${caja}">
            <span class="text-gray-800">
              <span class="font-medium">${m.nombre}</span> 
              <span class="text-xs text-gray-500">(${m.tipo})</span>
            </span>
            <span class="font-semibold ${texto}">${signo}$${m.valor.toFixed(2)}</span>
          </li>`;
}

// Renderizador general de la interfaz
function render() {
  // 1. Render de la lista de movimientos
  lista.innerHTML = presupuesto.movimientos.map(liHTML).join('');

  // 2. Render del Saldo Total
  document.getElementById('saldo').textContent = '$' + presupuesto.saldo().toFixed(2);

  // ⭐ RESOLUCIÓN DEL RETO AUTÓNOMO ⭐
  // Render de acumuladores dinámicos utilizando los métodos correspondientes de tu C07
  document.getElementById('total-ingresos').textContent = '$' + presupuesto.totalIngresos().toFixed(2);
  document.getElementById('total-gastos').textContent = '$' + presupuesto.totalGastos().toFixed(2);
}

// Escuchador del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipo').value;
  const valor = parseFloat(document.getElementById('monto').value);

  // Validación básica preventiva
  if (!nombre || isNaN(valor) || valor <= 0) return;

  // Lógica de negocio (C07)
  presupuesto.agregar(new Movimiento(nombre, tipo, valor));
  
  // Sincronizar UI
  render();
  
  // Limpiar formulario
  e.target.reset();
});

// Primera carga de la aplicación
render();