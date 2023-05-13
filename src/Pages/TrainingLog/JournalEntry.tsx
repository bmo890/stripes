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
} from "react-native-paper";
import { Log } from "./index";
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../MainLayout/MainLayout";
import formatDate from "../../Utils/ISOFormatter";

interface JournalEntryProps {
  log: Log;
  fromJournalPage?: boolean;
}
const LeftContent = () => <Avatar.Icon size={25} icon="folder" />;

const JournalEntry: React.FC<JournalEntryProps> = ({
  log,
  fromJournalPage,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigation = useNavigation<ScreenProps["navigation"]>();

  const entryPreview =
    !expanded && log.entry.length > 50
      ? log.entry.substring(0, 50) + "..."
      : log.entry;
  const formattedDate = formatDate(log.date);
  return (
    <Card>
      <Card.Title
        title={
          <View>
            {!fromJournalPage && (
              <Pressable onPress={() => navigation.navigate("Log")}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <List.Icon icon="book-open" />
                  <Text style={{ marginLeft: 2, fontWeight: "bold" }}>
                    Training Journal
                  </Text>
                </View>
              </Pressable>
            )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{log.title ? log.title : formattedDate}</Text>
              </View>
            </View>
          </View>
        }
        right={(props) => {
          return !fromJournalPage ?(
            <IconButton
              {...props}
              icon="chevron-right"
              onPress={() => navigation.navigate("Log")}
            />
          ) : (
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
          <View style={{ flexDirection: "row", marginBottom: 2 }}>
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
