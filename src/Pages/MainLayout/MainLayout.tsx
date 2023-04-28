import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "../../Components/AppBar";
import HomeScreen from "../Home";
import ProfileScreen from "../Profile";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type ScreenProps = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function MainLayout() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
