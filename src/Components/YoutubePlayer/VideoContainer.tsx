import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import VideoPlayer from "./VideoPlayer";

interface VideoPlayerProps {
  videoUrl: string;
  isYouTube?: boolean;
}

function VideoContainer({ videoUrl, isYouTube }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);

  const adjustedURL = isYouTube
    ? `https://www.youtube.com/embed/${videoUrl}?modestbranding=1&rel=0`
    : videoUrl;

  const preview = isYouTube
    ? `https://i.ytimg.com/vi_webp/${videoUrl}/sddefault.webp`
    : videoUrl.replace(/(\/upload\/)/, "$1so_0.0/").replace(/\.mp4$/, ".jpg");

  useEffect(() => {
    setLoaded(false);
  }, [videoUrl]);
  const visibleStyle = { width: "100%", height: "100%", zIndex: 1 };

  return (
    <View style={styles.videoContainer}>
      {!loaded && (
        <View
          style={{
            ...visibleStyle,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <TouchableOpacity
            style={{ ...visibleStyle, backgroundColor: 'black' }}
            onPress={() => setLoaded(true)}
          >
            <Image
              style={{ width: "100%", height: "100%", backgroundColor: 'black' }}
              source={{
                uri: preview,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      <VideoPlayer
        videoId={adjustedURL}
        preview={preview}
        style={styles.video}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    aspectRatio: 16 / 9,
    width: "100%",
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
export default VideoContainer;
