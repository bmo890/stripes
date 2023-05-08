import {
  Modal,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  View,
} from "react-native";
import { Text, Card, IconButton } from "react-native-paper";
import { Stripe, Section, VideoType } from "../../../../Stripe Playlist/index";
import YoutubePlayer from "../../../../Components/YoutubePlayer";
import { HEADER_HEIGHT } from "../../../../Components/AppBar/AppBar";
import Header from "./Components/Header";

export interface ModalProps {
  selectedVideo: VideoType | false;
  visible: boolean;
  closeCB: () => void;
}
const VideoModal = ({ selectedVideo, visible, closeCB }: ModalProps) => {
  if (!selectedVideo) {
    return null;
  }

  const { width, height } = Dimensions.get("window");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeCB()}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Header
            selectedVideo={selectedVideo}
            visible={visible}
            closeCB={closeCB}
          />
          <YoutubePlayer
            videoId={selectedVideo.url}
            style={{ width: "100%", height: "30%" }}
          />
          <Card
            style={{
              // height: height - 300,
              width: "90%",
              borderRadius: 10,
              marginTop: 10,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "bold" }}>
              {selectedVideo.titleEN}
            </Text>
            <Text style={{ marginTop: 5 }}>{selectedVideo.descriptionEN}</Text>
          </Card>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default VideoModal;
