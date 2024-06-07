import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootScreens } from "@/Screens";

export default function DetailScreenAppBar({ route, navigation }) {
  const { item } = route.params;
  const options =
    item == "Spending"
      ? {
          mode: "Edit",
          item: "Spending",
        }
      : {
          mode: "Edit",
          item: "Saving",
        };
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content title="Chi tiết" />
      {/* <Appbar.Content title={item} /> */}
      <Appbar.Action
        icon="pencil"
        onPress={() => {
          navigation.navigate(RootScreens.EDIT, options);
        }}
      />
      <Appbar.Action icon="delete" onPress={() => {}} />
    </Appbar.Header>
  );
}
