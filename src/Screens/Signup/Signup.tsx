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
import { HStack, Spinner, Heading } from "native-base";
import { useCreateWalletMutation, useLoginMutation, User } from "@/Services";
import {
  Button,
  Text,
  Snackbar,
  TextInput,
  PaperProvider,
  Portal,
  MD3Colors,
  Dialog,
} from "react-native-paper";
import { RootScreens } from "..";
import { useRegisterMutation } from "@/Services";
import * as SecureStore from "expo-secure-store";
import { AuthenticationContext } from "@/Navigation/AuthenticationContext";

export const Signup = (props: {
  replace: (string: RootScreens) => void;
  navigateTo: (string: RootScreens) => void;
  back: () => void;
}) => {
  const image = require("../../../assets/onboard-bg-1.png");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [signup, { data, status, error, isLoading }] = useRegisterMutation();
  const [login, loginResponse] = useLoginMutation();
  const [createWallet, createWalletResponse] = useCreateWalletMutation();
  const { authenticated, setAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const handleSignup = async (
    email: string,
    name: string,
    password: string,
    phoneNumber: string
  ) => {
    if (!email || !name || !password || !phoneNumber) {
      setText(
        "Email, tên, mật khẩu và số điện thoại không được để trống. Vui lòng điền đầy đủ thông tin và thử lại."
      );
      showDialog();
      return;
    }
    try {
      // console.log("started query");
      const signupResponse = await signup({
        email,
        name,
        password,
        phoneNumber,
      });
      const loginResponse = await login({ email, password })
        .unwrap()
        .then((res) => {
          console.log(res);
          SecureStore.setItem("token", res.token);
        });
      const responseCreateWallet = await createWallet()
        .unwrap()
        .then((res) => {
          console.log(res);
          SecureStore.setItem("wallet", res._id);
        });
      Promise.all([loginResponse, responseCreateWallet, signupResponse]).then(
        () => {
          setAuthenticated(true);
        }
      );
      // console.log(response);
    } catch (err) {
      console.log(err);
      setText("Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút.");
      showDialog();
    }
  };
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
            <Text variant="displaySmall">Đăng ký</Text>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              inputMode="email"
              autoFocus={true}
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.nameInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Tên"
              value={name}
              onChangeText={(text) => setName(text)}
              returnKeyType="next"
              ref={(input) => {
                this.nameInput = input;
              }}
              onSubmitEditing={() => {
                this.passwordInputSignup.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Mật khẩu"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              returnKeyType="next"
              ref={(input) => {
                this.passwordInputSignup = input;
              }}
              onSubmitEditing={() => {
                this.phoneInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Số điện thoại"
              value={phoneNumber}
              inputMode="numeric"
              onChangeText={(text) => setPhoneNumber(text)}
              returnKeyType="done"
              ref={(input) => {
                this.phoneInput = input;
              }}
            />
            <Button
              mode="contained"
              // onPress={async () => {
              //   await AsyncStorage.setItem("appLaunched", "true");
              //   props.replace(RootScreens.MAIN);
              // }}
              onPress={() => handleSignup(email, name, password, phoneNumber)}
            >
              Đăng ký
            </Button>
            <Button
              mode="text"
              onPress={async () => {
                props.back();
              }}
            >
              Quay lại
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
    paddingBottom: 16,
    gap: 16,
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
