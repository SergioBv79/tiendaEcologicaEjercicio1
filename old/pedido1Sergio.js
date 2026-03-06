// pedido.js - Ejercicio 1
// Comprobación de ejecución
console.log("✅ Script pedido.js funcionando");

// Librería para manejar fechas
const dayjs = require("dayjs");

// IVA fijo del ejercicio (21%)
const IVA = 0.21;

// Datos del cliente (objeto)
const cliente = {
  nombre: "Pedro Martínez",
  email: "pedro@example.com",
  direccion: "Calle Falsa 123, Madrid",
};

// Lista de productos (array de objetos)
// Nota: aquí ya uso tipos complejos (array + objetos)
const carrito = [
  { nombre: "Vino tinto", precio: 63.0, cantidad: 1, esFragil: false, stockDisponible: 5 },
  { nombre: "Aceite de oliva virgen extra", precio: 28.5, cantidad: 2, esFragil: true, stockDisponible: 10 },
  { nombre: "Miel cruda orgánica", precio: 12.0, cantidad: 1, esFragil: true, stockDisponible: 0 }, // sin stock a propósito
];

// Prueba rápida: cuántos productos hay
console.log("Productos en carrito:", carrito.length); 

// Normalización: nombre del cliente en mayúsculas
const nombreNormalizado = cliente.nombre.toUpperCase();

console.log("Cliente:", nombreNormalizado);

// subtotal es mutable: se va acumulando
let subtotal = 0;

for (const producto of carrito) {
  // Validación de stock
  if (producto.cantidad > producto.stockDisponible) {
    console.log(`⚠️ Sin stock suficiente: ${producto.nombre} (pedido: ${producto.cantidad}, stock: ${producto.stockDisponible})`);
    continue; // salta al siguiente producto
  }

  // Si hay stock: acumula en subtotal
  subtotal += producto.precio * producto.cantidad;
}

console.log("Subtotal:", subtotal.toFixed(2), "€");

// Convertimos el carrito en un array de booleanos [true, false, ...]
const fragilesFlags = carrito.map(p => p.esFragil);

// Si incluye true, hay al menos un producto frágil
const incluyeFragil = fragilesFlags.includes(true);

console.log("¿Hay productos frágiles?", incluyeFragil ? "Sí" : "No");

let descuento = 0;

if (subtotal > 100) {
  descuento = subtotal * 0.05;
} else {
  descuento = 0;
}

console.log("Descuento:", descuento.toFixed(2), "€");

const baseImponible = subtotal - descuento;
const total = baseImponible * (1 + IVA);

console.log("Total con IVA:", total.toFixed(2), "€");

const fechaEntrega = dayjs().add(3, "day").format("DD/MM/YYYY");

console.log(`
================= 🧾 RESUMEN DEL PEDIDO =================
Cliente: ${nombreNormalizado}  (${cliente.email} - ${cliente.direccion})
Productos en carrito: ${carrito.length}

Subtotal:     ${subtotal.toFixed(2)} €
Descuento:    ${descuento.toFixed(2)} €
IVA:          ${(IVA * 100).toFixed(0)} %
TOTAL:        ${total.toFixed(2)} €

Frágil:       ${incluyeFragil ? "Sí" : "No"}
Entrega:      ${fechaEntrega}
=========================================================
`);
