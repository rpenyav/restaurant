import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";
import BackgroundWaves from "@/components/BackgroundWaves";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      Alert.alert("Success", "Registration successful. Please log in.");
      router.push("/auth/login");
    } catch (error) {
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <BackgroundWaves />
          <View style={styles.content}>
            <Image
              source={require("@/assets/images/logotipo.png")}
              style={styles.logo}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Reescriba la contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </View>
          <Pressable
            style={[styles.button, styles.loginButton]}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Centra el contenido horizontalmente
  },
  logo: {
    width: 200, // Ajusta el tamaño de la imagen según sea necesario
    height: 100,
    marginBottom: 26,
    resizeMode: "contain", // Asegura que la imagen se ajuste correctamente
  },
  input: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ccc",
    padding: 18,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    width: "100%", // Asegura que los inputs ocupen todo el ancho disponible
  },
  button: {
    backgroundColor: "#22577a",
    padding: 16,
    marginVertical: 8,
    borderRadius: 50,
    width: "100%", // Asegura que los botones ocupen todo el ancho disponible
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  loginButton: {
    marginBottom: 20,
    backgroundColor: "#2f9294",
    padding: 16,
    marginVertical: 8,
    borderRadius: 50,
    width: "100%",
  },
});

export default RegisterScreen;
