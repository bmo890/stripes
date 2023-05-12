import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View, Image } from "react-native";
import { WebView } from "react-native-webview";

interface YoutubePlayerProps {
  videoId: string;
  style?: object;
}

const YoutubeLoader = () => {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        borderRadius: 10,
        width: 70,
        height: 50,
        zIndex: 3,
      }}
    >
      <ActivityIndicator size="large" color={"white"} />
    </View>
  );
};

const YoutubePlayer = ({ videoId, style }: YoutubePlayerProps) => {
  const [loaded, setLoaded] = useState(false);
  const webView = (
    <WebView
      style={style}
      javaScriptEnabled={true}
      source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
    />
  );

  useEffect(() => {
    setLoaded(false)
  }, [videoId])
  const visibleStyle = { width: "100%", height: "100%", zIndex: 1 };
  const iframe = (
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
          <YoutubeLoader />
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
            }}
          />
        </View>
      )}
      <iframe
        title="youtube-player"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
        onLoad={() => {
          // setTimeout(() => setLoaded(true), 10);
          setLoaded(true)
        }}
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

  // return Platform.OS === "web" ? iframe : webView;
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
        <YoutubeLoader />
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
          }}
        />
      </View>
    )}
    {Platform.OS === "web" ? (

      <iframe
      title="youtube-player"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allowFullScreen
      onLoad={() => {
        // setTimeout(() => setLoaded(true), 10);
        setLoaded(true)
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      />
      ): (
        <WebView
        style={style}
        javaScriptEnabled={true}
        onLoad={() => {
          // setTimeout(() => setLoaded(true), 10);
          setLoaded(true)
        }}
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
      />
      )}
  </View>
  )
};

export default YoutubePlayer;
