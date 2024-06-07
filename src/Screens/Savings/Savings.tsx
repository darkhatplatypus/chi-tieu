import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { SavingItem, useLazyGetAllSavingsQuery, User } from "@/Services";
import { Button, Text, AnimatedFAB } from "react-native-paper";
import { RootScreens } from "..";
import { SavingCard } from "@/Components/savingCard";
import { RefreshControl } from "react-native";
import { MD3Colors } from "react-native-paper";

export interface ISavingsProps {
  data: User | undefined;
  isLoading: boolean;
  onScroll: any;
  isCompleted: boolean;
}

export const Savings = (props: ISavingsProps) => {
  const [fetchSavings, savings] = useLazyGetAllSavingsQuery();
  const [isLoading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    fetchSavings().refetch();
  }, []);

  React.useEffect(() => {
    fetchSavings()
      .unwrap()
      .finally(() => setLoading(false));
    // console.log(data);
  }, []);
  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="auto" />
        {isLoading && savings.isLoading && savings.isFetching ? (
          <View
            style={{
              padding: 16,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 16,
            }}
          >
            <ActivityIndicator size="large" color={MD3Colors.primary0} />
            <Text variant="bodyMedium">Đang tải...</Text>
          </View>
        ) : (
          <>
            {/* <Text>{i18n.t(LocalizationKey.HOME)}</Text>
          <Heading color="primary.500" fontSize="md">
            {data?.username}
          </Heading> */}
            {savings.data &&
              savings.data.savings.map((item, key) => {
                return (
                  <SavingCard
                    title={item.title}
                    amount={item.amount}
                    savedAmount={item.saved_amount}
                    mode="standard"
                    id={item._id}
                    key={key}
                  />
                );
              })}
            {/* <Text>This is the savings screen</Text> */}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minWidth: "100%",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    minWidth: "100%",
  },
  fab: { position: "absolute", margin: 16, bottom: 0, right: 0 },
});
