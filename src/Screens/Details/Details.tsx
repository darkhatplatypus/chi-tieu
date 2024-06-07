import Onboarding from "react-native-onboarding-swiper";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useTransition } from "react";
import { RootScreens } from "..";
import {
  Button,
  Text,
  FAB,
  Divider,
  List,
  IconButton,
  Switch,
  Snackbar,
  Portal,
  Dialog,
  PaperProvider,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { MD3Colors } from "react-native-paper";
import { useLazyGetTransactionQuery, useLazyGetSavingQuery } from "@/Services";
import { useNavigation } from "@react-navigation/native";

interface DetailScreenProps {
  id: string;
  item: string;
}

export const DetailsScreen = ({ params, navigation }) => {
  // const { id, item } = props;
  const [isLoading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const { id, item } = params;
  const [fetchTransaction, transaction] = useLazyGetTransactionQuery();
  const [fetchSaving, saving] = useLazyGetSavingQuery();
  React.useEffect(() => {
    // console.log(id)
    if (item == "Transaction") {
      fetchTransaction(id)
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
    } else if (item == "Saving") {
      // console.log(id, item)
      fetchSaving(id)
        .unwrap()
        .finally(() => setLoading(false));
    }
  }, []);
  if (isLoading) {
    return (
      <View
        style={{
          padding: 16,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 16,
        }}
      >
        <ActivityIndicator size="large" color={MD3Colors.primary0} />
        <Text variant="bodyMedium">Đang tải...</Text>
      </View>
    );
  }
  if (item == "Transaction") {
    return (
      <PaperProvider>
        <View style={styles.viewContainer}>
          <StatusBar style="auto" />
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text variant="titleLarge">
              {transaction.data?.transaction.title}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text variant="titleMedium">
                {transaction.data?.transaction.category}
              </Text>
              <Text variant="titleMedium">
                {Number(transaction.data?.transaction.amount).toLocaleString(
                  "vi-VN"
                )}{" "}
                ₫
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "column", gap: 12 }}>
              <Text variant="titleMedium">Thời gian</Text>
              <Text variant="bodyLarge">
                {new Date(
                  transaction.data?.transaction.createdTime
                ).toLocaleString("vi-VN")}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "column", gap: 12 }}>
              <Text variant="titleMedium">Ghi chú</Text>
              <Text variant="bodyLarge">
                {transaction.data?.transaction.detail}
              </Text>
            </View>
          </ScrollView>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">This is simple dialog</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
    );
  }
  return (
    <PaperProvider>
      <View style={styles.viewContainer}>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text variant="titleLarge">{saving.data?.saving.title}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text variant="titleMedium">{saving.data?.saving.category}</Text>
            <Text variant="titleMedium">
              {Number(saving.data?.saving.amount).toLocaleString(
                "vi-VN"
              )}{" "}
              ₫
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", gap: 12 }}>
            <Text variant="titleMedium">Đã tiết kiệm được</Text>
            <Text variant="bodyLarge">{Number(saving.data?.saving.saved_amount).toLocaleString(
                "vi-VN"
              )}{" "}
              ₫</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", gap: 12 }}>
            <Text variant="titleMedium">Ghi chú</Text>
            <Text variant="bodyLarge">{saving.data?.saving.detail}</Text>
          </View>
        </ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    flexGrow: 0,
    paddingVertical: 16,
    paddingBottom: 80,
    minWidth: "100%",
    gap: 16,
  },
});
