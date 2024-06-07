import React from "react";
import { DetailsScreen } from "./Details";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";
import { RootScreens } from "..";

type DetailsScreenNavigatorProps = NativeStackScreenProps<
  RootProps,
  RootScreens.DETAILS
>;

export const DetailsContainer = (route, navigation) => {
  const params = route.route.params;
  return <DetailsScreen params={params} navigation={navigation} />;
};
