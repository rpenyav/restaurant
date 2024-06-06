// components/ItemList.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import globalStyles from "@/styles/globalStyles";
import { MenuItem } from "@/interfaces/categories";

interface Props {
  items: MenuItem[];
  order: { [key: string]: number };
  onSelectItem: (item: string) => void;
  onDeselectItem: (item: string) => void;
}

const ItemList: React.FC<Props> = ({
  items,
  order,
  onSelectItem,
  onDeselectItem,
}) => {
  return (
    <View>
      {items.map((item) => (
        <View key={item._id} style={globalStyles.itemRow}>
          <Pressable
            style={[
              globalStyles.itemButton,
              order[item.namePlato] > 0 && globalStyles.selectedButton,
            ]}
            onPress={() => onSelectItem(item.namePlato)}
          >
            <Text style={globalStyles.itemButtonText}>{item.namePlato}</Text>
          </Pressable>
          <View style={globalStyles.counter}>
            <Pressable onPress={() => onDeselectItem(item.namePlato)}>
              <Text style={globalStyles.counterButton}>-</Text>
            </Pressable>
            <Text style={globalStyles.counterText}>
              {order[item.namePlato] || 0}
            </Text>
            <Pressable onPress={() => onSelectItem(item.namePlato)}>
              <Text style={globalStyles.counterButton}>+</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ItemList;
