import React, { useState } from "react";
import { View, ScrollView, Pressable, Vibration } from "react-native";
import {
  Avatar,
  Card,
  Chip,
  Button,
  IconButton,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { Log } from "./index";
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../MainLayout/MainLayout";
import formatDate from "../../Utils/ISOFormatter";
import HomeCardTitle from "../Home/Components/HomeCardTitle";
import { LinearGradient } from "expo-linear-gradient";
import { F_TLV_BLUE, F_TLV_PINK } from "../MainLayout/index";

interface JournalEntryProps {
  log: Log;
  fromJournalPage?: boolean;
  isSelected: boolean;
  editCB: (logID: number) => void;
}
const LeftContent = () => <Avatar.Icon size={25} icon="folder" />;

const JournalEntry = ({
  log,
  fromJournalPage,
  isSelected,
  editCB,
}: JournalEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const theme = useTheme();

  const handleEditLog = () => {
    editCB(log.id);
  };

  const entryPreview =
    !expanded && log.entry.length > 200
      ? log.entry.substring(0, 200) + "..."
      : log.entry;
  const formattedDate = formatDate(log.date);

  const JournalCard = () => (
    <Card style={{ marginBottom: 4 }}>
      {!fromJournalPage && (
        <HomeCardTitle
          page={"Log"}
          icon={"book-open"}
          title={"Training Journal"}
        />
      )}
      <Card.Title
        subtitleStyle={{ fontStyle: "italic" }}
        titleStyle={{ minHeight: 0, fontWeight: "bold" }}
        style={{ minHeight: 0, paddingLeft: 10, paddingTop: 5 }}
        title={log.title ? log.title : formattedDate}
        right={(props) => {
          return !fromJournalPage ? null : (
            <IconButton
              {...props}
              icon="pencil-outline"
              onPress={() => {
                Vibration.vibrate(10);
                handleEditLog();
              }}
            />
          );
        }}
        subtitle={log.title.length > 0 ? formattedDate : " "}
      />
      <Card.Content>
        {log.tags.length > 0 && (
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <List.Icon icon="tag-multiple-outline" />
            <ScrollView horizontal style={{ flexDirection: "row" }}>
              {log.tags.map((tag, index) => (
                <Chip key={index} style={{ marginLeft: 2 }}>
                  {tag}
                </Chip>
              ))}
            </ScrollView>
          </View>
        )}
        <Text>{entryPreview}</Text>
        <Button onPress={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </Card.Content>
    </Card>
  );
  return isSelected ? (
    <LinearGradient
      colors={[F_TLV_BLUE, F_TLV_PINK]}
      style={{ borderRadius: 15, padding: 5 }}
    >
      <JournalCard />
    </LinearGradient>
  ) : (
    <JournalCard />
  );
};

export default JournalEntry;
