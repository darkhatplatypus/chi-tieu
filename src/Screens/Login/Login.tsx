import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { Button, Text, Snackbar } from "react-native-paper";
import { AuthenticationScreens, RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = (props: {
  replace: (string: RootScreens) => void;
  navigateTo: (string: AuthenticationScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>This is the login screen</Text>
      <Button
        mode="contained-tonal"
        onPress={async () => {
          await AsyncStorage.setItem("appLaunched", "true");
          props.navigateTo(AuthenticationScreens.SIGNUP);
        }}
      >
        Navigate to SIGNUP
      </Button>
      <Button
        mode="contained-tonal"
        onPress={async () => {
          await AsyncStorage.setItem("appLaunched", "true");
          props.replace(RootScreens.MAIN);
        }}
      >
        Navigate to MAIN
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
