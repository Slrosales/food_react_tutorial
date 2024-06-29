import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno desde un archivo .env

import express from "express"; // Importa express, un framework de Node.js para construir aplicaciones web y APIs
import cors from "cors"; // Importa cors, un paquete de Node.js para habilitar CORS (Cross-Origin Resource Sharing)
import foodRouter from "./routers/food.router.js"; // Importa foodRouter, un módulo que contiene rutas para la entidad "foods"
import userRouter from "./routers/user.router.js"; // Importa userRouter, un módulo que contiene rutas para la entidad "users"

import { dbconnect } from "./config/database.config.js"; // Importa la función de conexión a la base de datos
dbconnect(); // Ejecuta la función de conexión a la base de datos

const app = express(); // Crea una instancia de una aplicación Express

app.use(express.json()); // Habilita el middleware para parsear JSON, permitiendo que la app maneje solicitudes JSON

app.use(
  cors({
    credentials: true, // Permite el envío de cookies y credenciales de autenticación en solicitudes cruzadas
    origin: ["http://localhost:3000"], // Restringe las solicitudes cruzadas solo a este origen
  })
); // Configura CORS con opciones específicas

app.use("/api/foods", foodRouter); // Registra foodRouter como middleware para manejar las rutas bajo "/api/foods"
app.use("/api/users", userRouter); // Registra userRouter como middleware para manejar las rutas bajo "/api/users"

const PORT = 5000; // Define el puerto en el que se ejecutará el servidor
app.listen(PORT, () => {
  console.log("Listening on port " + PORT); // Notifica que el servidor está escuchando en el puerto especificado
});
