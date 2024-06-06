import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API_URL from "@/config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";
const EMAIL_KEY = "email";

interface LoginResponse {
  access_token: string;
}

interface DecodedToken {
  email: string;
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

export const saveEmail = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(EMAIL_KEY, email);
  } catch (error) {
    console.error("Error saving email:", error);
  }
};

export const getEmail = async (): Promise<string | null> => {
  try {
    const email = await AsyncStorage.getItem(EMAIL_KEY);
    return email ? email : null;
  } catch (error) {
    console.error("Error getting email:", error);
    return null;
  }
};

export const removeEmail = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(EMAIL_KEY);
  } catch (error) {
    console.error("Error removing email:", error);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const { access_token } = response.data;

    await saveToken(access_token);

    const decoded: DecodedToken = jwtDecode<DecodedToken>(access_token);

    await saveEmail(decoded.email);
    return decoded.email;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/register`, { email, password });
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};
