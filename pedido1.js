const dayjs = require('dayjs');

const IVA = 0.21;

let nombreCliente = 'Juan Pérez';
let direccionCliente = 'Calle Falsa 123';
let telefonoCliente = '555-1234';
let subtotal = 110;
let stock = true
let porcentajeDescuentoAplicado = 0
let fechaEntrega = dayjs().add(3, 'day').format('YYYY-MM-DD');

const productos = [
    { nombre: 'Producto A', precio: 50, cantidad: 1 },
    { nombre: 'Producto B', precio: 40, cantidad: 2 },
    { nombre: 'Producto C', precio: 350, cantidad: 27 },
    { nombre: 'Producto D', precio: 330, cantidad: 6 },
    { nombre: 'Producto E', precio: 330, cantidad: 5 },
    { nombre: 'Producto F', precio: 320, cantidad: 4 }
];

let clienteNormalizado = nombreCliente.toUpperCase();
let direccionNormalizada = direccionCliente.toUpperCase();
let telefonoNormalizado = telefonoCliente.replace(/-/g, '');

let tieneFragil = productos.includes(producto => producto.nombre.toLowerCase().includes('fragil'));

function comprobacionStock(productos) {
    if (!stock) {
        console.log('No hay stock disponible para este pedido.');
        return false;
    }
    return productos.every(producto => producto.cantidad > 0);
}

function porcentajeDescuento(subtotal) {
    if (subtotal >= 100) {
        return porcentajeDescuento = 0.05; 
    } else  {
        return porcentajeDescuento = 0; 
    }
}

function calcularTotal(subtotal, porcentajeDescuento) {
    const descuento = subtotal * porcentajeDescuento;
    const totalConDescuento = subtotal - descuento;
    const totalConIVA = totalConDescuento * (1 + IVA);
    return totalConIVA.toFixed(2);
}

function entregarPedido() {
    if (comprobacionStock(productos)) {
        const descuentoAplicado = porcentajeDescuentoAplicado(subtotal);
        const total = calcularTotal(subtotal, descuentoAplicado);
        console.log(`Pedido entregado a ${clienteNormalizado} en ${direccionNormalizada}. Total a pagar: $${total}. Fecha de entrega: ${fechaEntrega}`);
    }
}


const resumenPedido = `
=========================================
🌱 TIENDA ECO - RESUMEN DEL PEDIDO 🌱
=========================================
👤 Cliente: ${clienteNormalizado}
📦 Productos: ${productos.join(", ")}
⚠️ ¿Contiene frágiles?: ${tieneFragil ? "Sí (Se requiere embalaje especial)" : "No"}

--- Desglose de Facturación ---
Subtotal inicial: ${subtotal.toFixed(2)}€
Descuento aplicado: ${porcentajeDescuento * 100}%
Subtotal tras descuento: ${subtotalConDescuento.toFixed(2)}€
Impuestos (IVA 21%): ${(subtotalConDescuento * IVA).toFixed(2)}€
-----------------------------------------
💶 TOTAL A PAGAR: ${total.toFixed(2)}€
=========================================
🚚 Fecha estimada de entrega: ${fechaEntrega}
=========================================
`;

console.log(resumenPedido);