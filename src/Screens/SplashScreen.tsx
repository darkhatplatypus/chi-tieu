import React from "react";
import { ImageBackground, View } from "react-native";
export const SplashScreen = () => {
  const image = require("../../assets/splash.png");
  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <ImageBackground source={image} resizeMode="cover"></ImageBackground>
    </View>
  );
};
