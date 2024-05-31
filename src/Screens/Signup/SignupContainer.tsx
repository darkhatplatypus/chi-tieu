import { Signup } from "./Signup";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";

type SignupScreenNavigatorProps = NativeStackScreenProps<
  RootProps,
  RootScreens.MAIN
>;

export const SignupContainer = ({ navigation }: SignupScreenNavigatorProps) => {
  const replace = (screen: RootScreens) => {
    navigation.replace(screen);
  };

  const navigateTo = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const back = () => {
    navigation.goBack();
  };
  return <Signup replace={replace} navigateTo={navigateTo} back={back} />;
};
