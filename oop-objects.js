// ==========================================
// PARTE 2: Clase Movimiento
// ==========================================
class Movimiento {
  constructor(nombre, tipo, valor) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.valor = valor;
    this.fecha = new Date(); // Guarda la fecha actual
  }

  esIngreso() {
    return this.tipo === 'ingreso';
  }

  esGasto() {
    return this.tipo === 'gasto';
  }

  datosMovimiento() {
    const signo = this.esIngreso() ? '+' : '-';
    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  }

  // Reto autónomo Parte 2: antigüedad en días
  antiguedadEnDias() {
    const hoy = new Date();
    const diferenciaMs = hoy - this.fecha;
    return Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
  }
}

// ==========================================
// PARTE 3: Clase Presupuesto (Encapsulación)
// ==========================================
class Presupuesto {
  constructor() {
    this.movimientos = []; 
  }

  agregar(movimiento) {
    this.movimientos.push(movimiento);
  }

  eliminar(nombre) {
    this.movimientos = this.movimientos.filter(mov => mov.nombre !== nombre);
  }

  obtenerIngresos() {
    return this.movimientos.filter(mov => mov.esIngreso());
  }

  obtenerGastos() {
    return this.movimientos.filter(mov => mov.esGasto());
  }

  totalIngresos() {
    return this.obtenerIngresos().reduce((acc, mov) => acc + mov.valor, 0);
  }

  totalGastos() {
    return this.obtenerGastos().reduce((acc, mov) => acc + mov.valor, 0);
  }

  saldo() {
    return this.totalIngresos() - this.totalGastos();
  }

  buscarPorNombre(texto) {
    return this.movimientos.find(mov => 
      mov.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  resumen() {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos: this.totalGastos(),
      saldo: this.saldo()
    };
  }

  // Reto autónomo Parte 3: topGastos(n)
  topGastos(n) {
    return this.obtenerGastos()
      .sort((a, b) => b.valor - a.valor) // Orden descendente (mayor a menor)
      .slice(0, n);                     // Toma los primeros 'n' elementos
  }
}