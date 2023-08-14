import React, { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, IconButton, MD3Colors, Divider } from "react-native-paper";
import { ScreenProps } from "../MainLayout/MainLayout";
import BookmarksCard from "../Bookmarks/BookmarksCard";
import CoachsCornerCard from "../CoachsCorner/CoachsCornerCard";
import BeltCard from "../Belt/BeltCard";
import JournalEntry from "../TrainingLog/JournalEntry";
import { fakeLogs } from "../TrainingLog/index";
import CoursesCard from "../Systems/CoursesCard";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebase";

export const F_TLV_BLUE = "#9BD5E7";
export const F_TLV_PINK = "#F0A4C7";

export default function HomeScreen({ route, navigation }: ScreenProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const auth = getAuth();

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setIsAuthenticated(!!user && !user.isAnonymous);
    });
    return () => unsubscribe();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
    },
    display: {
      flex: 1,
      padding: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    card: {
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontWeight: "bold",
      marginBottom: 10,
    },
    thumbnailContainer: {
      marginRight: 10,
      alignItems: "center",
    },
    thumbnail: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[F_TLV_BLUE, F_TLV_PINK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.display}>
            {/* <Button
              mode="contained"
              onPress={() => navigation.navigate("Profile")}
            >
              Go to details
            </Button> */}
            <View style={{ marginTop: 10 }}>
              <CoachsCornerCard />
            </View>
            {isAuthenticated && (
              <View style={{ marginTop: 10 }}>
                <JournalEntry
                  log={fakeLogs[0]}
                  isSelected={false}
                  editCB={() => {
                    return;
                  }}
                />
              </View>
            )}
            <View style={{ marginTop: 10 }}>
              <BeltCard />
            </View>
            <View style={{ marginTop: 10 }}>
              <CoursesCard />
            </View>
            <View style={{ marginTop: 10 }}>
              {isAuthenticated && <BookmarksCard />}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
