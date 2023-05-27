import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "../../Components/AppBar";
import HomeScreen from "../Home";
import ProfileScreen from "../Profile";
import BeltPage from "../Belt/BeltPage";
import { BeltLevel, SystemType } from "../../Stripe Playlist/index";
import JournalPage from "../TrainingLog/JournalPage";
import AnnouncementsPage from "../CoachsCorner/AnnouncementsPage";
import CoachAdminPage from '../CoachsCorner/AdminOnly/AdminAnnouncementsPage'
import SystemsPage from '../Systems/SystemsPage'

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Belt: { beltPage: BeltLevel };
  Journal: undefined;
  Announcements: undefined;
  AdminAnnouncements: undefined
  Systems: {systemType: SystemType}
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
        <RootStack.Screen name="Belt" component={BeltPage} />
        <RootStack.Screen name="Systems" component={SystemsPage} />
        <RootStack.Screen name="Journal" component={JournalPage} />
        <RootStack.Screen name="Announcements" component={AnnouncementsPage} />
        <RootStack.Screen name="AdminAnnouncements" component={CoachAdminPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
