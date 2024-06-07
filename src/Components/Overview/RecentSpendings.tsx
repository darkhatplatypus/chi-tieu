import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { SpendingCard } from "../spendingCard";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreens } from "@/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabRouteProps } from "@/Screens";
import { TransactionItem } from "@/Services";

type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  BottomTabRouteProps,
  BottomTabScreens.OVERVIEW
>;

export const RecentSpendings = ({ item }: TransactionItem[]) => {
  const navigation = useNavigation();
  return (
    <Card mode="contained" style={styles.container}>
      <Card.Title
        title={<Text variant="titleMedium">Khoản chi tuần này</Text>}
      />
      <Card.Content style={{ gap: 16 }}>
        {item &&
          item.map((item, key) => {
            return (
              <SpendingCard
                title={item.title}
                amount={item.amount}
                category={item.category}
                date={item.date}
                mode="compact"
                id={item._id}
                key={key}
              />
            );
          })}
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate(BottomTabScreens.HISTORY);
          }}
        >
          Xem tất cả
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { padding: 4 },
});
