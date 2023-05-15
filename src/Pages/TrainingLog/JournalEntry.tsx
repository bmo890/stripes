import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
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

interface JournalEntryProps {
  log: Log;
  fromJournalPage?: boolean;
}
const LeftContent = () => <Avatar.Icon size={25} icon="folder" />;

const JournalEntry = ({ log, fromJournalPage }: JournalEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const theme = useTheme();

  const entryPreview =
    !expanded && log.entry.length > 50
      ? log.entry.substring(0, 50) + "..."
      : log.entry;
  const formattedDate = formatDate(log.date);
  return (
    <Card>
      {!fromJournalPage && (
        <HomeCardTitle
          page={"Log"}
          icon={"book-open"}
          title={"Training Journal"}
        />
      )}
      <Card.Title
      subtitleStyle={{fontStyle: 'italic'}}
        titleStyle={{ minHeight: 0, fontWeight: "bold" }}
        style={{ minHeight: 0, paddingLeft: 10, paddingTop: 5}}
        title={log.title ? log.title : formattedDate}
        right={(props) => {
          return !fromJournalPage ? null : (
            <IconButton
              {...props}
              icon="pencil-outline"
              onPress={() => setEditing(true)}
            />
          );
        }}
        subtitle={log.title.length > 0 ? formattedDate : ""}
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
};

export default JournalEntry;
