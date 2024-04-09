import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import OnboardingScreen from "@/Screens/Home/OnboardingScreen";
const Tab = createBottomTabNavigator();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding" >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
      <Tab.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          tabBarStyle: { display: 'none' }

          // tabBarIconStyle: { display: "none" },
          // tabBarLabelPosition: "beside-icon",
        }}
      />
    </Tab.Navigator >
  );
};
