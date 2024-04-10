import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { OnboardingContainer } from "@/Screens/Onboarding";
import { RootScreens } from "@/Screens";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARDING]: undefined;
};

import * as SecureStore from "expo-secure-store";

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  // const firstLaunch = true;
  const [firstLaunch, setFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        await AsyncStorage.setItem("appLaunched", "false");
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);
  // const firstLaunch = false;
  return (
    firstLaunch != null && (<NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {firstLaunch && <RootStack.Screen
          name={RootScreens.ONBOARDING}
          component={OnboardingContainer}
        />}
        {/* <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        /> */}
        <RootStack.Screen name={RootScreens.MAIN} component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>)
  );
};

export { ApplicationNavigator };
