import React from "react";
import classes from "./starRating.module.css";

// Define el componente funcional StarRating que recibe 'stars' y 'size' como props
export default function StarRating({ stars, size }) {
  // Define los estilos para las estrellas basados en el tamaño proporcionado
  const styles = {
    width: size + "px",
    height: size + "px",
    marginRight: size / 6 + "px",
  };

  // Define un componente interno Star que recibe un número
  function Star({ number }) {
    // Calcula la mitad del número para determinar si mostrar media estrella
    const halfNumber = number - 0.5;

    // Retorna una imagen de estrella completa, media o vacía basada en la calificación
    return stars >= number ? (
      <img src="/star-full.svg" style={styles} alt={number} />
    ) : stars >= halfNumber ? (
      <img src="/star-half.svg" style={styles} alt={number} />
    ) : (
      <img src="/star-empty.svg" style={styles} alt={number} />
    );
  }

  // Renderiza el componente StarRating con 5 estrellas
  return (
    <div className={classes.rating}>
      {/* Mapea los números del 1 al 5 para generar cada estrella */}
      {[1, 2, 3, 4, 5].map((number) => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}

// Define los props por defecto para StarRating, estableciendo 'size' a 18
StarRating.defaultProps = {
  size: 18,
};
