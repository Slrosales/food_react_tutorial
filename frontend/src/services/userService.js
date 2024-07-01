// Importa axios para realizar solicitudes HTTP
import axios from "axios";

// Define y exporta la función getUser
export const getUser = () =>
  // Intenta obtener el usuario actual desde localStorage
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")) // Si existe, lo parsea de JSON a objeto y lo retorna
    : null; // Si no existe, retorna null

// Define y exporta la función login para autenticar usuarios
export const login = async (email, password) => {
  // Realiza una solicitud POST a la API para iniciar sesión, enviando email y contraseña
  const { data } = await axios.post("api/users/login", { email, password });
  // Guarda los datos del usuario en localStorage, convirtiéndolos a string JSON
  localStorage.setItem("user", JSON.stringify(data));
  // Retorna los datos del usuario
  return data;
};

export const register = async (registerData) => {
  const { data } = await axios.post("api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

// Define y exporta la función logout para cerrar sesión
export const logout = () => {
  // Elimina el usuario de localStorage, efectivamente cerrando la sesión
  localStorage.removeItem("user");
};
