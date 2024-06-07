import { Savings } from "./Savings";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootProps } from "..";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AnimatedFAB } from "react-native-paper";
import { MD3Colors } from "react-native-paper";

type MainScreenNavigatorProps = NativeStackScreenProps<
  RootProps,
  RootScreens.MAIN
>;

export const SavingsContainer = ({navigation}) => {
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  const FirstRoute = () => (
    <Savings data={data} isLoading={isLoading} onScroll={onScroll} isCompleted={false} />
  );
  const SecondRoute = () => (
    <Savings data={data} isLoading={isLoading} onScroll={onScroll} isCompleted={true} />
  );
  const renderScene = SceneMap({
    ongoing: FirstRoute,
    completed: SecondRoute,
  });

  const [userId, setUserId] = useState("9");
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "ongoing", title: "Hiện tại" },
    { key: "completed", title: "Đã hoàn thành" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: "white" }}
      indicatorStyle={{ backgroundColor: MD3Colors.primary40 }}
      activeColor="#1D1B20"
      inactiveColor="#49454F"
      labelStyle={{ textTransform: "none" }}
    />
  );
  const [isExtended, setIsExtended] = React.useState(true);
  // return <Savings data={data} isLoading={isLoading} />;
  // return (
  //   <SavingsTab.Navigator
  //     screenOptions={{
  //       tabBarIndicatorStyle: { backgroundColor: MD3Colors.primary40 },
  //     }}
  //   >
  //     <SavingsTab.Screen name="Hiện tại" component={Savings} />
  //     <SavingsTab.Screen name="Đã hoàn thành" component={Savings} />
  //   </SavingsTab.Navigator>
  // );
  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Thêm tiết kiệm"}
        extended={true}
        onPress={() =>
          navigation.navigate(RootScreens.EDIT, {
            mode: "Add",
            item: "Saving",
          })
        }
        animateFrom={"right"}
        style={{ position: "absolute", margin: 16, bottom: 0, right: 0 }}
      />
    </View>
  );
};
