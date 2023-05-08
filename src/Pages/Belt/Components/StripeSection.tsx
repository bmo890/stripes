import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme, Title, Card } from "react-native-paper";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Collapsible from "react-native-collapsible";
import { Stripe, Section, VideoType } from "../../../Stripe Playlist/index";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal/VideoModal";

interface StripeSectionProps {
  stripe: Stripe;
}

const StripeSection = ({ stripe }: StripeSectionProps) => {
  const initialExpandedSections = stripe.sections.map((stripe, index) => index);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | false>(false);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();

  const [collapsedSections, setCollapsedSections] = useState<number[]>(
    initialExpandedSections
  );

  const toggleSection = (sectionIndex: number) => {
    if (collapsedSections.includes(sectionIndex)) {
      setCollapsedSections(collapsedSections.filter((i) => i !== sectionIndex));
    } else {
      setCollapsedSections([...collapsedSections, sectionIndex]);
    }
  };

  const openModalCB = (video: VideoType) => {
    setSelectedVideo(video);
    setOpenModal(true);
  };

  return (
    <ScrollView>
      {stripe.sections.map((section: Section, index: number) => (
        <View key={section.index} style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} onPress={() => toggleSection(index)}>
              {section.nameEN}
            </Text>
            <MaterialIcons
              name={
                collapsedSections.includes(index)
                  ? "expand-less"
                  : "expand-more"
              }
              size={24}
              onPress={() => toggleSection(index)}
            />
          </View>
          <Collapsible collapsed={!collapsedSections.includes(index)}>
            <FlatList
              data={section.playlist}
              renderItem={({ item }) => (
                <VideoCard video={item} modalCB={openModalCB} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
            />
          </Collapsible>
        </View>
      ))}
      <VideoModal
        visible={openModal}
        selectedVideo={selectedVideo}
        closeCB={() => setSelectedVideo(false)}
      />
    </ScrollView>
  );
};

export default StripeSection;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#f0f0f0",
    // backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    // marginBottom: 10,
  },
  titleContainer: {
    // backgroundColor: "#f0f0f0", // Change this to your preferred background color
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
});
