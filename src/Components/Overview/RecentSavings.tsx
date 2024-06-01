import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { SavingCard } from "../savingCard";

export const RecentSavings = () => {
  return (
    <Card mode="contained" style={styles.container}>
      <Card.Title
        title={<Text variant="titleMedium">Mục tiêu tiết kiệm</Text>}
      />
      <Card.Content style={{ gap: 16 }}>
        <SavingCard title="Macbook Pro 14" amount={1000} savedAmount={400} />
        <SavingCard title="Macbook Pro 14" amount={1600} savedAmount={400} />
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
