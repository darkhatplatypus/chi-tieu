import React from "react";
import { AuthenticationProps, AuthenticationScreens } from "@/Screens";
import { LoginContainer } from "@/Screens/Login";
import { SignupContainer } from "@/Screens/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator<AuthenticationProps>();

// @refresh reset
export const AuthenticationNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={AuthenticationScreens.LOGIN}
        component={LoginContainer}
      ></AuthStack.Screen>
      <AuthStack.Screen
        name={AuthenticationScreens.SIGNUP}
        component={SignupContainer}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
