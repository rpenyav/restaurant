import { removeToken, removeEmail } from "@/helpers/storageHelper";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import OrderDetailsScreen from "./orders/[id]";

const CustomDrawerContent = (props: any) => {
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken();
    await removeEmail();
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

const Stack = createStackNavigator();

const DrawerNavigator = () => (
  <Drawer
    screenOptions={{
      headerShown: false, // Ocultar el header
      drawerStyle: { paddingTop: 55 },
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Home"
      options={{
        drawerLabel: "Home",
      }}
    />
    <Drawer.Screen
      name="Profile"
      options={{
        drawerLabel: "Profile",
      }}
    />
  </Drawer>
);

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
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
