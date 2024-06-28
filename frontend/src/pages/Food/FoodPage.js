// Importa React y otros componentes necesarios, incluyendo estilos CSS, hooks personalizados y componentes de UI
import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getByID } from "../../services/foodService";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";

// Define el componente FoodPage para mostrar detalles de una comida específica
export default function FoodPage() {
  // Estado para almacenar los detalles de la comida
  const [food, setFood] = useState({});
  // Obtiene el ID de la comida desde la URL
  const { id } = useParams();
  // Hook para navegar programáticamente entre rutas
  const navigate = useNavigate();

  // Accede a la función addToCart desde el hook useCart
  const { addToCart } = useCart();

  // Función para manejar la acción de añadir comida al carrito y navegar al carrito
  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  // Efecto para cargar los detalles de la comida cuando el ID cambia
  useEffect(() => {
    getByID(id).then(setFood);
  }, [id]);

  return (
    <>
      {food && (
        <div className={classes.container}>
          {/* Imagen de la comida */}
          <img
            className={classes.image}
            src={`/foods/${food.imageUrl}`}
            alt={food.name}
          />

          {/* Contenedor de detalles de la comida */}
          <div className={classes.details}>
            {/* Encabezado con nombre de la comida y favorito */}
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ♥
              </span>
            </div>

            {/* Componente de calificación por estrellas */}
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            {/* Orígenes de la comida */}
            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            {/* Etiquetas de la comida */}
            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            {/* Tiempo de cocción */}
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            {/* Precio de la comida */}
            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            {/* Botón para añadir la comida al carrito */}
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
