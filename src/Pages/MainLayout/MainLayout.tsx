import React, { useEffect, useState } from "react";
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
import { BeltLevel } from "../../Stripe Playlist/index";
import JournalPage from "../TrainingLog/JournalPage";
import AnnouncementsPage from "../CoachsCorner/AnnouncementsPage";
import CoachAdminPage from "../CoachsCorner/AdminOnly/AdminAnnouncementsPage";
import CoursesCollectionPage from "../Systems/CoursesCollectionPage";
import AuthModal from "../../Auth/AuthModal";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Belt: { beltPage: BeltLevel };
  Journal: undefined;
  Announcements: undefined;
  AdminAnnouncements: undefined;
  Courses: { style: "gi" | "nogi" };
};

export type ScreenProps = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
export default function MainLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setShowModal(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const hideModal = () => setShowModal(false);

  const signUpSuccess = () => {
    alert("success!");
  };

  const handleUserLogin = () => {
    setShowModal(true)
  }
   
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <AppBar {...props} handleUserLogin={handleUserLogin}/>,
        }}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="Belt" component={BeltPage} />
        <RootStack.Screen name="Courses" component={CoursesCollectionPage} />
        <RootStack.Screen name="Journal" component={JournalPage} />
        <RootStack.Screen name="Announcements" component={AnnouncementsPage} />
        <RootStack.Screen
          name="AdminAnnouncements"
          component={CoachAdminPage}
        />
      </RootStack.Navigator>
      <AuthModal
        visible={showModal}
        hideModal={hideModal}
        signUpSuccess={signUpSuccess}
      />
    </NavigationContainer>
  );
}
