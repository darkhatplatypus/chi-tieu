import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Button,
  ProgressBar,
  TouchableRipple,
} from "react-native-paper";

interface SavingCardProps {
  title: string;
  amount: number;
  savedAmount: number;
  mode: "compact" | "standard";
  completed?: boolean;
  id: string;
  key: number;
}
import { useNavigation } from "@react-navigation/native";
import { RootScreens } from "@/Screens";

export const SavingCard = (props: SavingCardProps) => {
  const navigation = useNavigation();
  const progress = props.savedAmount / props.amount;
  if (props.mode == "compact") {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
        }}
      >
        {/* <View
          style={{
            width: 8,
            height: 16,
            borderRadius: 8,
            backgroundColor: "#231d70",
          }}
        ></View> */}
        <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="titleMedium">{props.title}</Text>
            <Text variant="titleMedium">{Number(props.amount).toLocaleString('vi-VN')} ₫</Text>
          </View>
          <View>
            <ProgressBar progress={progress} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate(RootScreens.DETAILS, { id: props.id, item: "Saving" });
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
        {/* <View
        style={{
          width: 8,
          height: 24,
          borderRadius: 8,
          backgroundColor: "#231d70",
        }}
      ></View> */}
        <View
          style={
            props.completed
              ? {
                  flex: 1,
                  flexDirection: "column",
                  gap: 10,
                  paddingBottom: 12,
                  borderColor: "#79747E",
                }
              : {
                  flex: 1,
                  flexDirection: "column",
                  gap: 10,
                  borderBottomWidth: 0.5,
                  paddingBottom: 12,
                  borderColor: "#79747E",
                }
          }
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="titleMedium">{props.title}</Text>
            <Text variant="titleMedium">{Number(props.amount).toLocaleString('vi-VN')} ₫</Text>
          </View>
          <View>
            <ProgressBar progress={progress} />
          </View>
          {!props.completed && (
            <Text variant="bodyMedium">
              Đã tiết kiệm được {Number(props.savedAmount).toLocaleString('vi-VN')} ₫
            </Text>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
};
