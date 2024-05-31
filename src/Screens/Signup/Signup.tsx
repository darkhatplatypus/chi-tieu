import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { Button, Text, Snackbar } from "react-native-paper";
import { RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Signup = (props: {
  replace: (string: RootScreens) => void;
  navigateTo: (string: RootScreens) => void;
  back: () => void;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>This is the signup screen</Text>
      <Button
        mode="contained-tonal"
        onPress={async () => {
          await AsyncStorage.setItem("appLaunched", "true");
          props.back();
        }}
      >
        Go back to LOGIN
      </Button>
      <Button
        mode="contained-tonal"
        onPress={async () => {
          await AsyncStorage.setItem("appLaunched", "true");
          props.replace(RootScreens.MAIN);
        }}
      >
        Go to MAIN
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
