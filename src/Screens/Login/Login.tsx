import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Text,
  MD3Colors,
  TextInput,
  Dialog,
  Portal,
  PaperProvider,
} from "react-native-paper";
import { AuthenticationScreens, RootScreens } from "..";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginMutation } from "@/Services";
import { AuthenticationContext } from "@/Navigation/AuthenticationContext";
import * as SecureStore from "expo-secure-store";

export const Login = (props: {
  navigateTo: (string: AuthenticationScreens) => void;
}) => {
  const { authenticated, setAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const [login, { data, status, error, isLoading }] = useLoginMutation();
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setText(
        "Email hoặc mật khẩu không được để trống. Vui lòng điền đầy đủ thông tin."
      );
      // console.log(authenticated);
      showDialog();
      return;
    }
    try {
      // console.log("started query");
      const response = await login({ email, password }).unwrap();
      await AsyncStorage.setItem("authenticated", 'true');
      SecureStore.setItem("token", response.token);
      setAuthenticated(true);
      // console.log(response);
    } catch (err) {
      setText(
        "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút hoặc kiểm tra lại email và mật khẩu."
      );
      showDialog();
    }
  };
  const image = require("../../../assets/onboard-bg-1.png");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.viewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.imageContainer}
          >
            <StatusBar style="auto" />
            <Text variant="displaySmall">Đăng nhập</Text>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              inputMode="email"
              onChangeText={(text) => setEmail(text)}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.passwordInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              returnKeyType="done"
              ref={(input) => {
                this.passwordInput = input;
              }}
            />
            <Button
              mode="contained"
              onPress={() => handleLogin(email, password)}
            >
              Đăng nhập
            </Button>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flex: 1, height: 0.5, backgroundColor: "black" }}
              />
              <View>
                <Text style={{ textAlign: "center", paddingHorizontal: 8 }}>
                  hoặc
                </Text>
              </View>
              <View
                style={{ flex: 1, height: 0.5, backgroundColor: "black" }}
              />
            </View>
            <Button
              mode="text"
              onPress={async () => {
                await AsyncStorage.setItem("appLaunched", "true");
                props.navigateTo(AuthenticationScreens.SIGNUP);
              }}
            >
              Đăng ký
            </Button>
            <Portal>
              <Dialog
                visible={isLoading}
                dismissable={false}
                dismissableBackButton={false}
              >
                <Dialog.Content
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={MD3Colors.primary0} />
                  <Text variant="bodyMedium">Đang tải...</Text>
                </Dialog.Content>
              </Dialog>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                dismissable={true}
                dismissableBackButton={true}
              >
                {/* <Dialog.Title>Alert</Dialog.Title> */}
                <Dialog.Content
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text variant="bodyMedium">{text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-end",
    gap: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  viewContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  scrollViewContainer: {
    flex: 1,
  },
});
