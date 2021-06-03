import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TabMain from "./Navigation/TabMain";

export default function App() {
  return <TabMain />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
