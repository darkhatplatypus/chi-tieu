import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export const TotalSpending = () => {
  return (
    <View style={styles.container}>
      <Text variant="labelLarge">CHI TIÊU THÁNG NÀY</Text>
      <Text variant="displayMedium">272.438.000 ₫</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
  },
});
