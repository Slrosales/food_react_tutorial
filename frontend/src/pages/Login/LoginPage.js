// Importa React y hooks necesarios de varias librerías
import React, { useEffect } from "react";
import { useForm } from "react-hook-form"; // Para manejar formularios
import { useNavigate, useSearchParams } from "react-router-dom"; // Para navegación y manejo de parámetros de URL
import { useAuth } from "../../hooks/useAuth"; // Hook personalizado para autenticación
import classes from "./loginPage.module.css"; // Estilos específicos de la página de inicio de sesión
import Title from "../../components/Title/Title"; // Componente para mostrar títulos
import Input from "../../components/Input/Input"; // Componente para campos de entrada de datos
import Button from "../../components/Button/Button"; // Componente para botones

// Define el componente LoginPage
export default function LoginPage() {
  // Inicializa el hook useForm para manejar el formulario
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Hooks para la navegación y manejo de parámetros de búsqueda en la URL
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Utiliza el hook de autenticación
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl"); // Obtiene el parámetro de URL 'returnUrl'

  // Efecto para redirigir al usuario si ya está autenticado
  useEffect(() => {
    if (!user) return; // Si no hay usuario, no hace nada

    // Navega al 'returnUrl' si existe, de lo contrario, a la página principal
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]); // Dependencia: el estado del usuario

  // Función para manejar el envío del formulario
  const submit = async ({ email, password }) => {
    await login(email, password); // Intenta iniciar sesión con email y contraseña
  };

  // Renderiza el formulario de inicio de sesión
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" /> {/* Título de la página */}
        <form onSubmit={handleSubmit(submit)} noValidate>
          {" "}
          {/* Formulario de inicio de sesión */}
          {/* Campo de entrada para el email */}
          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true, // Requerido
              pattern: {
                // Patrón para validar el email
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email Is Not Valid", // Mensaje de error
              },
            })}
            error={errors.email} // Muestra errores de validación
          />
          {/* Campo de entrada para la contraseña */}
          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true, // Requerido
            })}
            error={errors.password} // Muestra errores de validación
          />
          {/* Botón de envío */}
          <Button type="submit" text="Login" />
        </form>
      </div>
    </div>
  );
}
