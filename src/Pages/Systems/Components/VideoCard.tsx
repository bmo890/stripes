import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { CourseVideo } from '../index';

interface VideoCardProps {
    video: CourseVideo
    modalCB: (video: CourseVideo) => void
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