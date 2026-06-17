// ==========================================
// PARTE 2: Función Constructora Movimiento
// ==========================================
function Movimiento(nombre, tipo, valor) {
  this.nombre = nombre;
  this.tipo = tipo;
  this.valor = valor;
  this.fecha = new Date();

  this.esIngreso = function() {
    return this.tipo === 'ingreso';
  };

  this.esGasto = function() {
    return this.tipo === 'gasto';
  };

  this.datosMovimiento = function() {
    const signo = this.esIngreso() ? '+' : '-';
    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  };

  // Reto autónomo Parte 2
  this.antiguedadEnDias = function() {
    const hoy = new Date();
    const diferenciaMs = hoy - this.fecha;
    return Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
  };
}

// ==========================================
// PARTE 3: Función Constructora Presupuesto
// ==========================================
function Presupuesto() {
  this.movimientos = [];

  this.agregar = function(movimiento) {
    this.movimientos.push(movimiento);
  };

  this.eliminar = function(nombre) {
    this.movimientos = this.movimientos.filter(mov => mov.nombre !== nombre);
  };

  this.obtenerIngresos = function() {
    return this.movimientos.filter(mov => mov.esIngreso());
  };

  this.obtenerGastos = function() {
    return this.movimientos.filter(mov => mov.esGasto());
  };

  this.totalIngresos = function() {
    return this.obtenerIngresos().reduce((acc, mov) => acc + mov.valor, 0);
  };

  this.totalGastos = function() {
    return this.obtenerGastos().reduce((acc, mov) => acc + mov.valor, 0);
  };

  this.saldo = function() {
    return this.totalIngresos() - this.totalGastos();
  };

  this.buscarPorNombre = function(texto) {
    return this.movimientos.find(mov => 
      mov.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  };

  this.resumen = function() {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos: this.totalGastos(),
      saldo: this.saldo()
    };
  };

  // Reto autónomo Parte 3
  this.topGastos = function(n) {
    return this.obtenerGastos()
      .sort((a, b) => b.valor - a.valor)
      .slice(0, n);
  };
}