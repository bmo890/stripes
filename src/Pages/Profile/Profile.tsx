import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "../../Components/AppBar";
import { Button } from "react-native-paper";
import { ScreenProps } from "../MainLayout/MainLayout";

export default function ProfileScreen({ route, navigation }: ScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        mode="contained"
        style={{ backgroundColor: "blue" }}
        // onPress={() => navigation.navigate("Home")}
        onPress={() => navigation.goBack()}
      >
        Go Home
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid red",
    height: "100%",
  },
});
