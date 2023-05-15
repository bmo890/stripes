import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Card, List, Text, useTheme, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../../MainLayout/MainLayout";

interface JournalEntryProps {
  page: "Log" | "Coach";
  icon: string;
  title: string;
}

const HomeCardTitle = ({ page, icon, title }: JournalEntryProps) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const theme = useTheme();

  return (
    <Pressable onPress={() => navigation.navigate(page)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <List.Icon icon={icon} />
          <Text style={{ marginLeft: 2, fontWeight: "bold" }}>{title}</Text>
        </View>
        <List.Icon icon={"chevron-right"} />
      </View>
      <Divider />
    </Pressable>
  );
};

export default HomeCardTitle;
