import { useState, createContext, useContext } from "react";

// Crea un contexto para manejar el estado de carga con un valor inicial vacío
const LoadingContext = createContext({});

// Define y exporta el componente LoadingProvider
export const LoadingProvider = ({ children }) => {
  // Utiliza el hook useState para manejar el estado de carga, inicializándolo en true
  const [isLoading, setIsLoading] = useState(true);

  // Define la función showLoading para establecer el estado de carga en true
  const showLoading = () => setIsLoading(true);
  // Define la función hideLoading para establecer el estado de carga en false
  const hideLoading = () => setIsLoading(false);

  // Renderiza el proveedor del contexto LoadingContext, pasando el estado de carga y las funciones para modificarlo
  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Define y exporta el hook useLoading para acceder al contexto de carga desde los componentes
export const useLoading = () => useContext(LoadingContext);
