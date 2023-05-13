import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import {Log} from './index'
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../MainLayout/MainLayout";

interface TrainingLogCardProps {
    log: Log
}
export default function LatestJournalCard({ log }: TrainingLogCardProps) {
  const { title, date, entry } = log;
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const shortEntry = entry.substring(0, 50) + "...";

  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{date}</Paragraph>
        <Paragraph>{shortEntry}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() =>
            navigation.navigate("Log")
          }>Show More</Button>
      </Card.Actions>
    </Card>
  );
}
