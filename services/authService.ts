import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importación según documentación

const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

interface LoginResponse {
  access_token: string;
}

interface DecodedToken {
  username: string;
}

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const saveUsername = async (username: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USERNAME_KEY, username);
  } catch (error) {
    console.error("Error saving username:", error);
  }
};

export const getUsername = async (): Promise<string | null> => {
  try {
    const username = await AsyncStorage.getItem(USERNAME_KEY);
    return username;
  } catch (error) {
    console.error("Error getting username:", error);
    return null;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await axios.post<LoginResponse>(
      "https://backend-tester-741806943268.herokuapp.com/auth/login",
      {
        email,
        password,
      }
    );
    const { access_token } = response.data;
    console.log("Access Token:", access_token); // Log para verificar el token
    await saveToken(access_token);

    // Decodificar el token JWT para obtener el username
    const decoded: DecodedToken = jwtDecode(access_token);
    console.log("Decoded Token:", decoded); // Log para verificar el contenido del token
    await saveUsername(decoded.username); // Guardar username en AsyncStorage
    return decoded.username; // Retornar sólo el username
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const removeUsername = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USERNAME_KEY);
  } catch (error) {
    console.error("Error removing username:", error);
  }
};

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await axios.post(
      "https://backend-tester-741806943268.herokuapp.com/auth/register",
      {
        email,
        password,
      }
    );
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};
