import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "@/services/authService";
import ConsultasList from "@/components/ConsultasList";
import { useUser } from "@/context/UserContext";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (!token) {
        router.replace("/auth/login");
      }
    };
    checkToken();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (user.role !== "doctor") {
    return (
      <View style={styles.containerfail}>
        <Text>You do not have permission to view this content.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ConsultasList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7f9cc",
  },
  containerfail: {
    flex: 1,
    backgroundColor: "#c7f9cc",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
