// Importa React y varios hooks y funciones de React para crear y utilizar contextos
// También importa una lista de alimentos de muestra de los datos locales
import React, { createContext, useContext, useEffect, useState } from "react";

// Crea un contexto de carrito con un valor inicial de null
const CartContext = createContext(null);
// Define una clave constante para almacenar y recuperar el carrito del localStorage
const CART_KEY = "cart";
// Define un carrito vacío como valor inicial para cuando no hay datos en localStorage
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

// Define un proveedor de contexto que envuelve cualquier componente hijo que necesite acceso al contexto del carrito
export default function CartProvider({ children }) {
  // Recupera el carrito del localStorage o inicializa con un carrito vacío
  const initCart = getCartFromLocalStorage();
  // Estado para los artículos en el carrito
  const [cartItems, setCartItems] = useState(initCart.items);
  // Estado para el precio total del carrito
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  // Estado para el conteo total de artículos en el carrito
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  // Efecto para actualizar el precio total, el conteo total y sincronizar el carrito con localStorage
  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));

    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);

  // Recupera el carrito almacenado en localStorage o retorna un carrito vacío si no hay datos
  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  // Función auxiliar para sumar valores numéricos en un array
  const sum = (items) => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  // Elimina un artículo del carrito basado en el ID del alimento
  const removeFromCart = (foodId) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.food.id !== foodId
    );
    setCartItems(filteredCartItems);
  };

  // Cambia la cantidad de un artículo en el carrito y actualiza el precio total de ese artículo
  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;

    const changeCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.food.id === food.id ? changeCartItem : item
      )
    );
  };

  // Añade un artículo al carrito o incrementa su cantidad si ya existe
  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food.id === food.id);

    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  // Provee el contexto del carrito a los componentes hijos, permitiéndoles acceder y modificar el carrito
  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para facilitar el acceso al contexto del carrito desde cualquier componente hijo
export const useCart = () => useContext(CartContext);
