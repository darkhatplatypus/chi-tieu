import React from "react";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { OverviewContainer } from "@/Screens/Overview";
import { AnalyticsContainer } from "@/Screens/Analytics";
import { HistoryContainer } from "@/Screens/History";
import { SavingsContainer } from "@/Screens/Savings";
import { BottomTabRouteProps, BottomTabScreens } from "@/Screens";

const Tab = createBottomTabNavigator<BottomTabRouteProps>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Portal.Host>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;
              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name={BottomTabScreens.OVERVIEW}
          component={OverviewContainer}
          options={{
            title: "Tổng quan",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name={BottomTabScreens.HISTORY}
          component={HistoryContainer}
          options={{
            title: "Lịch sử",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="history" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name={BottomTabScreens.SAVINGS}
          component={SavingsContainer}
          options={{
            title: "Tiết kiệm",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="cart" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name={BottomTabScreens.ANALYTICS}
          component={AnalyticsContainer}
          options={{
            title: "Thống kê",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="chart-box" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </Portal.Host>
  );
};
