import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "@/config/config";

const TOKEN_KEY = "token";

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Añadir un interceptor para incluir el token en las cabeceras de las solicitudes
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
