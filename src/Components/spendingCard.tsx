import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

interface SpendingCardProps {
  title: string;
  amount: number;
  category: string;
  time: string | number;
  mode: "compact" | "standard";
}

export const SpendingCard = ({
  title,
  amount,
  category,
  time,
  mode,
}: SpendingCardProps) => {
  if (mode == "compact") {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
          flexGrow: 0,
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
        <View style={{ flex: 1, flexDirection: "column" }}>
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="bodyMedium">{category}</Text>
            <Text variant="bodyMedium">
              {new Date(time).toLocaleString("en-GB")}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        flexGrow: 0,
      }}
    >
      <View
        style={{
          width: 8,
          height: 24,
          borderRadius: 8,
          backgroundColor: "#231d70",
        }}
      ></View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderBottomWidth: 0.5,
          paddingBottom: 12,
          borderColor: "#79747E",
        }}
      >
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyMedium">{category}</Text>
          <Text variant="bodyMedium">
            {new Date(time).toLocaleString("en-GB")}
          </Text>
        </View>
      </View>
    </View>
  );
};
