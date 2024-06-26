import React from "react";

export default function Price({ price, locale, currency }) {
  // Define una función para formatear el precio según la localidad y moneda
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency", // Especifica que el estilo del formato es moneda
      currency, // Usa la moneda proporcionada en las props
    }).format(price); // Formatea el precio

  // Renderiza el precio formateado dentro de un elemento <span>
  return <span>{formatPrice()}</span>;
}

// Establece valores predeterminados para las props en caso de que no se proporcionen
Price.defaultProps = {
  locale: "en-US", // Localidad predeterminada es Estados Unidos
  currency: "USD", // Moneda predeterminada es el dólar estadounidense
};
