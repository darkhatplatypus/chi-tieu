import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const FloatingActionButton = () => (
  <FAB
    icon="plus"
    size="medium"
    style={styles.fab}
    // mode="flat"
    onPress={() => console.log("Pressed")}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 84,
    elevation: 5,
  },
});

export default FloatingActionButton;
