import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { RootScreens } from "..";
import {
  TextInput,
  Text,
  Button,
  PaperProvider,
  Dialog,
  Portal,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useAddTransactionMutation } from "@/Services";
import { MD3Colors } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import {
  useLazyGetAmountAllQuery,
  useLazyGetAllTransactionsQuery,
  useLazyGetAmountThisMonthQuery,
} from "@/Services";

interface EditScreenProps {}

export const EditScreen = ({ route, navigation }) => {
  const { mode, item } = route.params;
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [saved, setSaved] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [notes, setNotes] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [submit, { isLoading }] = useAddTransactionMutation();
  const [fetchAmount, AMOUNT] = useLazyGetAmountAllQuery();
  const [fetchTransactions, TRANSACTIONS] = useLazyGetAllTransactionsQuery();
  const [fetchThisMonth, MONTH] = useLazyGetAmountThisMonthQuery();

  const handleSubmit = async (name, category, price, date, notes) => {
    // console.log("submit");
    if (!name || !category || !price || !date) {
      setText("Vui lòng điền đầy đủ thông tin.");
      showDialog();
      return;
    }
    // showDialog()
    const wallet = SecureStore.getItem("wallet");
    submit({
      wallet: wallet,
      amount: price,
      title: name,
      category: category,
      detail: notes,
      createdTime: date,
    })
      .finally((res) => {
        // console.log(res, wallet, price, name, category, notes, date);
        fetchAmount().refetch();
        fetchTransactions().refetch();
        fetchThisMonth().refetch();
        navigation.goBack();
      })
      .catch(() => {
        setText("Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút.");
        showDialog();
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <PaperProvider>
      <View style={styles.viewContainer}>
        <StatusBar style="auto" />
        {item == "Spending" ? (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <TextInput
              mode="outlined"
              label={"Tên"}
              value={name}
              autoFocus={true}
              onChangeText={(text) => setName(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.categoryInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Phân loại"
              value={category}
              onChangeText={(text) => setCategory(text)}
              returnKeyType="next"
              ref={(input: any) => {
                this.categoryInput = input;
              }}
              onSubmitEditing={() => {
                this.priceInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Giá"
              right={<TextInput.Affix text="₫" />}
              value={Number(price).toLocaleString("vi-VN")}
              inputMode="numeric"
              onChangeText={(text) => {
                setPrice(Number(text.replaceAll(".", "")));
              }}
              returnKeyType="next"
              ref={(input: any) => {
                this.priceInput = input;
              }}
              onSubmitEditing={showDatepicker}
              blurOnSubmit={false}
            />
            <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>
              <TextInput
                mode="outlined"
                label="Ngày"
                showSoftInputOnFocus={false}
                value={date.toLocaleDateString("vi-VN", {
                  weekday: "narrow",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                inputMode="numeric"
                onChangeText={(text) => setDate(text)}
                returnKeyType="next"
                ref={(input) => {
                  this.dateInput = input;
                }}
                onSubmitEditing={() => {
                  this.notesInput.focus();
                }}
                style={{ flexGrow: 1 }}
                right={
                  <TextInput.Icon icon="calendar" onPress={showDatepicker} />
                }
                editable={false}
              />
              <TextInput
                mode="outlined"
                label="Thời gian"
                showSoftInputOnFocus={false}
                value={date.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                inputMode="numeric"
                onChangeText={(text) => setTime(text)}
                returnKeyType="next"
                ref={(input) => {
                  this.dateInput = input;
                }}
                onSubmitEditing={() => {
                  this.notesInput.focus();
                }}
                style={{ flexBasis: "40%" }}
                right={
                  <TextInput.Icon
                    icon="clock-outline"
                    onPress={showTimepicker}
                  />
                }
                editable={false}
              />
            </View>
            <TextInput
              mode="outlined"
              label="Ghi chú"
              value={notes}
              onChangeText={(text) => setNotes(text)}
              returnKeyType="done"
              multiline={true}
              numberOfLines={5}
              ref={(input) => {
                this.notesInput = input;
              }}
            />
            <Button
              onPress={() => handleSubmit(name, category, price, date, notes)}
            >
              Lưu
            </Button>
            <Portal>
              <Dialog
                visible={isLoading}
                dismissable={false}
                dismissableBackButton={false}
              >
                <Dialog.Content
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={MD3Colors.primary0} />
                  <Text variant="bodyMedium">Đang tải...</Text>
                </Dialog.Content>
              </Dialog>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                dismissable={true}
                dismissableBackButton={true}
              >
                {/* <Dialog.Title>Alert</Dialog.Title> */}
                <Dialog.Content
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text variant="bodyMedium">{text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <TextInput
              mode="outlined"
              label={"Tên"}
              value={name}
              autoFocus={true}
              onChangeText={(text) => setName(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.priceInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Giá"
              right={<TextInput.Affix text="₫" />}
              value={Number(price).toLocaleString("vi-VN")}
              inputMode="numeric"
              onChangeText={(text) => {
                setPrice(Number(text.replaceAll(".", "")));
              }}
              returnKeyType="next"
              ref={(input: any) => {
                this.priceInput = input;
              }}
              onSubmitEditing={() => {
                this.savedInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Đã tiết kiệm"
              right={<TextInput.Affix text="₫" />}
              value={Number(saved).toLocaleString("vi-VN")}
              inputMode="numeric"
              onChangeText={(text) => {
                setSaved(Number(text.replaceAll(".", "")));
              }}
              returnKeyType="next"
              ref={(input: any) => {
                this.savedInput = input;
              }}
              onSubmitEditing={() => {
                this.notesInput.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              mode="outlined"
              label="Ghi chú"
              value={notes}
              onChangeText={(text) => setNotes(text)}
              returnKeyType="done"
              multiline={true}
              numberOfLines={5}
              ref={(input) => {
                this.notesInput = input;
              }}
            />
            <Button
              onPress={() => handleSubmit(name, category, price, date, notes)}
            >
              Lưu
            </Button>
            <Portal>
              <Dialog
                visible={isLoading}
                dismissable={false}
                dismissableBackButton={false}
              >
                <Dialog.Content
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={MD3Colors.primary0} />
                  <Text variant="bodyMedium">Đang tải...</Text>
                </Dialog.Content>
              </Dialog>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                dismissable={true}
                dismissableBackButton={true}
              >
                {/* <Dialog.Title>Alert</Dialog.Title> */}
                <Dialog.Content
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text variant="bodyMedium">{text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
        )}
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
    minWidth: "100%",
    gap: 16,
  },
});
