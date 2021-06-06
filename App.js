import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TabMain from "./Navigation/TabMain";
import Toast from "react-native-toast-message";
import store from "./store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <TabMain />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
