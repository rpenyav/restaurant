import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalado @expo/vector-icons

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.header}>
      {route.name !== "OrderDetails" && (
        <Pressable onPress={openDrawer} style={styles.button}>
          <Ionicons name="menu" size={24} color="#22577a" />
        </Pressable>
      )}
      <View style={styles.brandContainer}>
        <Image
          source={require("@/assets/images/logomini.png")}
          style={styles.logo}
        />
      </View>
      <Pressable
        onPress={() => console.log("Settings Pressed")}
        style={styles.button}
      >
        <Ionicons name="settings" size={24} color="#22577a" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    top: 31,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  logo: {
    width: 40, // Ajusta el tamaño de la imagen según sea necesario
    height: 40,
    marginBottom: 0,
    resizeMode: "contain", // Asegura que la imagen se ajuste correctamente
  },
  button: {
    backgroundColor: "transparent",
    padding: 0,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  brandContainer: {
    flex: 1,
    alignItems: "center",
  },
  brandText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
