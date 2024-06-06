import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/app/layouts/header";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Category, MenuItems } from "@/interfaces/categories";
import { Provider } from "react-native-paper";

const categories: Category[] = [
  "Entrantes",
  "Tapas",
  "Pasta",
  "Cocina Mediterránea",
  "Carnes",
  "Pescados",
  "Postres",
  "Bebidas",
  "Extras",
];

const items: MenuItems = {
  Entrantes: ["Ensalada", "Sopa", "Bruschetta"],
  Tapas: ["Tortilla", "Patatas Bravas", "Calamares"],
  Pasta: ["Spaghetti", "Lasagna", "Ravioli"],
  "Cocina Mediterránea": ["Paella", "Gazpacho", "Ratatouille"],
  Carnes: ["Bistec", "Pollo Asado", "Cordero"],
  Pescados: ["Salmón", "Atún", "Merluza"],
  Postres: ["Tarta", "Helado", "Fruta"],
  Bebidas: ["Agua", "Vino", "Cerveza"],
  Extras: ["Café", "Licor", "Té"],
};

const OrderDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { id, sector } = useLocalSearchParams() as {
    id: string;
    sector: string;
  };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [order, setOrder] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemSelect = (item: string) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [item]: (prevOrder[item] || 0) + 1,
    }));
  };

  const handleItemDeselect = (item: string) => {
    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder };
      if (newOrder[item] > 0) {
        newOrder[item] -= 1;
      }
      return newOrder;
    });
  };

  const handleConfirmOrder = () => {
    console.log("Order confirmed:", order);
    Alert.alert("Order Confirmed", "Your order has been sent to the kitchen.");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header />
          <View style={styles.breadcrumbs}>
            <Pressable
              style={styles.breadcrumbButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text style={styles.breadcrumbText}>Back to Tables</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>
              Order for Table {id} in {sector}
            </Text>
            <Text style={styles.label}>Select a Category</Text>
            <View style={styles.categoryList}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedButton,
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.categoryButtonText}>{category}</Text>
                </Pressable>
              ))}
            </View>
            {selectedCategory && (
              <>
                <Text style={styles.label}>
                  Select Items from {selectedCategory}
                </Text>
                <View>
                  {items[selectedCategory].map((item) => (
                    <View key={item} style={styles.itemRow}>
                      <Pressable
                        style={[
                          styles.itemButton,
                          order[item] > 0 && styles.selectedButton,
                        ]}
                        onPress={() => handleItemSelect(item)}
                      >
                        <Text style={styles.itemButtonText}>{item}</Text>
                      </Pressable>
                      <View style={styles.counter}>
                        <Pressable onPress={() => handleItemDeselect(item)}>
                          <Text style={styles.counterButton}>-</Text>
                        </Pressable>
                        <Text style={styles.counterText}>
                          {order[item] || 0}
                        </Text>
                        <Pressable onPress={() => handleItemSelect(item)}>
                          <Text style={styles.counterButton}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
            {Object.keys(order).length > 0 && (
              <View style={styles.orderSummary}>
                <Text style={styles.label}>Order Summary</Text>
                {Object.entries(order).map(([item, quantity]) => (
                  <Text key={item} style={styles.orderSummaryText}>
                    {item}: {quantity}
                  </Text>
                ))}
                <Pressable
                  style={styles.confirmButton}
                  onPress={handleConfirmOrder}
                >
                  <Text style={styles.confirmButtonText}>Confirm Order</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7f9cc",
  },
  breadcrumbs: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  breadcrumbButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  breadcrumbText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#007BFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  categoryButtonText: {
    color: "#fff",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  itemButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  itemButtonText: {
    color: "#fff",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  orderSummary: {
    marginTop: 20,
    alignItems: "center",
  },
  orderSummaryText: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "red",
  },
});

export default OrderDetailsScreen;
