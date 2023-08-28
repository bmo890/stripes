import React from "react";
import {
  Platform,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

interface VideoPlayerProps {
  videoId: string;
  preview: string;
  style?: object;
}

const VideoPlayer = ({ videoId, preview, style }: VideoPlayerProps) => {
  const adjustedStyle = { flex: 3, width: "100%" };

  return (
    <View style={{ ...style, backgroundColor: 'black' }}>
      {Platform.OS === "web" ? (
        <iframe
        key={videoId}
          title="youtube-player"
          src={videoId}
          frameBorder="0"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <WebView
        key={videoId}
          allowsFullscreenVideo
          style={adjustedStyle}
          javaScriptEnabled={true}
          source={{ uri: videoId }}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
