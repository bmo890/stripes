import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
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
import {auth, db} from '../../../firebase'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Belt: { beltPage: BeltLevel };
  Journal: undefined;
  Announcements: undefined;
  AdminAnnouncements: undefined;
  Courses: { style: "gi" | "nogi" };
};

type AppUser = {
  auth: User;
  email: string;
  role: string;
  uid: string;
  teamID: number;
  username: string;
}

export type ScreenProps = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
export default function MainLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // const auth = getAuth(app);


  // const storeData = async (value: string) => {
  //   try {
  //     await AsyncStorage.setItem("@user", value);
  //   } catch (e) {
  //     console.log("error saving to async storage", e);
  //   }
  // };

  // const retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@user");
  //     if (value !== null) {
  //       // value previously stored
  //       const userData = JSON.parse(value);
  //       setUser(userData); // Set your state here
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log("error reading from async storage", e);
  //   }
  // };

  // useEffect(() => {
  //   retrieveData();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(auth)
      console.log(user)
      if (user) {
        // Here you're setting the user state and storing it in AsyncStorage when the user logs in
        setUser(user);
        // storeData(JSON.stringify(user));
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

  const isAdmin = true


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
        <RootStack.Screen name="Announcements" component={!isAdmin ? AnnouncementsPage : CoachAdminPage} />
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
