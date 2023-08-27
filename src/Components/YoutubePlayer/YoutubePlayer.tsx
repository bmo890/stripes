import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Platform, View, Image, Button } from "react-native";
import { WebView } from "react-native-webview";

interface YoutubePlayerProps {
  videoId: string;
  style?: object;
}

const YoutubePlayer = ({ videoId, style }: YoutubePlayerProps) => {
  const adjustedStyle = { flex: 3, width: "100%" };
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
  }, [videoId]);
  const visibleStyle = { width: "100%", height: "100%", zIndex: 1 };

  return (
    <View style={{ ...style }}>
      {!loaded && (
        <View
          style={{
            ...visibleStyle,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              // uri: `https://i.ytimg.com/vi_webp/${videoId}/sddefault.webp`,
              uri: `https://i.ytimg.com/vi_webp/${videoId}/sddefault.webp`,
            }}
          />
        </View>
      )}
      {Platform.OS === "web" ? (
        <iframe
          title="youtube-player"
          // src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
          src={videoId}
          frameBorder="0"
          allowFullScreen
          onLoad={() => {
            // setTimeout(() => setLoaded(true), 10);
            setLoaded(true);
          }}
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
          allowsFullscreenVideo
          style={adjustedStyle}
          javaScriptEnabled={true}
          onLoad={() => {
            // setTimeout(() => setLoaded(true), 10);
            setLoaded(true);
          }}
          // source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          // source={{ uri: `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0` }}
          source={{uri: videoId}}
        />
      )}
    </View>
  );
};

export default YoutubePlayer;
