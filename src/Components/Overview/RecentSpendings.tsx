import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { SpendingCard } from "../spendingCard";

export const RecentSpendings = () => {
  return (
    <Card mode="contained" style={styles.container}>
      <Card.Title
        title={<Text variant="titleMedium">Khoản chi gần đây</Text>}
      />
      <Card.Content style={{ gap: 16 }}>
        <SpendingCard
          title="Title"
          amount={10000}
          category="category"
          time={Date.now()}
          mode="compact"
        ></SpendingCard>
        <SpendingCard
          title="Title"
          amount={230032}
          category="category"
          time={Date.now()}
          mode="compact"
        ></SpendingCard>
      </Card.Content>
      <Card.Actions>
        <Button mode="text">Xem tất cả</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { padding: 4 },
});
