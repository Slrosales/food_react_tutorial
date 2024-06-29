// Importa express, un framework de Node.js para construir aplicaciones web y APIs
import express from "express";
// Importa cors, un paquete de Node.js para habilitar CORS (Cross-Origin Resource Sharing)
import cors from "cors";
// Importa foodRouter, un módulo que contiene rutas para la entidad "foods"
import foodRouter from "./routers/food.router.js";
// Importa userRouter, un módulo que contiene rutas para la entidad "users"
import userRouter from "./routers/user.router.js";

// Crea una instancia de una aplicación Express
const app = express();

// Habilita el middleware para parsear JSON, permitiendo que la app maneje solicitudes JSON
app.use(express.json());

// Configura CORS con opciones específicas
app.use(
  cors({
    credentials: true, // Permite el envío de cookies y credenciales de autenticación en solicitudes cruzadas
    origin: ["http://localhost:3000"], // Restringe las solicitudes cruzadas solo a este origen
  })
);

// Registra foodRouter como middleware para manejar las rutas bajo "/api/foods"
app.use("/api/foods", foodRouter);
// Registra userRouter como middleware para manejar las rutas bajo "/api/users"
app.use("/api/users", userRouter);

// Define el puerto en el que se ejecutará el servidor
const PORT = 5000;
// Inicia el servidor en el puerto especificado, mostrando un mensaje en consola una vez iniciado
app.listen(PORT, () => {
  console.log("Listening on port " + PORT); // Notifica que el servidor está escuchando en el puerto especificado
});
