import React from "react";
import { Appbar, Button, Text } from "react-native-paper";
import { RootScreens } from "@/Screens";

export default function EditScreenAppBar({ route, navigation }) {
  const { mode, item } = route.params;
  let title;
  if (mode == "Add") {
    if (item == "Spending") {
      title = "Thêm chi tiêu";
    } else {
      title = "Thêm tiết kiệm";
    }
  } else {
    if (item == "Spending") {
      title = "Sửa chi tiêu";
    } else {
      title = "Sửa tiết kiệm";
    }
  }
  return (
    <Appbar.Header>
      <Appbar.Action icon="close" onPress={navigation.goBack} />
      <Appbar.Content title={title} />
      {/* <Appbar.Action
        icon="check"
        onPress={() => {
          navigation.goBack();
        }}
      /> */}
      {/* <Button
        onPress={() => {
          navigation.goBack();
        }}
      >
        Lưu
      </Button> */}
    </Appbar.Header>
  );
}
