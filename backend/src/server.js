// Importa express, un framework de Node.js para construir aplicaciones web y APIs
import express from "express";
// Importa cors, un paquete de Node.js para habilitar CORS (Cross-Origin Resource Sharing)
import cors from "cors";
// Importa foodRouter, un módulo que contiene rutas para la entidad "foods"
import foodRouter from "./routers/food.routers.js";

// Crea una instancia de una aplicación Express
const app = express();

// Habilita CORS para la aplicación Express
app.use(
  cors({
    credentials: true, // Permite el envío de cookies y credenciales de autenticación en las solicitudes cruzadas
    origin: ["http://localhost:3000"], // Especifica los orígenes permitidos para realizar solicitudes cruzadas
  })
);

// Registra foodRouter como middleware para manejar las rutas que comienzan con "/api/foods"
app.use("/api/foods", foodRouter);

// Define el puerto en el que se ejecutará el servidor
const PORT = 5000;
// Inicia el servidor en el puerto especificado y registra un mensaje en la consola una vez que el servidor está escuchando
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
