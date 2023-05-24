import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Card, List, Text, useTheme, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../../MainLayout/MainLayout";

interface HomeCardTitleProps {
  page: "Journal" | "Announcements" | "AdminAnnouncements";
  icon: string;
  title: string;
}

const HomeCardTitle = ({ page, icon, title }: HomeCardTitleProps) => {
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
          backgroundColor: theme.colors.elevation.level3,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
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
