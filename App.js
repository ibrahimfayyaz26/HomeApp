import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TabMain from "./Navigation/TabMain";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <View>
      <TabMain />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
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
