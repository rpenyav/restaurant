import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";
const EMAIL_KEY = "email"; // Cambiamos a email

const isWeb = Platform.OS === "web";

export const saveToken = async (token: string): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    }
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    if (isWeb) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return await AsyncStorage.getItem(TOKEN_KEY);
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.removeItem(TOKEN_KEY);
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const saveEmail = async (email: string): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.setItem(EMAIL_KEY, email);
    } else {
      await AsyncStorage.setItem(EMAIL_KEY, email);
    }
  } catch (error) {
    console.error("Error saving email:", error);
  }
};

export const getEmail = async (): Promise<string | null> => {
  try {
    if (isWeb) {
      return localStorage.getItem(EMAIL_KEY);
    } else {
      return await AsyncStorage.getItem(EMAIL_KEY);
    }
  } catch (error) {
    console.error("Error getting email:", error);
    return null;
  }
};

export const removeEmail = async (): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.removeItem(EMAIL_KEY);
    } else {
      await AsyncStorage.removeItem(EMAIL_KEY);
    }
  } catch (error) {
    console.error("Error removing email:", error);
  }
};
