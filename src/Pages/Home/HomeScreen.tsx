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

const F_TLV_BLUE = "#9BD5E7";
const F_TLV_PINK = "#F0A4C7";

export default function HomeScreen({ route, navigation }: ScreenProps) {
  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
    },
    display: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={style.container}>
      <LinearGradient
        colors={[F_TLV_BLUE, F_TLV_PINK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={style.gradient}
      >
        <View style={style.display}>
          <Text>Home Screen</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Profile")}
          >
            Go to details
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
}
