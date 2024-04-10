import Onboarding from "react-native-onboarding-swiper";
import { Image, View, StyleSheet } from "react-native";
import React from "react";
import { RootScreens } from "..";
import { Button, Text, FAB } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingContainer } from "./OnboardingContainer";
import { Center } from "native-base";

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
                Chào mừng
                đến với
                Chi Tiêu
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
            subtitle: (
              <View style={styles.onboardingContainer}>
                <View style={styles.onboardingElement}>
                  <FAB
                    icon="spa"
                    size="large"
                    mode="flat"
                    style={{ alignSelf: "flex-start" }}
                  />
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text variant="titleMedium">Tiện lợi</Text>
                    <Text variant="bodyMedium">
                      Quản lý chi tiêu mọi lúc, mọi nơi, ngay trên điện thoại
                      của mình, không cần tính giấy hay máy tính bỏ túi như
                      trước nữa.
                    </Text>
                  </View>
                </View>
                <View style={styles.onboardingElement}>
                  <FAB
                    icon="emoticon-happy"
                    size="large"
                    mode="flat"
                    style={{ alignSelf: "flex-start" }}
                  />
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text variant="titleMedium">Thân thiện</Text>
                    <Text variant="bodyMedium">
                      Giao diện thân thiện, tối giản, giúp bạn nắm bắt được
                      thông tin cần thiết một cách nhanh gọn nhất có thể.
                    </Text>
                  </View>
                </View>
                <View style={styles.onboardingElement}>
                  <FAB
                    icon="security"
                    size="large"
                    mode="flat"
                    style={{ alignSelf: "flex-start" }}
                  />
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text variant="titleMedium">Bảo mật</Text>
                    <Text variant="bodyMedium">
                      Mã hoá đầu cuối theo tiêu chuẩn quân đội nhằm bảo vệ thông
                      tin riêng tư của bạn khỏi kẻ xấu lợi dụng.
                    </Text>
                  </View>
                </View>
              </View>
            ),
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  onboardingContainer: {
    flex: 0,
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 48,
    rowGap: 36,
  },
  onboardingElement: {
    flex: 0,
    flexDirection: "row",
    // borderWidth: 1,
    columnGap: 24,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    flex: 0,
  },
  logo: {
    width: 192,
    height: 192,
    resizeMode: "contain",
    borderRadius: 192 / 2,
    overflow: "hidden",
    flex: 0,
    marginLeft: 40,
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
