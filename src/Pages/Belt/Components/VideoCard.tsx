import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { VideoType } from "../../../Stripe Playlist/index";

interface VideoCardProps {
  video: VideoType;
  modalCB: (video: VideoType) => void;
}
const VideoCard = ({ video, modalCB }: VideoCardProps) => {
  const thumbnail = video.isYouTube
    ? `https://i.ytimg.com/vi_webp/${video.url}/mqdefault.webp`
    : video.url.replace(/(\/upload\/)/, "$1so_0.0/").replace(/\.mp4$/, ".jpg");

  return (
    <TouchableOpacity
      key={video.id}
      style={styles.thumbnailContainer}
      onPress={() => modalCB(video)}
    >
      <Image
        style={styles.thumbnail}
        source={{
          uri: thumbnail,
        }}
      />
      <Text style={{ textAlign: "center" }}>{`${video.id + 1}.) ${
        video.titleEN
      }`}</Text>
    </TouchableOpacity>
  );
};

export default VideoCard;

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
