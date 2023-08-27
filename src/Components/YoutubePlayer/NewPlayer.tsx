import { ResizeMode, Video } from "expo-av";
import React, { useState, useRef } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import YoutubePlayer from "./YoutubePlayer";
import VideoPlayer from "expo-video-player";
import * as ScreenOrientation from "expo-screen-orientation";
import { WebView } from "react-native-webview";


interface VideoPlayerProps {
  videoUrl: string;
  isYouTube?: boolean;
  style?: object;
}

const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;

function NewPlayer({ videoUrl, isYouTube, style }: VideoPlayerProps) {
  const [fullscreen, setFullscreen] = useState(false);
  React.useEffect(() => {
    console.log("hi");
  }, [fullscreen]);

  console.log(ScreenOrientation);

  const setOrientation = () => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  // const adjustedURL = videoUrl + '?tx=c_scale,h_150'
  const adjustedURL = isYouTube ? `https://www.youtube.com/embed/${videoUrl}?modestbranding=1&rel=0` : videoUrl
  return (
    <View style={styles.videoContainer}>
      {/* <YoutubePlayer videoId={videoUrl} style={styles.video} /> */}
      <YoutubePlayer videoId={adjustedURL} style={styles.video} />
    </View>
  )
  return isYouTube ? (
    <View style={styles.videoContainer}>
      <YoutubePlayer videoId={videoUrl} style={styles.video} />
    </View>
  ) : (
    // <Video
    //   source={{ uri: videoUrl }}
    //   resizeMode={ResizeMode.CONTAIN}
    //   useNativeControls={true}
    //   style={styles.videoContainer}
    //   videoStyle={styles.video}
    //   onFullscreenUpdate={setOrientation}
    //   // onFullscreenUpdate={()=>setFullscreen(prev => !prev)}
    //   // posterSource={{ uri: videoUrl }}
    // />
    <View style={styles.videoContainer}>

    <WebView
    allowsFullscreenVideo
    style={styles.video}
    javaScriptEnabled={true}
    onLoad={() => {
      // setTimeout(() => setLoaded(true), 10);
      // setLoaded(true);
    }}
    // source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
    source={{ uri: videoUrl }}
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
export default NewPlayer;

{
  /* <VideoPlayer 
      style={{height: height / 4, width: width}}
      videoProps={{
        // useNativeControls: Platform.OS === 'web' ? false : true,
        useNativeControls: false,
        resizeMode: Platform.OS === 'web' ? ResizeMode.CONTAIN : ResizeMode.CONTAIN,
        source: {uri: videoUrl},
        style:{ height: '100%', width: '100%' },
        videoStyle:{height: '100%', width: width }
      }}/> */
}
