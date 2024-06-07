import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootScreens } from "@/Screens";

interface SpendingCardProps {
  title: string;
  amount: number;
  category: string;
  date: string | number;
  mode: "compact" | "standard";
  id: string;
  key: number;
}

export const SpendingCard = (props: SpendingCardProps) => {
  const navigation = useNavigation();
  if (props.mode == "compact") {
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
            <Text variant="titleMedium">{props.title}</Text>
            <Text variant="titleMedium">
              {Number(props.amount).toLocaleString("vi-VN")} ₫
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="bodyMedium">{props.category}</Text>
            <Text variant="bodyMedium">
              {/* {new Date(props.date).toLocaleString("en-GB")} */}
              {props.date}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate(RootScreens.DETAILS, { id: props.id, item: "Transaction" });
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
          flexGrow: 0,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <View
          style={{
            width: 8,
            height: 24,
            borderRadius: 8,
            backgroundColor: "#231d70",
            marginBottom: 16,
          }}
        ></View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 4,
            borderBottomWidth: 0.5,
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
            <Text
              variant="titleMedium"
              numberOfLines={1}
              style={{ width: "60%" }}
            >
              {props.title}
            </Text>
            <Text variant="titleMedium">
              {Number(props.amount).toLocaleString("vi-VN")} ₫
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 16,
            }}
          >
            <Text variant="bodyMedium">{props.category}</Text>
            <Text variant="bodyMedium">
              {new Date(props.date).toLocaleString("vi-VN")}
              {/* {props.date} */}
            </Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};
