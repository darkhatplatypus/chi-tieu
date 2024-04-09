import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { Button, Text, Snackbar } from "react-native-paper";
import { RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SecureStore from "expo-secure-store";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
  onNavigate: (string: RootScreens) => void;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <>
          {/* <Text>{i18n.t(LocalizationKey.HOME)}</Text>
          <Heading color="primary.500" fontSize="md">
            {data?.username}
          </Heading> */}
          <Button
            mode="contained-tonal"
            onPress={async () => {
              await AsyncStorage.removeItem("appLaunched");
              setVisible(!visible);
            }}
          >
            Clear data & restart
          </Button>
          <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
            Onboarding reset. Reload app in Expo Go to view the onboarding.
          </Snackbar>
        </>
      )}
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
