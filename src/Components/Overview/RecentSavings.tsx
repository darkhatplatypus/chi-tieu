import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { SavingCard } from "../savingCard";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreens } from "@/Screens";
import { SavingItem } from "@/Services";

export const RecentSavings = ({ item }: SavingItem) => {
  const navigation = useNavigation();
  return (
    <Card mode="contained" style={styles.container}>
      <Card.Title
        title={<Text variant="titleMedium">Mục tiêu tiết kiệm</Text>}
      />
      <Card.Content style={{ gap: 16 }}>
        {item &&
          item.slice(0, 3).map((item, key) => {
            return (
              <SavingCard
                title={item.title}
                amount={item.amount}
                savedAmount={item.saved_amount}
                mode="compact"
                id={item._id}
                key={key}
              />
            );
          })}
        {/* <SavingCard
          title="Macbook Pro 14"
          amount={1000}
          savedAmount={400}
          mode="compact"
        />
        <SavingCard
          title="Macbook Pro 14"
          amount={1600}
          savedAmount={400}
          mode="compact"
        /> */}
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate(BottomTabScreens.SAVINGS);
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
