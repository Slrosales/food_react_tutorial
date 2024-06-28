import React, { useEffect, useReducer } from "react";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../../services/foodService";
import Search from "../../components/Search/Search";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Tags from "../../components/Tags/Tags";
import NotFound from "../../components/NotFound/NotFound";

/*
Un reducer es una función que determina cambios en el estado de una aplicación
basándose en acciones.

En el contexto de React y el uso de useReducer,
un reducer toma el estado actual y una acción como argumentos, y devuelve
un nuevo estado
*/

// Define el estado inicial del componente con listas vacías para comidas y etiquetas
const initialState = { foods: [], tags: [] };

// Define un reducer para manejar acciones y actualizar el estado del componente
const reducer = (state, action) => {
  switch (action.type) {
    // Maneja la acción de comidas cargadas actualizando el estado con las nuevas comidas
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    // Maneja la acción de etiquetas cargadas actualizando el estado con las nuevas etiquetas
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    // Por defecto, retorna el estado actual sin cambios
    default:
      return state;
  }
};

// Define el componente HomePage para mostrar la página principal
export default function HomePage() {
  // Inicializa el estado y la función dispatch con useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // Extrae comidas y etiquetas del estado para su uso
  const { foods, tags } = state;

  // Utiliza useParams para obtener el término de búsqueda y la etiqueta de la URL
  const { searchTerm, tag } = useParams();

  // useEffect para cargar comidas y etiquetas cuando el componente se monta o cuando cambian searchTerm o tag
  useEffect(() => {
    // Carga las etiquetas y las despacha al estado
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    // Decide la fuente de las comidas basándose en la presencia de searchTerm o tag y las carga
    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    // Despacha las comidas cargadas al estado
    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, tag]); // Dependencias del efecto para reactivarlo

  // Renderiza los componentes de búsqueda, etiquetas y miniaturas de comidas
  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}
