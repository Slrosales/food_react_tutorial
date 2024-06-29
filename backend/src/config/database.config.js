// Importaciones de módulos necesarios para la conexión a la base de datos y operaciones de sembrado
import { connect, set } from "mongoose"; // Importa funciones de mongoose para conectar y configurar la base de datos
import { UserModel } from "../models/user.model.js"; // Modelo de usuario para operaciones de base de datos
import { FoodModel } from "../models/food.model.js"; // Modelo de comida para operaciones de base de datos
import { sample_users, sample_foods } from "../data.js"; // Datos de muestra para usuarios y comidas
import bcrypt from "bcryptjs"; // Importa bcryptjs para el hash de contraseñas

const PASSWORD_HASH_SALT_ROUNDS = 10; // Define la cantidad de rondas para el algoritmo de salting de bcrypt
set("strictQuery", true); // Configura mongoose para usar consultas estrictas

// Función asíncrona para conectar a la base de datos y sembrar datos iniciales
export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI); // Intenta conectar a la base de datos usando la URI de MongoDB desde variables de entorno
    await seedUsers(); // Llama a la función para sembrar usuarios
    await seedFoods(); // Llama a la función para sembrar comidas
    console.log("connect successfully---"); // Loguea éxito en la conexión
  } catch (error) {
    console.log(error); // Loguea cualquier error que ocurra durante el proceso
  }
};

// Función asíncrona para sembrar usuarios en la base de datos
async function seedUsers() {
  const usersCount = await UserModel.countDocuments(); // Cuenta los documentos existentes en la colección de usuarios
  if (usersCount > 0) {
    console.log("Users seed is already done!"); // Si ya hay usuarios, termina la función
    return;
  }

  // Si no hay usuarios, procede a sembrarlos
  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS); // Hashea la contraseña de cada usuario
    await UserModel.create(user); // Crea un nuevo documento de usuario en la base de datos
  }

  console.log("Users seed is done!"); // Loguea el éxito del sembrado de usuarios
}

// Función asíncrona para sembrar comidas en la base de datos
async function seedFoods() {
  const foods = await FoodModel.countDocuments(); // Cuenta los documentos existentes en la colección de comidas
  if (foods > 0) {
    console.log("Foods seed is already done!"); // Si ya hay comidas, termina la función
    return;
  }

  // Si no hay comidas, procede a sembrarlas
  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`; // Corrige la ruta de la imagen de cada comida
    await FoodModel.create(food); // Crea un nuevo documento de comida en la base de datos
  }

  console.log("Foods seed Is Done!"); // Loguea el éxito del sembrado de comidas
}
