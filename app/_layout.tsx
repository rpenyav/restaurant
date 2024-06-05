import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { getToken } from "@/services/authService";
import { UserProvider } from "@/context/UserContext";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (!token) {
        router.replace("/auth/login");
      }
    };
    checkToken();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <StatusBar style="dark" backgroundColor="#ffffff" />
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#007BFF", // Configurar el color de fondo del header
              },
              headerTintColor: "#fff",
              headerShown: false,
              animation: "slide_from_right", // Usar animación de deslizamiento lateral
              gestureDirection: "horizontal",
            }}
          />
        </View>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7f9cc",
  },
});
