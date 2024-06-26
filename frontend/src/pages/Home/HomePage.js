import React, { useEffect, useReducer } from "react";
import { getAll, search } from "../../services/foodService";
import Search from "../../components/Search/Search";
import Thumbails from "../../components/Thumbnails/Thumbanils";
import { useParams } from "react-router-dom";

// Define el estado inicial del componente con un arreglo de comidas vacío
const initialState = { foods: [] };

/*
Un reducer es una función que determina cambios en el estado de una aplicación
basándose en acciones.

En el contexto de React y el uso de useReducer,
un reducer toma el estado actual y una acción como argumentos, y devuelve
un nuevo estado
*/

// Reducer para actualizar el estado basado en acciones recibidas
const reducer = (state, action) => {
  switch (action.type) {
    // Acción para cuando las comidas son cargadas
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    // Caso por defecto retorna el estado actual sin cambios
    default:
      return state;
  }
};

// Componente HomePage
export default function HomePage() {
  // useReducer para manejar el estado del componente
  const [state, dispatch] = useReducer(reducer, initialState);
  // Destructura 'foods' del estado
  const { foods } = state;

  // Obtiene searchTerm de la URL
  const { searchTerm } = useParams();

  // Efecto para cargar las comidas después de montar el componente o cuando cambia searchTerm
  useEffect(() => {
    // Decide si buscar comidas o cargar todas basado en si hay un término de búsqueda
    const loadFoods = searchTerm ? search(searchTerm) : getAll();
    // Carga las comidas y luego despacha acción para actualizar el estado
    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm]); // Dependencia del efecto, se ejecuta de nuevo si searchTerm cambia

  // Renderiza Thumbnails pasando las comidas como prop
  return (
    <>
      <Search />
      <Thumbails foods={foods} />
    </>
  );
}
