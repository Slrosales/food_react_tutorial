// Importa axios, una biblioteca de JavaScript para realizar solicitudes HTTP
import axios from "axios";

// Configura la URL base para las solicitudes HTTP realizadas con axios
axios.defaults.baseURL =
  // Verifica si el entorno actual no es de producción
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000" // Si está en desarrollo, usa la URL del servidor local
    : "/"; // Si está en producción, usa la URL raíz
