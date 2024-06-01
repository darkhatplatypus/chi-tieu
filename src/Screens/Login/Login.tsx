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
import { HStack, Spinner, Heading, Row } from "native-base";
import { User } from "@/Services";
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

export const Login = (props: {
  replace: (string: RootScreens) => void;
  navigateTo: (string: AuthenticationScreens) => void;
}) => {
  const image = require("../../../assets/onboard-bg-1.png");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
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
              // onPress={async () => {
              //   await AsyncStorage.setItem("appLaunched", "true");
              //   props.replace(RootScreens.MAIN);
              // }}
              onPress={showDialog}
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
                visible={visible}
                onDismiss={hideDialog}
                dismissable={false}
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
                  <ActivityIndicator size="large" color={MD3Colors.primary0} />
                  <Text variant="bodyMedium">This is a simple dialog</Text>
                </Dialog.Content>
                {/* <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions> */}
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
