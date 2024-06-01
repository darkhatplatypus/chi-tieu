import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, ProgressBar } from "react-native-paper";

interface SavingCardProps {
  title: string;
  amount: number;
  savedAmount: number;
  mode: "compact" | "standard";
}

export const SavingCard = ({
  title,
  amount,
  savedAmount,
  mode,
}: SavingCardProps) => {
  const progress = savedAmount / amount;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 8,
          height: 16,
          borderRadius: 8,
          backgroundColor: "#231d70",
        }}
      ></View>
      <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="titleMedium">{title}</Text>
          <Text variant="titleMedium">{amount}</Text>
        </View>
        <View>
          <ProgressBar progress={progress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 4 },
});
