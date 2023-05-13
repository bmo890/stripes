import React from "react";
import { Text, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import {Log} from './index'


interface JournalEntryProps {
  log: Log;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ log }) => {
  const entryPreview =
    log.entry.length > 50 ? log.entry.substring(0, 50) + "..." : log.entry;

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={log.title} />
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          {log.tags.map((tag, index) => (
            <Chip key={index}>{tag}</Chip>
          ))}
        </View>
        <Text>{entryPreview}</Text>
      </Card.Content>
    </Card>
  );
};

export default JournalEntry;
