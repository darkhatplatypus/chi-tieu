import Onboarding from "react-native-onboarding-swiper";
import { Image, View, StyleSheet } from "react-native";
import React from "react";
import { RootScreens } from "..";
import { Button, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OnboardingScreen = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Onboarding
        NextButtonComponent={({ ...props }) => (
          <Button mode="contained-tonal" {...props}>
            Tiếp theo
          </Button>
        )}
        SkipButtonComponent={() => (
          <Button
            mode="text"
            onPress={async () => {
              props.onNavigate(RootScreens.MAIN);
              await AsyncStorage.setItem("appLaunched", "true");
            }}
          >
            Bỏ qua
          </Button>
        )}
        DoneButtonComponent={() => (
          <Button
            mode="contained-tonal"
            onPress={async () => {
              props.onNavigate(RootScreens.MAIN);
              await AsyncStorage.setItem("appLaunched", "true");
            }}
          >
            Xong
          </Button>
        )}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "#ffffff",
            image: (
              <Image
                style={styles.logo}
                source={require("../../../assets/icon.png")}
              />
            ),
            title: (
              <Text variant="displayMedium" style={{ marginHorizontal: 16 }}>
                Chào mừng đến với Chi Tiêu
              </Text>
            ),
            subtitle: "",
          },
          {
            backgroundColor: "#ffffff",
            image: (
              <Image
                style={styles.logo_small}
                source={require("../../../assets/icon.png")}
              />
            ),
            title: (
              <Text variant="displaySmall" style={{ marginHorizontal: 32 }}>
                Chào mừng đến với Chi Tiêu
              </Text>
            ),

            subtitle: "This is the subtitle that sumplements the title.",
          },
          {
            backgroundColor: "#ffffff",
            image: (
              <Image
                style={styles.logo_small}
                source={require("../../../assets/icon.png")}
              />
            ),
            title: (
              <Text variant="displaySmall" style={{ marginHorizontal: 32 }}>
                Chào mừng đến với Chi Tiêu
              </Text>
            ),
            subtitle: "Beautiful, isn't it?",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 192,
    height: 192,
    resizeMode: "contain",
    borderRadius: 192 / 2,
    overflow: "hidden",
    flex: 0,
    marginLeft: 32,
    alignSelf: "flex-start",
  },
  logo_small: {
    width: 96,
    height: 96,
    resizeMode: "contain",
    borderRadius: 96 / 2,
    overflow: "hidden",
    flex: 0,
    marginHorizontal: 48,
    alignSelf: "flex-start",
  },
});
