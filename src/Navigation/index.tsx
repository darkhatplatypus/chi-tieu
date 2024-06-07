import React from "react";
import { Image, StatusBar, View, Text, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { OnboardingContainer } from "@/Screens/Onboarding";
import { RootScreens } from "@/Screens";
import { SearchNavigator } from "./Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootProps } from "@/Screens";
import { AuthenticationNavigator } from "./Authentication";
import SearchBar from "@/Components/SearchBar";
import { DetailsContainer } from "@/Screens/Details";
import DetailScreenAppBar from "@/Components/detailAppBar";
import { EditContainer } from "@/Screens/Edit";
import EditScreenAppBar from "@/Components/editAppBar";
import { useStorageState } from "./useStorageState";
import { AppLaunchContext } from "./AppLaunchContext";
import { AuthenticationContext } from "./AuthenticationContext";

const Stack = createNativeStackNavigator<RootProps>();

const image = require("../../assets/icon.png");

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        gap: 32,
      }}
    >
      {/* <Text>Splash screen loading...</Text> */}
      <Image
        source={image}
        resizeMode="center"
        style={{ width: 100, borderRadius: 100, height: 100 }}
      />
      <ActivityIndicator color="#6750A4" />
    </View>
  );
};

// @refresh reset
const ApplicationNavigator = () => {
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [appLaunched, setAppLaunched] = React.useState<boolean>(false);
  const value = { appLaunched, setAppLaunched };

  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const valueAuth = { authenticated, setAuthenticated };

  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const readLaunchStatus = async () => {
      await AsyncStorage.getItem("appLaunched").then((item) => {
        if (item == "true") {
          setAppLaunched(true);
        }
      });
      await AsyncStorage.getItem("authenticated").then((item) => {
        if (item == "true") {
          setAuthenticated(true);
        }
      });
      // if (launch == "true") {
      //   setAppLaunched(true);
      // }
      setLoading(false);
    };
    readLaunchStatus();
  });

  if (isLoading) return <SplashScreen></SplashScreen>;

  return (
    <AppLaunchContext.Provider value={value}>
      <AuthenticationContext.Provider value={valueAuth}>
        <NavigationContainer>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
            {/* <Stack.Screen
            name={RootScreens.SPLASH}
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          /> */}
            {!appLaunched ? (
              <Stack.Screen
                name={RootScreens.ONBOARDING}
                component={OnboardingContainer}
                options={{ headerShown: false }}
              />
            ) : !authenticated ? (
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
                <Stack.Screen
                  name={RootScreens.DETAILS}
                  component={DetailsContainer}
                  options={{
                    header: (props) => <DetailScreenAppBar {...props} />,
                  }}
                />
                <Stack.Screen
                  name={RootScreens.EDIT}
                  component={EditContainer}
                  options={{
                    header: (props) => <EditScreenAppBar {...props} />,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthenticationContext.Provider>
    </AppLaunchContext.Provider>
  );
};

export { ApplicationNavigator };
