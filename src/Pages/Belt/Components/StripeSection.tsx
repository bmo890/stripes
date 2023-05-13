import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Collapsible from "react-native-collapsible";
import { Stripe, Section, VideoType } from "../../../Stripe Playlist/index";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal/VideoModal";

interface StripeSectionProps {
  stripe: Stripe;
}

interface SectionListProps {
  section: Section;
  openModalCB: (video: VideoType) => void;
}

const SectionPlaylist = ({ section, openModalCB }: SectionListProps) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {section.playlist.map((video, index) => (
        <View style={{ width: "33.33%" }} key={index}>
          <VideoCard video={video} modalCB={openModalCB} />
        </View>
      ))}
    </View>
  );
};

const StripeSection = ({ stripe }: StripeSectionProps) => {
  const initialExpandedSections = stripe.sections.map((stripe, index) => index);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | false>(false);
  const [selectedSection, setSelectedSection] = useState<Section | false>(
    false
  );
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
    const section = stripe.sections.filter(
      (section) => section.section === video.section
    );
    setSelectedVideo(video);
    setSelectedSection(section[0]);
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
            <SectionPlaylist section={section} openModalCB={openModalCB} />
          </Collapsible>
        </View>
      ))}
      <VideoModal
        visible={openModal}
        selectedVideo={selectedVideo}
        selectedSection={selectedSection}
        changeVideo={(video: VideoType) => setSelectedVideo(video)}
        closeCB={() => {
          setSelectedVideo(false);
          setSelectedSection(false);
        }}
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
