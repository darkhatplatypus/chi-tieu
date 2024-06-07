import { Login } from "./Login";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery, useLoginMutation } from "@/Services";
import { AuthenticationProps, AuthenticationScreens, RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";
import { CompositeScreenProps } from "@react-navigation/native";

type LoginScreenNavigatorProps = CompositeScreenProps<
  NativeStackScreenProps<RootProps, RootScreens.AUTHENTICATION>,
  NativeStackScreenProps<AuthenticationProps, AuthenticationScreens.LOGIN>
>;

export const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  // const replace = (screen: RootScreens) => {
  //   navigation.replace(screen);
  // };
  const navigateTo = (screen: AuthenticationScreens) => {
    navigation.navigate(screen);
  };
  return <Login navigateTo={navigateTo} />;
};
