import React from "react";
import classes from "./thumbnails.module.css";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import Price from "../Price/Price";

// Define el componente funcional Thumbails que recibe 'foods' como prop
export default function Thumbails({ foods }) {
  // Retorna una lista desordenada
  return (
    <ul className={classes.list}>
      {/* Mapea cada 'food' a un elemento de lista */}
      {foods.map((food) => (
        <li key={food.id}>
          {/* Crea un enlace a la página de detalles de cada comida */}
          <Link to={`/food/${food.id}`}>
            {/* Muestra la imagen de la comida */}
            <img
              className={classes.image}
              src={`/foods/${food.imageUrl}`}
              alt={food.name}
            />

            {/* Contenedor para el contenido adicional de cada comida */}
            <div className={classes.content}>
              {/* Muestra el nombre de la comida */}
              <div className={classes.name}>{food.name}</div>
              {/* Muestra un corazón como favorito/no favorito basado en la propiedad 'favorite' */}
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ♥
              </span>
              {/* Contenedor para las estrellas de calificación */}
              <div className={classes.stars}>
                {/* Muestra la calificación en estrellas de la comida */}
                <StarRating stars={food.stars} />
              </div>
              {/* Contenedor principal para el pie de página del elemento de producto */}
              <div className={classes.product_item_footer}>
                {/* Contenedor para mostrar los orígenes del alimento. */}
                {/*Mapea cada origen a un elemento <span> para su visualización. */}
                <div className={classes.origins}>
                  {food.origins.map((origin) => (
                    <span key={origin}>{origin}</span> // Utiliza el valor de 'origin' como clave única para cada elemento
                  ))}
                </div>
                {/* Contenedor para mostrar el tiempo de cocción del alimento */}
                <div className={classes.cook_time}>
                  <span>🕑</span>
                  {food.cookTime} {/* Muestra el tiempo de cocción */}
                </div>
              </div>
              {/* Contenedor para mostrar el precio del alimento. */}
              {/*Utiliza un componente <Price> pasando el precio como prop */}
              <div className={classes.price}>
                <Price price={food.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
