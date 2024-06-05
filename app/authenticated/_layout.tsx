import { removeToken, removeUsername } from "@/services/authService";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { JSX, ReactNode, RefAttributes } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CustomDrawerContent = (props: any) => {
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken();
    await removeUsername();
    router.replace("/auth/login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
      />
    </DrawerContentScrollView>
  );
};

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: { paddingTop: 55 },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    // Ajuste el margen superior del contenedor del drawer aquí
  },
  drawerContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  logoutButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
