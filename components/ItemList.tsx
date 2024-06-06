import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
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
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Item</Text>
        <Text style={styles.tableHeaderText}>Price</Text>
        <Text style={styles.tableHeaderText}>Quantity</Text>
      </View>
      {items.map((item) => (
        <View key={item._id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.namePlato}</Text>
          <Text style={styles.tableCell}>${item.precioUnidad.toFixed(2)}</Text>
          <View style={styles.counterCell}>
            <Pressable onPress={() => onDeselectItem(item.namePlato)}>
              <Text style={styles.counterButton}>-</Text>
            </Pressable>
            <Text style={styles.counterText}>{order[item.namePlato] || 0}</Text>
            <Pressable onPress={() => onSelectItem(item.namePlato)}>
              <Text style={styles.counterButton}>+</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
  counterCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  counterButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#007BFF",
  },
  counterText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
});

export default ItemList;
