import { Overview } from "./Overview";
import React, { useState, useEffect } from "react";
import { useGetAmountThisMonthQuery, useLazyGetUserQuery } from "@/Services";
import { BottomTabRouteProps, BottomTabScreens, RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthenticationContext } from "@/Navigation/AuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OverviewNavigatorProps = NativeStackScreenProps<
  BottomTabRouteProps,
  BottomTabScreens.OVERVIEW
>;

export const OverviewContainer = ({ navigation }: OverviewNavigatorProps) => {
  const onNavigate = (screen: BottomTabScreens) => {
    navigation.navigate(screen);
  };
  const { authenticated, setAuthenticated } = React.useContext(
    AuthenticationContext
  );

  const [fetchUser, { data, isSuccess, isLoading, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchUser()
      .unwrap()
      .catch(() => {
        setAuthenticated(false);
      });
    // console.log(data);
  }, [fetchUser]);

  return <Overview isLoading={isLoading} onNavigate={onNavigate} />;
};
