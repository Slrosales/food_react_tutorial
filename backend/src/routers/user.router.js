// Importa el módulo Router de express para crear manejadores de rutas
import { Router } from "express";
// Importa un conjunto de datos de ejemplo de usuarios
import { sample_users } from "../data";
// Importa jwt para la creación de tokens JWT (JSON Web Tokens)
import jwt from "jsonwebtoken";
// Importa un código de estado HTTP para respuestas de solicitud incorrecta
import { BAD_REQUEST } from "../constants/httpStatus";

// Crea una nueva instancia de Router
const router = Router();

// Define una ruta POST para el login de usuarios
router.post("/login", (req, res) => {
  // Extrae email y password del cuerpo de la solicitud
  const { email, password } = req.body;
  // Busca un usuario en la lista de usuarios de ejemplo que coincida con el email y password proporcionados
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );
  // Si se encuentra un usuario, genera y envía una respuesta con el token JWT
  if (user) {
    res.send(generateTokenResponse(user));
    return;
  }

  // Si no se encuentra un usuario, envía una respuesta con estado 400 y un mensaje de error
  res.status(BAD_REQUEST).send("Username or password invalid");
});

// Función para generar una respuesta con un token JWT para un usuario
const generateTokenResponse = (user) => {
  // Crea un token JWT con la información del usuario y una clave secreta
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText", // Clave secreta para la firma del token, en un entorno real debe ser una cadena segura y privada
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
