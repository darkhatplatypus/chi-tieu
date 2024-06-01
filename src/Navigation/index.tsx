import React from "react";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { OnboardingContainer } from "@/Screens/Onboarding";
import { RootScreens } from "@/Screens";
import { SearchNavigator } from "./Search";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootProps } from "@/Screens";
import { createContext } from "react";
import { AuthenticationNavigator } from "./Authentication";
import SearchBar from "@/Components/SearchBar";
import FloatingActionButton from "@/Components/fab";

const Stack = createNativeStackNavigator<RootProps>();

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Splash screen loading...</Text> */}
      <ActivityIndicator />
    </View>
  );
};

export const LaunchContext = React.createContext();

// @refresh reset
const ApplicationNavigator = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [appLaunched, setAppLaunched] = React.useState<boolean | null>(null);
  const [user, setUser] = React.useState<boolean | null>(null);
  const getLaunchState = async () => {
    const launched = await AsyncStorage.getItem("appLaunched");
    if (launched === "true") {
      setAppLaunched(true);
    } else {
      setAppLaunched(false);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    getLaunchState();
  });
  // if (isLoading) {
  //   return <SplashScreen />;
  // }
  const launchContext = React.useMemo(
    () => ({
      launch: () => {
        getLaunchState();
      },
    }),
    []
  );
  return (
    <LaunchContext.Provider value={launchContext}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          {/* {appLaunched != null ? (
            <Stack.Screen
              name={RootScreens.ONBOARDING}
              component={OnboardingContainer}
              options={{ headerShown: false }}
            />
          ) : user != null ? (
            <Stack.Screen
              name={RootScreens.AUTHENTICATION}
              component={AuthenticationNavigator}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name={RootScreens.MAIN}
                component={MainNavigator}
                options={{
                  headerTitle: () => <SearchBar />,
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name={RootScreens.SEARCH}
                component={SearchNavigator}
                options={{
                  headerTitle: () => <SearchBar />,
                  headerShadowVisible: false,
                  headerBackVisible: false,
                }}
              />
            </>
          )} */}
          <Stack.Screen
            name={RootScreens.MAIN}
            component={MainNavigator}
            options={{
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginRight: 32,
                  }}
                >
                  <SearchBar />
                </View>
              ),
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FloatingActionButton></FloatingActionButton>
    </LaunchContext.Provider>
  );
};

export { ApplicationNavigator };
