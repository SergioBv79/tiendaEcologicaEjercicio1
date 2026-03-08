require("dotenv").config();

const express = require("express");
const dayjs = require("dayjs");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Middlewares
// ==========================================
app.use(express.json());
app.use(express.static("public"));

// ==========================================
// Conexión a MongoDB Atlas
// ==========================================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    console.log("🟢 Conectado exitosamente a MongoDB Atlas (La Nube)")
  )
  .catch((err) => console.error("🔴 Error al conectar a MongoDB:", err));

// ==========================================
// 1. Configuración fija
// ==========================================
const CONFIG = {
  iva: 0.21,
  descuentoUmbral: 100,
  descuentoPorcentaje: 0.05,
  costeEnvio: 5.99,
  envioGratisUmbral: 50,
};

// ==========================================
// 2. Funciones modulares de negocio
// ==========================================
function validarStock(items) {
  return items.every((item) => item.stockDisponible >= item.cantidad);
}

function calcularSubtotal(items) {
  return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function calcularEnvio(subtotal) {
  return subtotal >= CONFIG.envioGratisUmbral ? 0 : CONFIG.costeEnvio;
}

function generarFactura(clienteData, items) {
  if (!validarStock(items)) {
    throw new Error(
      "Falta de stock en uno o más productos. Revisa el inventario."
    );
  }

  const subtotal = calcularSubtotal(items);
  const tieneFragil = items.some((item) => item.esFragil);

  const descuento =
    subtotal > CONFIG.descuentoUmbral
      ? subtotal * CONFIG.descuentoPorcentaje
      : 0;

  const subtotalConDescuento = subtotal - descuento;
  const impuestos = subtotalConDescuento * CONFIG.iva;
  const gastosEnvio = calcularEnvio(subtotalConDescuento);
  const total = subtotalConDescuento + impuestos + gastosEnvio;

  const fechaEntrega = dayjs().add(3, "day").format("DD/MM/YYYY");
  const nombresProductos = items
    .map((p) => `${p.cantidad}x ${p.nombre}`)
    .join("\n  - ");

  return `=========================================
🌱 TIENDA ECO - FACTURA OFICIAL 🌱
=========================================
👤 Cliente: ${clienteData.nombre.toUpperCase()}
📧 Contacto: ${clienteData.email}

📦 Productos:
  - ${nombresProductos}
⚠️ Embalaje especial: ${tieneFragil ? "SÍ (Precaución: Frágil)" : "No"}

--- Desglose ---
Subtotal: ${subtotal.toFixed(2)}€
Descuento: -${descuento.toFixed(2)}€
Base Imponible: ${subtotalConDescuento.toFixed(2)}€
IVA (21%): +${impuestos.toFixed(2)}€
Envío: ${gastosEnvio === 0 ? "GRATIS" : `+${gastosEnvio.toFixed(2)}€`}
-----------------------------------------
💶 TOTAL A PAGAR: ${total.toFixed(2)}€
=========================================
🚚 Entrega estimada: ${fechaEntrega}
=========================================`;
}

// ==========================================
// 3. Rutas de la API
// ==========================================

// Ruta POST: recibe los datos del frontend y genera la factura
app.post("/factura", (req, res) => {
  console.log("📥 Petición POST recibida con un nuevo carrito");

  try {
    const cliente = req.body.cliente;
    const carrito = req.body.carrito;

    if (!cliente || !carrito || !Array.isArray(carrito)) {
      return res
        .status(400)
        .json({ error: "Faltan datos del cliente o el carrito no es válido." });
    }

    console.log(`Generando factura al vuelo para: ${cliente.nombre}`);

    const reciboTexto = generarFactura(cliente, carrito);

    return res.status(200).json({
      mensaje: "Factura generada con éxito",
      ticket: reciboTexto,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// ==========================================
// 4. Iniciar servidor solo en local
// ==========================================
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express encendido en el puerto ${PORT}...`);
  });
}

// ==========================================
// 5. Exportar app para Vercel
// ==========================================
module.exports = app;