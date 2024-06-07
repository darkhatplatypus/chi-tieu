import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export const TotalSpending = ({data, screen = "History"}) => {
  return (
    <View style={screen == "Overview" ? styles.containerOverview : styles.container}>
      <Text variant="labelLarge">{screen == "Overview" ? 'CHI TIÊU TRONG THÁNG NÀY' : 'TẤT CẢ CHI TIÊU'}</Text>
      <Text variant="displayMedium">{Number(data).toLocaleString("vi-VN")} ₫</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  containerOverview: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
    paddingBottom: 4,
  }
});
