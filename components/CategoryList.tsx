// components/CategoryList.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import globalStyles from "@/styles/globalStyles";
import { Category } from "@/interfaces/categories";

interface Props {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={globalStyles.categoryList}>
      {categories.map((category) => (
        <Pressable
          key={category._id}
          style={[
            globalStyles.categoryButton,
            selectedCategory === category.nameCategoria &&
              globalStyles.selectedButton,
          ]}
          onPress={() => onSelectCategory(category.nameCategoria)}
        >
          <Text style={globalStyles.categoryButtonText}>
            {category.nameCategoria}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CategoryList;
