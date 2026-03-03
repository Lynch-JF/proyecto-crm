const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos de prueba
const baseDeDatos = {
  "1": [
    { text: "Hola Juan, este mensaje viene del SERVIDOR 🚀", type: "received", time: "10:30" },
    { text: "¡Funciona perfecto!", type: "sent", time: "10:31" }
  ],
  "2": [
    { text: "Hola María, tu conexión está activa ✅", type: "received", time: "09:00" }
  ]
};

// LA RUTA (Asegúrate de que no haya espacios extra)
app.get("/messages/:id", (req, res) => {
  const chatId = req.params.id;
  console.log("Petición recibida para el ID:", chatId);

  const mensajes = baseDeDatos[chatId] || [];
  
  // Forzamos que siempre responda JSON
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(mensajes);
});

// Ruta de prueba para verificar en el navegador
app.get("/", (req, res) => {
  res.send("Servidor funcionando. Prueba entrando a http://localhost:3000/messages/1");
});

app.listen(3000, () => {
  console.log("✅ Servidor listo en http://localhost:3000");
});

// Ruta para recibir mensajes nuevos
app.post("/messages/:id", (req, res) => {
  const chatId = req.params.id;
  const nuevoMensaje = req.body; // El mensaje que viene del frontend

  console.log("Nuevo mensaje recibido para ID:", chatId, nuevoMensaje);

  if (baseDeDatos[chatId]) {
    baseDeDatos[chatId].push(nuevoMensaje);
    res.status(201).json({ status: "Guardado", mensaje: nuevoMensaje });
  } else {
    res.status(404).json({ error: "Chat no encontrado" });
  }
});