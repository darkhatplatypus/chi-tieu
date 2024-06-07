import React from "react";
import { EditScreen } from "./Edit";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";
import { RootScreens } from "..";

type EditScreenNavigatorProps = NativeStackScreenProps<
  RootProps,
  RootScreens.ONBOARDING
>;

export const EditContainer = ({ route, navigation }) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const replace = (screen: RootScreens) => {
    navigation.replace(screen);
  };
  const getLaunch = () => {
    // launch();
  };
  return <EditScreen route={route} navigation={navigation} />;
};
