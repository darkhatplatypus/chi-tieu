import { History } from "./History";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/Navigation";

type MainScreenNavigatorProps = NativeStackScreenProps<
  StackParamList,
  RootScreens.MAIN
>;

export const HistoryContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <History data={data} isLoading={isLoading} />;
};
