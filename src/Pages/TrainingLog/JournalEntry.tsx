import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Vibration } from "react-native";
import {
  Card,
  Chip,
  Button,
  IconButton,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { Log } from "../../Types/Logs/LogsType";
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
  highlightText?: string;
}

const JournalEntry = ({
  log,
  fromJournalPage,
  isSelected,
  editCB,
  highlightText,
}: JournalEntryProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleEditLog = () => {
    editCB(log.id);
  };

  useEffect(() => {
    if (
      highlightText &&
      !log.entry
        .substring(0, 200)
        .toLowerCase()
        .includes(highlightText.toLowerCase())
    ) {
      setExpanded(true);
    } else if (log.entry.length <= 300) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [highlightText, log.entry]);

  const entryPreview = useMemo(() => {
    const text =
      expanded || log.entry.length <= 300
        ? log.entry
        : log.entry.substring(0, 200) + "...";

    if (highlightText) {
      const parts = text.split(new RegExp(`(${highlightText})`, "gi"));
      return parts.map((part, i) =>
        part.toLowerCase() === highlightText.toLowerCase() ? (
          <Text key={i} style={{ backgroundColor: "yellow" }}>
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        )
      );
    }
    return text;
  }, [log.entry, highlightText, expanded]);
  const formattedDate = formatDate(log.date);

  const JournalCard = () => (
    <Card style={{ marginBottom: 4 }}>
      {!fromJournalPage && (
        <HomeCardTitle
          page={"Journal"}
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
        {log.entry.length > 200 && (
          <Button onPress={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : "Show More"}
          </Button>
        )}
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
