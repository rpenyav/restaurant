import React from "react";
import { View, Text, Pressable } from "react-native";
import globalStyles from "@/styles/globalStyles";

interface Props {
  order: { [key: string]: number };
  onConfirmOrder: () => void;
}

const OrderSummary: React.FC<Props> = ({ order, onConfirmOrder }) => {
  return (
    <View style={globalStyles.orderSummary}>
      <Text style={globalStyles.label}>Order Summary</Text>
      {Object.entries(order).map(([item, quantity]) => (
        <Text key={item} style={globalStyles.orderSummaryText}>
          {item}: {quantity}
        </Text>
      ))}
      <Pressable style={globalStyles.confirmButton} onPress={onConfirmOrder}>
        <Text style={globalStyles.confirmButtonText}>Confirm Order</Text>
      </Pressable>
    </View>
  );
};

export default OrderSummary;
