import { History } from "./History";
import React, { useState, useEffect } from "react";
import { useLazyGetAllTransactionsQuery } from "@/Services";
import { BottomTabRouteProps, BottomTabScreens, RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";

export type MainScreenNavigatorProps = NativeStackScreenProps<
  BottomTabRouteProps,
  BottomTabScreens.HISTORY
>;

export const HistoryContainer = ({ navigation }: MainScreenNavigatorProps) => {
  // const [userId, setUserId] = useState("9");

  // const [fetchTransactions, { data, isSuccess, isLoading, isFetching, error }] =
  //   useLazyGetAllTransactionsQuery();

  // useEffect(() => {
  //   fetchTransactions()
  // }, [fetchTransactions]);

  return <History navigation={navigation} />;
};
