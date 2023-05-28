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
import {Style, Course, CourseVideo} from '../index'
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal/VideoModal";

interface StyleTypeProps {
  style: Style;
}

interface SectionListProps {
  course: Course;
  openModalCB: (video: CourseVideo) => void;
}

const SectionPlaylist = ({ course, openModalCB }: SectionListProps) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {course.playlist.map((video, index) => (
        <View style={{ width: "33.33%" }} key={index}>
          <VideoCard video={video} modalCB={openModalCB} />
        </View>
      ))}
    </View>
  );
};

const StyleCourses = ({ style }: StyleTypeProps) => {
  const initialExpandedSections = style.courses.map((course, index) => index);
  const [selectedVideo, setSelectedVideo] = useState<CourseVideo | false>(false);
  const [selectedSection, setSelectedSection] = useState<Course | false>(
    false
  );
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();

  const [collapsedCourses, setCollapsedCourses] = useState<number[]>(
    initialExpandedSections
  );

  const toggleSection = (courseIndex: number) => {
    if (collapsedCourses.includes(courseIndex)) {
      setCollapsedCourses(collapsedCourses.filter((i) => i !== courseIndex));
    } else {
      setCollapsedCourses([...collapsedCourses, courseIndex]);
    }
  };

  const openModalCB = (video: CourseVideo) => {
    const course = style.courses.filter(
      (course) => course.courseTitle === video.course
    );
    setSelectedVideo(video);
    setSelectedSection(course[0]);
    setOpenModal(true);
  };

  return (
    <ScrollView>
      {style.courses.map((course: Course, index: number) => (
        <View key={course.index} style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} onPress={() => toggleSection(index)}>
              {course.nameEN}
            </Text>
            <MaterialIcons
              name={
                collapsedCourses.includes(index)
                  ? "expand-less"
                  : "expand-more"
              }
              size={24}
              onPress={() => toggleSection(index)}
            />
          </View>
          <Collapsible collapsed={!collapsedCourses.includes(index)}>
            <SectionPlaylist course={course} openModalCB={openModalCB} />
          </Collapsible>
        </View>
      ))}
      <VideoModal
        visible={openModal}
        selectedVideo={selectedVideo}
        selectedSection={selectedSection}
        changeVideo={(video: CourseVideo) => setSelectedVideo(video)}
        closeCB={() => {
          setSelectedVideo(false);
          setSelectedSection(false);
        }}
      />
    </ScrollView>
  );
};

export default StyleCourses;

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
