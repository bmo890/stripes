import React from "react";
import { Platform, View } from "react-native";
import { WebView } from "react-native-webview";

interface YoutubePlayerProps {
  videoId: string;
  style?: object;
}

const YoutubePlayer = ({ videoId, style }: YoutubePlayerProps) => {
  const webView = (
    <WebView
      style={style}
      javaScriptEnabled={true}
      source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
    />
  );

  const iframe = (
    // <View style={{ ...style, overflow: "hidden" }}>
    <View style={{ ...style }}>
      <iframe
        title="youtube-player"
        src={`https://www.youtube.com/embed/${videoId}`}
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
    </View>
  );

  return Platform.OS === "web" ? iframe : webView;
};

export default YoutubePlayer;
