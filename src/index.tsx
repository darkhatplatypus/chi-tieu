import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { NativeBaseProvider } from "native-base";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen } from "./Screens/SplashScreen";

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

export default function App() {
  NavigationBar.setBackgroundColorAsync("white");
  NavigationBar.setButtonStyleAsync("dark");
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
