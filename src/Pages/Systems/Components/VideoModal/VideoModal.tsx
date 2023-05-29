import { Modal, Dimensions, SafeAreaView, View } from "react-native";
import { Text, Card } from "react-native-paper";
import { Style, Course, CourseVideo } from "../../index";
import YoutubePlayer from "../../../../Components/YoutubePlayer";
import { HEADER_HEIGHT } from "../../../../Components/AppBar/AppBar";
import Header from "./Components/Header";
import Navigator from "./Components/Navigator";

export interface ModalProps {
  selectedVideo: CourseVideo | false;
  selectedSection: Course | false;
  changeVideo: (video: CourseVideo) => void;
  visible: boolean;
  closeCB: () => void;
}
const VideoModal = ({
  selectedVideo,
  selectedSection,
  changeVideo,
  visible,
  closeCB,
}: ModalProps) => {
  if (!selectedVideo || !selectedSection) {
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
            justifyContent: "space-between",
          }}
        >
          <Header
            selectedSection={selectedSection}
            changeVideo={changeVideo}
            selectedVideo={selectedVideo}
            visible={visible}
            closeCB={closeCB}
          />
          <YoutubePlayer
            videoId={selectedVideo.url}
            style={{ width: "100%", height: "30%" }}
          />
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "column",
              padding: 10,
            }}
          >
            <Navigator
              selectedSection={selectedSection}
              selectedVideo={selectedVideo}
              changeVideo={changeVideo}
            />
            <Card
              style={{
                borderRadius: 10,
                marginTop: 10,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "bold" }}>
                {selectedVideo.titleEN}
              </Text>
              <Text style={{ marginTop: 5 }}>
                {selectedVideo.descriptionEN}
              </Text>
            </Card>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default VideoModal;
