import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/app/layouts/header";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Category } from "@/interfaces/categories";
import { Provider } from "react-native-paper";
import globalStyles from "@/styles/globalStyles";
import { fetchCategories } from "@/services/categoryService";
import CategoryList from "@/components/CategoryList";
import ItemList from "@/components/ItemList";
import OrderSummary from "@/components/OrderSummary";

const OrderDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { id, sector } = useLocalSearchParams() as {
    id: string;
    sector: string;
  };
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [order, setOrder] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        Alert.alert("Error", "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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
        <View style={globalStyles.container}>
          <Header />
          <View style={globalStyles.breadcrumbs}>
            <Pressable
              style={globalStyles.breadcrumbButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text style={globalStyles.breadcrumbText}>Back to Tables</Text>
            </Pressable>
          </View>
          <View style={globalStyles.content}>
            <Text style={globalStyles.title}>
              Order for Table {id} in {sector}
            </Text>
            <Text style={globalStyles.label}>Select a Category</Text>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            {selectedCategory && (
              <>
                <Text style={globalStyles.label}>
                  Select Items from {selectedCategory}
                </Text>
                <ItemList
                  items={
                    categories.find(
                      (cat) => cat.nameCategoria === selectedCategory
                    )?.items || []
                  }
                  order={order}
                  onSelectItem={handleItemSelect}
                  onDeselectItem={handleItemDeselect}
                />
              </>
            )}
            {Object.keys(order).length > 0 && (
              <OrderSummary order={order} onConfirmOrder={handleConfirmOrder} />
            )}
          </View>
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default OrderDetailsScreen;
