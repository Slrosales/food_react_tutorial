// Importa axios para realizar solicitudes HTTP
import axios from "axios";

// Define y exporta la función setLoadingInterceptor que configura interceptores para las solicitudes y respuestas de axios
export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
  // Configura un interceptor de solicitud en axios
  axios.interceptors.request.use(
    (req) => {
      showLoading(); // Muestra un indicador de carga antes de enviar la solicitud
      return req; // Continúa con la solicitud
    },
    (error) => {
      hideLoading(); // Oculta el indicador de carga si ocurre un error en la solicitud
      return Promise.reject(error); // Rechaza la promesa con el error
    }
  );

  // Configura un interceptor de respuesta en axios
  axios.interceptors.response.use(
    (res) => {
      hideLoading(); // Oculta el indicador de carga una vez que la respuesta es recibida
      return res; // Continúa con la respuesta
    },
    (error) => {
      hideLoading(); // Oculta el indicador de carga si ocurre un error en la respuesta
      return Promise.reject(error); // Rechaza la promesa con el error
    }
  );
};

// Exporta por defecto setLoadingInterceptor para su uso en otros archivos
export default setLoadingInterceptor;
