import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { Button, Text, Snackbar } from "react-native-paper";
import { RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TotalSpending } from "@/Components/Overview/TotalSpending";
import { RecentSpendings } from "@/Components/Overview/RecentSpendings";
import { RecentSavings } from "@/Components/Overview/RecentSavings";

export interface IOverviewProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Overview = (props: IOverviewProps) => {
  const { data, isLoading } = props;
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            <TotalSpending></TotalSpending>
            <RecentSpendings></RecentSpendings>
            <RecentSavings></RecentSavings>
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
              Onboarding reset. Reload or reopen app in Expo Go to view the
              onboarding.
            </Snackbar>
          </>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minWidth: "100%",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    paddingBottom: 80,
    minWidth: "100%",
  },
});
