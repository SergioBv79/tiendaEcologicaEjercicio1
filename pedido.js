// pedido.js - Ejercicio 1
// Comprobación rápida de ejecución
console.log("✅ Script pedido.js funcionando");

// Librería para manejar fechas
const dayjs = require("dayjs");

// IVA fijo del ejercicio (21%)
const IVA = 0.21;

// Datos del cliente (objeto)
const cliente = {
  nombre: "maría lópez",
  email: "maria@example.com",
};

// Lista de productos (array de objetos)
// Nota: aquí ya estás usando tipos complejos (array + objetos)
const carrito = [
  { nombre: "Cesta de verduras eco", precio: 45.0, cantidad: 1, esFragil: false, stockDisponible: 5 },
  { nombre: "Aceite de oliva virgen extra", precio: 28.5, cantidad: 2, esFragil: true, stockDisponible: 10 },
  { nombre: "Miel cruda orgánica", precio: 12.0, cantidad: 1, esFragil: true, stockDisponible: 0 }, // sin stock a propósito
];

// Prueba rápida: cuántos productos hay
console.log("Productos en carrito:", carrito.length); 