import React from "react";
import { OnboardingScreen } from "./Onboarding";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";
import { RootScreens } from "..";
import { LaunchContext } from "@/Navigation";

type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  RootProps,
  RootScreens.ONBOARDING
>;

export const OnboardingContainer = ({
  navigation,
}: OnboardingScreenNavigatorProps) => {
  const {launch} = React.useContext(LaunchContext);
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const replace = (screen: RootScreens) => {
    navigation.replace(screen);
  };
  const getLaunch = () => {
    launch();
  }
  return (
    <OnboardingScreen
      onNavigate={onNavigate}
      replace={replace}
      getLaunch={getLaunch}
    />
  );
};
