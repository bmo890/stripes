import { StyleSheet, SafeAreaView, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import MainLayout from "./src/Pages/MainLayout";
import React from "react";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <MainLayout />
      </PaperProvider>
    </SafeAreaView>
  );
}
