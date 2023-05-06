import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useTheme, Title, Card } from "react-native-paper";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Collapsible from "react-native-collapsible";
import { Stripe, Section, VideoType } from "../../../Stripe Playlist/index";

interface VideoCardProps {
    video: VideoType
    modalCB: (video: VideoType) => void
}
// const VideoCard = ({ video }: { video: VideoType }) => {
const VideoCard = ({video, modalCB}: VideoCardProps) => {
    return (
      <TouchableOpacity key={video.id} style={styles.thumbnailContainer} onPress={()=>modalCB(video)} >
        <Image
          style={styles.thumbnail}
          source={{
            uri: `https://i.ytimg.com/vi_webp/${video.url}/mqdefault.webp`,
          }}
        />
        <Text style={{ textAlign: "center" }}>{`${video.id + 1}.) ${
          video.titleEN
        }`}</Text>
      </TouchableOpacity>
    );
  };

export default VideoCard

const styles = StyleSheet.create({
    thumbnailContainer: {
      flex: 1,
      margin: 8,
      alignItems: "center",
    },
    thumbnail: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
  });