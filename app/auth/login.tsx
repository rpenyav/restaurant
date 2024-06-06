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
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import BackgroundWaves from "@/components/BackgroundWaves";
import { useUser } from "@/context/UserContext";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { fetchUserData } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userEmail = await login(email, password);

      if (userEmail) {
        await fetchUserData(userEmail);
        router.replace("/authenticated/home");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Login failed");
    } finally {
      setLoading(false);
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
            {loading ? (
              <ActivityIndicator
                accessibilityViewIsModal={true}
                size="large"
                color="#22577a"
              />
            ) : (
              <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            )}
          </View>
          <Pressable
            style={[styles.button, styles.registerButton]}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.buttonText}>Register</Text>
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
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 66,
    resizeMode: "contain",
  },
  input: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ccc",
    padding: 18,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  button: {
    backgroundColor: "#22577a",
    padding: 16,
    marginVertical: 8,
    borderRadius: 50,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  registerButton: {
    marginBottom: 20,
    backgroundColor: "#2f9294",
    padding: 16,
    marginVertical: 8,
    borderRadius: 50,
    width: "100%",
  },
});

export default LoginScreen;
