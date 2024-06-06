import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "@/services/authService";
import Header from "../layouts/header";
import { useUser } from "@/context/UserContext";
import globalStyles from "@/styles/globalStyles";
import { UserRole } from "@/interfaces/user";
import useCheckToken from "@/hooks/useCheckToken";

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const allowedRoles = [
    UserRole.Guest,
    UserRole.Bartender,
    UserRole.Cheff,
    UserRole.Admin,
  ];
  useCheckToken();

  if (!user) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  if (!allowedRoles.includes(user.role as UserRole)) {
    return (
      <View style={globalStyles.container}>
        <Text>You do not have permission to view this content.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Header />
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Profile</Text>
        <Text style={globalStyles.label}>
          Name: {user.name} {user.surname}
        </Text>
        <Text style={globalStyles.label}>Email: {user.email}</Text>
        <Text style={globalStyles.label}>Age: {user.age}</Text>
        <Text style={globalStyles.label}>Role: {user.role}</Text>
        <Text style={globalStyles.label}>Address: {user.address}</Text>
        <Text style={globalStyles.label}>Postal Code: {user.postalcode}</Text>
        <Text style={globalStyles.label}>Phone 1: {user.phone1}</Text>
        <Text style={globalStyles.label}>Phone 2: {user.phone2}</Text>
        <Text style={globalStyles.label}>
          Especialidad: {user.especialidad}
        </Text>
        <Text style={globalStyles.label}>
          Start Date: {user.startDate ? user.startDate : "N/A"}
        </Text>
        <Text style={globalStyles.label}>
          Active: {user.isActive ? "Yes" : "No"}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
