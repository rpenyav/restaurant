import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "@/services/authService";
import Header from "../layouts/header";
import { useUser } from "@/context/UserContext";

const ProfileScreen: React.FC = () => {
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
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.label}>
          Name: {user.name} {user.surname}
        </Text>
        <Text style={styles.label}>Email: {user.email}</Text>
        <Text style={styles.label}>Age: {user.age}</Text>
        <Text style={styles.label}>Role: {user.role}</Text>
        <Text style={styles.label}>Address: {user.address}</Text>
        <Text style={styles.label}>Postal Code: {user.postalcode}</Text>
        <Text style={styles.label}>Phone 1: {user.phone1}</Text>
        <Text style={styles.label}>Phone 2: {user.phone2}</Text>
        <Text style={styles.label}>Especialidad: {user.especialidad}</Text>
        <Text style={styles.label}>
          Start Date: {user.startDate ? user.startDate : "N/A"}
        </Text>
        <Text style={styles.label}>Active: {user.isActive ? "Yes" : "No"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7f9cc",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default ProfileScreen;
