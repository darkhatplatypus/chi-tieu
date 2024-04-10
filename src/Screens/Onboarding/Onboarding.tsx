import Onboarding from "react-native-onboarding-swiper";
import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { RootScreens } from "..";
import {
  Button,
  Text,
  FAB,
  Divider,
  List,
  MD3Colors,
  IconButton,
  Switch,
  Snackbar,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingContainer } from "./OnboardingContainer";
import { Center, Row } from "native-base";

export const OnboardingScreen = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
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
            subtitle: (
              <View style={{ paddingHorizontal: 48, height: "60%" }}>
                <Text variant="bodyMedium">
                  Trước khi tiếp tục, bạn nên xem qua các phân loại cho các
                  khoản chi thường dùng, và chỉnh sửa theo sở thích. Ngoài ra
                  bạn có thể tinh chỉnh một số cài đặt hay dùng.
                </Text>
                <Divider />
                <ScrollView
                  style={styles.scrollView}
                  persistentScrollbar={true}
                >
                  <List.Section>
                    <List.Subheader
                      style={{ paddingVertical: 0, marginVertical: 0 }}
                    >
                      Phân loại
                    </List.Subheader>
                    <List.Item
                      title="Quần áo"
                      left={() => <List.Icon color="#DC86D3" icon="circle" />}
                      right={() => (
                        <IconButton icon="close" size={20}></IconButton>
                      )}
                      style={{ height: 48 }}
                    />
                    <List.Item
                      title="Sách vở"
                      left={() => <List.Icon color="#B8D85F" icon="circle" />}
                      right={() => (
                        <IconButton icon="close" size={20}></IconButton>
                      )}
                      style={{ height: 48 }}
                    />
                    <List.Item
                      title="Điện tử"
                      left={() => <List.Icon color="#75C1F9" icon="circle" />}
                      right={() => (
                        <IconButton icon="close" size={20}></IconButton>
                      )}
                      style={{ height: 48 }}
                    />
                    <List.Item
                      title="Đồ ăn"
                      left={() => <List.Icon color="#F3B78B" icon="circle" />}
                      right={() => (
                        <IconButton icon="close" size={20}></IconButton>
                      )}
                      style={{ height: 48 }}
                    />
                    <Button
                      icon="plus"
                      onPress={() => {
                        setVisible(!visible);
                      }}
                    >
                      Thêm phân loại
                    </Button>
                  </List.Section>
                  <Divider />
                  <List.Section>
                    <List.Subheader
                      style={{ paddingVertical: 0, marginVertical: 0 }}
                    >
                      Ngày và giờ
                    </List.Subheader>
                    <List.Item
                      title="Ngày giờ tự động"
                      right={() => <Switch value={true} />}
                      style={{ height: 48 }}
                    />
                    <List.Item
                      title="Múi giờ tự động"
                      right={() => <Switch value={true} />}
                      style={{ height: 48 }}
                    />
                  </List.Section>
                  <Divider />
                  <List.Section>
                    <List.Subheader
                      style={{ paddingVertical: 0, marginVertical: 0 }}
                    >
                      Ngôn ngữ
                    </List.Subheader>
                    <List.Item
                      title="Tiếng Việt (Việt Nam)"
                      right={() => (
                        <IconButton icon="chevron-right" size={20}></IconButton>
                      )}
                      style={{ height: 48 }}
                      android_ripple={{ color: "rgba(0, 0, 0, .32)" }}
                      // rippleColor="rgba(0, 0, 0, .32)"
                    />
                  </List.Section>
                </ScrollView>
                <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
                  Added an item
                </Snackbar>
              </View>
            ),
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
  scrollView: {},
  onboardingContainer: {
    flex: 0,
    flexDirection: "column",
    width: "100%",
    height: "60%",
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
