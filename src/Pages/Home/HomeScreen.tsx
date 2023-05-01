import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBar from "../../Components/AppBar";
import { Button, Card, Text, Menu, Surface, List } from "react-native-paper";
import { ScreenProps } from "../MainLayout/MainLayout";
import BookmarksCard from "../Bookmarks/BookmarksCard";
import CoachsCornerCard from "../CoachsCorner/CoachsCornerCard";

const F_TLV_BLUE = "#9BD5E7";
const F_TLV_PINK = "#F0A4C7";

export default function HomeScreen({ route, navigation }: ScreenProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      // flex: 1,
    },
    display: {
      borderColor: "red",
      borderWidth: 1,
      flex: 1,
      padding: ".5rem",
      // alignItems: "center",
      // justifyContent: "center",
      // padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    card: {
      padding: 8,
      // height: 80,
      // width: '100%',
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
        <View style={styles.display}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Profile")}
          >
            Go to details
          </Button>
          <View style={{ marginTop: 10 }}>
            <CoachsCornerCard />
          </View>
          <View style={{ marginTop: 10 }}>
            <BookmarksCard />
          </View>
          <View style={{ marginTop: 10 }}>
            <Card>
              <Card.Title
                title="Chat"
                // left={LeftContent}
              />
              <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
              <Card.Cover
                style={{ padding: 5 }}
                source={{ uri: "https://picsum.photos/702" }}
              />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
