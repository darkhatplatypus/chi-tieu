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
import { User } from "@/Services";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
              label="Name"
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
              label="Password"
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
              label="Phone number"
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
              onPress={showDialog}
            >
              Đăng ký
            </Button>
            <Button
              mode="text"
              onPress={async () => {
                await AsyncStorage.setItem("appLaunched", "true");
                props.back();
              }}
            >
              Quay lại
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
