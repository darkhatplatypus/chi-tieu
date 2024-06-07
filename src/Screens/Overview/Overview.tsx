import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  User,
  Statistics,
  useGetTransactionsThisWeekQuery,
  useGetAllSavingsQuery,
  useGetAllWalletsQuery,
} from "@/Services/";
import { Button, Text, Snackbar } from "react-native-paper";
import { RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TotalSpending } from "@/Components/Overview/TotalSpending";
import { RecentSpendings } from "@/Components/Overview/RecentSpendings";
import { RecentSavings } from "@/Components/Overview/RecentSavings";
import { BottomTabScreens } from "..";
import { AuthenticationContext } from "@/Navigation/AuthenticationContext";
import * as SecureStorage from "expo-secure-store";
import { RefreshControl } from "react-native";
import { useLazyGetUserQuery } from "@/Services";
import { MD3Colors } from "react-native-paper";
import { useLazyGetAmountThisMonthQuery } from "@/Services/";
import { AppLaunchContext } from "@/Navigation/AppLaunchContext";

export interface OverviewProps {
  data?: User | undefined;
  isLoading: boolean;
  onNavigate: (string: BottomTabScreens) => void;
}

export const Overview = (props: OverviewProps) => {
  // const { appLaunched, setAppLaunched } = React.useContext(AppLaunchContext);
  const [fetchUser, user] = useLazyGetUserQuery();
  const { authenticated, setAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const { appLaunched, setAppLaunched } = React.useContext(AppLaunchContext);
  const { isLoading } = props;
  const [loading, setLoading] = React.useState(true);
  const [fetchAmount, result] = useLazyGetAmountThisMonthQuery();
  const transactionsThisWeek = useGetTransactionsThisWeekQuery();
  const allSavings = useGetAllSavingsQuery();
  const [refreshing, setRefreshing] = React.useState(user.isFetching);
  const wallets = useGetAllWalletsQuery();
  const onRefresh = React.useCallback(() => {
    fetchUser();
    fetchAmount().refetch();
    // console.log(data);
  }, []);

  React.useEffect(() => {
    fetchAmount();
    AsyncStorage.setItem("wallet", wallets.data?.wallets.slice(-1).pop()?._id)
    .finally(() => {
      setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [fetchAmount]);

  return (
    <View style={styles.viewContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ||
        loading ||
        transactionsThisWeek.isLoading ||
        allSavings.isLoading ||
        transactionsThisWeek.isFetching ||
        allSavings.isFetching ||
        wallets.isLoading ? (
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
            <TotalSpending
              data={result.data?.total_amount}
              screen="Overview"
            ></TotalSpending>
            <RecentSpendings
              item={transactionsThisWeek.data?.transactions}
            ></RecentSpendings>
            <RecentSavings item={allSavings.data?.savings}></RecentSavings>
            <Button
              mode="contained-tonal"
              onPress={async () => {
                await AsyncStorage.removeItem("authenticated");
                await SecureStorage.deleteItemAsync("token");
                await SecureStorage.deleteItemAsync("wallet");
                setAuthenticated(false);
              }}
            >
              Logout
            </Button>
            <Button
              mode="contained-tonal"
              onPress={async () => {
                await AsyncStorage.removeItem("authenticated");
                await AsyncStorage.removeItem("appLaunched");
                await SecureStorage.deleteItemAsync("token");
                await SecureStorage.deleteItemAsync("wallet");
                setAppLaunched(false);
                setAuthenticated(false);
              }}
            >
              Clear data & restart
            </Button>
          </>
        )}
      </ScrollView>
      <StatusBar style="auto" />
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    paddingBottom: 80,
    minWidth: "100%",
  },
});
