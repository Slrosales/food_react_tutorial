// Importa React y otros hooks necesarios desde react-router-dom para la navegación y captura de parámetros URL
import React, { useEffect, useState } from "react";
import classes from "./search.module.css"; // Importa los estilos específicos del componente
import { useNavigate, useParams } from "react-router-dom";

// Define el componente Search para la funcionalidad de búsqueda
export default function Search() {
  // Estado para almacenar el término de búsqueda actual
  const [term, setTerm] = useState("");
  // Hook para programar la navegación entre rutas
  const navigate = useNavigate();
  // Hook para obtener parámetros de la URL, en este caso, el término de búsqueda
  const { searchTerm } = useParams();

  // Efecto que actualiza el estado del término de búsqueda cuando cambia el parámetro de la URL
  useEffect(() => {
    setTerm(searchTerm ?? ""); // Si searchTerm es undefined, se establece el término como una cadena vacía
  }, [searchTerm]);

  // Función para manejar la búsqueda, navega a la ruta de búsqueda con el término actual o a la ruta raíz si el término está vacío
  const search = async () => {
    term ? navigate("/search/" + term) : navigate("/");
  };

  return (
    <div className={classes.container}>
      {/* Campo de entrada para el término de búsqueda */}
      <input
        type="text"
        placeholder="Search Panes" // Texto de marcador de posición en el campo de entrada
        onChange={(e) => setTerm(e.target.value)} // Actualiza el estado del término de búsqueda al cambiar el valor del campo
        onKeyUp={(e) => e.key === "Enter" && search()} // Permite iniciar la búsqueda presionando Enter
        value={term} // Establece el valor del campo de entrada al término de búsqueda actual
      />
      {/* Botón para iniciar la búsqueda */}
      <button onClick={search}>Search</button>
    </div>
  );
}
