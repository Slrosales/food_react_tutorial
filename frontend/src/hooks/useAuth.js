// Importa hooks y funciones de React y react-toastify para manejar el estado y mostrar notificaciones
import { useState, createContext, useContext } from "react";
// Importa todas las funciones de userService para interactuar con la API de usuarios
import * as userService from "../services/userService";
// Importa toast de react-toastify para mostrar mensajes de éxito o error
import { toast } from "react-toastify";

// Crea un contexto de autenticación con un valor inicial nulo
const AuthContext = createContext(null);

// Define un componente proveedor para el contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Inicializa el estado del usuario con el usuario actual (si existe) mediante userService
  const [user, setUser] = useState(userService.getUser());

  // Define la función login para autenticar usuarios
  const login = async (email, password) => {
    try {
      // Intenta iniciar sesión con las credenciales proporcionadas
      const user = await userService.login(email, password);
      // Si el inicio de sesión es exitoso, actualiza el estado del usuario
      setUser(user);
      // Muestra un mensaje de éxito
      toast.success("Login Successful");
    } catch (err) {
      // En caso de error, muestra un mensaje de error
      toast.error(err.response.data);
    }
  };

  // Define la función logout para cerrar sesión
  const logout = () => {
    // Llama a la función de cierre de sesión de userService
    userService.logout();
    // Establece el estado del usuario a nulo
    setUser(null);
    // Muestra un mensaje de éxito
    toast.success("Logout Successful");
  };

  // Renderiza el proveedor del contexto AuthContext, pasando el usuario actual, login y logout como valores
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define un hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
