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
import { Announcement } from "../../Types/Announcements/AnnouncementsType";
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../MainLayout/MainLayout";
import formatDate from "../../Utils/ISOFormatter";
import HomeCardTitle from "../Home/Components/HomeCardTitle";
import { LinearGradient } from "expo-linear-gradient";
import { F_TLV_BLUE, F_TLV_PINK, isAdmin } from "../MainLayout/index";

interface JournalEntryProps {
  log: Announcement;
  fromJournalPage?: boolean;
  isSelected: boolean;
  editCB: (logID: number) => void;
}
const LeftContent = () => <Avatar.Icon size={25} icon="folder" />;

const AnnouncementEntry = ({
  log,
  fromJournalPage,
  isSelected,
  editCB,
}: JournalEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const theme = useTheme();
  const date = new Date(log.date);

  const handleEditLog = () => {
    editCB(log.id);
  };

  const entryPreview =
    !expanded && log.entry.length > 200
      ? log.entry.substring(0, 150) + "..."
      : log.entry;
  const formattedDate = formatDate(log.date);

  const AnnouncementCard = () => (
    <Card style={{ marginBottom: 4 }}>
      {!fromJournalPage && (
        <HomeCardTitle
          page={isAdmin ? "AdminAnnouncements" : "Announcements"}
          icon={"bullhorn-outline"}
          title={"Coach's Corner"}
        />
      )}
      <View
        style={{
          // marginBottom: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {log.owner === "Gal" ? (
          <Avatar.Image
            size={45}
            source={require("../../../assets/gal_avatar.png")}
          />
        ) : (
            <Avatar.Text size={45}  color='white' style={{backgroundColor: 'blue'}} label="YT" />
        )}
        <View style={{ paddingLeft: 5 }}>
          <Text style={{ fontWeight: "bold" }}>{log.owner}</Text>
          <Text>{date.toDateString()}</Text>
        </View>
      </View>
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
        {/* <Text>{log.entry}</Text> */}
        <ScrollView>
          <Text>{entryPreview}</Text>
          {/* <Text style={{ maxHeight: 225 }}>
            {expanded ? log.entry : log.entry.slice(0, 100) + "..."}
          </Text> */}
        </ScrollView>
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
      <AnnouncementCard />
    </LinearGradient>
  ) : (
    <AnnouncementCard />
  );
};

export default AnnouncementEntry;
