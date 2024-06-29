// Importa el módulo Router de express para crear manejadores de rutas
import { Router } from "express";
// Importa jwt para la creación de tokens JWT (JSON Web Tokens)
import jwt from "jsonwebtoken";
// Importa un código de estado HTTP para respuestas de solicitud incorrecta
import { BAD_REQUEST } from "../constants/httpStatus.js";

import handler from "express-async-handler"; // Importa express-async-handler para manejar promesas en rutas de Express
import { UserModel } from "../models/user.model.js"; // Importa el modelo de usuario para interactuar con la base de datos
import bcrypt from "bcryptjs"; // Importa bcryptjs para hashear y comparar contraseñas

// Crea una nueva instancia de Router
const router = Router();

// Define una ruta POST para el login de usuarios
router.post(
  "/login",
  handler(async (req, res) => {
    // Extrae email y password del cuerpo de la solicitud
    const { email, password } = req.body;
    // Busca un usuario en la base de datos que coincida con el email proporcionado
    const user = await UserModel.findOne({ email });

    // Si se encuentra un usuario y la contraseña coincide, genera y envía una respuesta con el token JWT
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }

    // Si no se encuentra un usuario o la contraseña no coincide, envía una respuesta con estado 400 y un mensaje de error
    res.status(BAD_REQUEST).send("Username or password invalid");
  })
);

// Función para generar una respuesta con un token JWT para un usuario
const generateTokenResponse = (user) => {
  // Crea un token JWT con la información del usuario y una clave secreta
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET, // Clave secreta para la firma del token, almacenada en variables de entorno
    {
      expiresIn: "30d", // Establece la expiración del token a 30 días
    }
  );
  // Retorna un objeto con la información del usuario y el token JWT
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router; // Exporta el router para ser utilizado en otras partes de la aplicación
