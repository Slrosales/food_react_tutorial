// Importa React y otros componentes necesarios, incluyendo estilos CSS, hooks personalizados y componentes de UI
import React from "react";
import classes from "./cartPage.module.css";
import { useCart } from "../../hooks/useCart";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import Price from "../../components/Price/Price";
import NotFound from "../../components/NotFound/NotFound";

// Define el componente CartPage para la página del carrito de compras
export default function CartPage() {
  // Utiliza el hook useCart para acceder al estado y funciones del carrito
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      {/* Muestra el título de la página */}
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {/* Verifica si hay artículos en el carrito para mostrarlos */}
      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className={classes.container}>
          {/* Lista de artículos en el carrito */}
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.food.id}>
                {/* Imagen del artículo */}
                <div>
                  <img
                    src={`/foods/${item.food.imageUrl}`}
                    alt={item.food.name}
                  />
                </div>

                {/* Nombre del artículo, enlazado a su página */}
                <div>
                  <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                </div>

                {/* Input para cambiar la cantidad del artículo */}
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        changeQuantity(item, newQuantity);
                      }
                    }}
                    min="1"
                  />
                </div>

                {/* Muestra el precio del artículo */}
                <div>
                  <Price price={item.price} />
                </div>

                {/* Botón para eliminar el artículo del carrito */}
                <div>
                  <button
                    className={classes.remove_button}
                    onClick={() => removeFromCart(item.food.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Sección de checkout con el conteo total de artículos y el precio total */}
          <div className={classes.checkout}>
            <div>
              <div className={classes.foods_count}>{cart.totalCount}</div>
              <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            {/* Enlace para proceder al checkout */}
            <Link to="/checkout">Proceed To Checkout</Link>
          </div>
        </div>
      )}
    </>
  );
}
