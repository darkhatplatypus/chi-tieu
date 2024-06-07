import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import {
  TransactionItem,
  TransactionWrapper,
  useLazyGetAllTransactionsQuery,
  useLazyGetAmountAllQuery,
  User,
} from "@/Services";
import { Button, Text, Snackbar, AnimatedFAB } from "react-native-paper";
import { RootScreens } from "..";
import { RefreshControl } from "react-native";
import { MD3Colors } from "react-native-paper";
import { TotalSpending } from "@/Components/Overview/TotalSpending";
import { SpendingCard } from "@/Components/spendingCard";

export interface IHistoryProps {
  // data: TransactionWrapper | undefined;
  // isLoading: boolean;
  navigation: any;
}

export const History = (props: IHistoryProps) => {
  const { navigation } = props;
  const [fetchTransactions, { data, isSuccess, error }] =
    useLazyGetAllTransactionsQuery();
  const [fetchAmount, result] = useLazyGetAmountAllQuery();
  const [isExtended, setIsExtended] = React.useState(true);
  const onScroll = ({ nativeEvent }: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    fetchTransactions().refetch();
    fetchAmount().refetch();
  }, []);

  React.useEffect(() => {
    fetchTransactions()
      .unwrap()
      .finally(() => setLoading(false));
    fetchAmount();
    // console.log(data);
  }, []);

  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="auto" />
        {isLoading ? (
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
            <TotalSpending data={result.data?.total_amount}></TotalSpending>
            <Text variant="titleMedium" style={{ paddingHorizontal: 16 }}>
              Lịch sử các khoản chi
            </Text>
            {data &&
              data.transactions.map((item, key) => {
                return (
                  <SpendingCard
                    title={item.title}
                    amount={item.amount}
                    category={item.category}
                    date={item.createdTime}
                    mode="standard"
                    id={item._id}
                    key={key}
                  />
                );
              })}
          </>
        )}
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Thêm chi tiêu"}
        extended={isExtended}
        onPress={() =>
          navigation.navigate(RootScreens.EDIT, {
            mode: "Add",
            item: "Spending",
          })
        }
        animateFrom={"right"}
        style={styles.fab}
      />
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
    paddingVertical: 16,
    paddingBottom: 80,
    minWidth: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    bottom: 0,
    right: 0,
  },
});
