import {
    Modal,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    View,
  } from "react-native";
  import { Text, Card } from "react-native-paper";
  import { Stripe, Section, VideoType } from "../../../Stripe Playlist/index";
  import YoutubePlayer from "../../../Components/YoutubePlayer";
  
  interface ModalProps {
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Navigation Area */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                marginBottom: 10,
                backgroundColor: 'black'
              }}
            >
              {/* Breadcrumbs */}
              <Text style={{ color: "white" }}>
                {selectedVideo.stripe} {">"} {selectedVideo.section}
              </Text>
  
              {/* Close button */}
              <TouchableOpacity
                onPress={() => closeCB()}
                style={{
                //   backgroundColor: "white",
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold", color: 'white' }}>x</Text>
              </TouchableOpacity>
            </View>
  
            {/* YouTube Video */}
            <YoutubePlayer
              videoId={selectedVideo.url}
              style={{ width: "100%", height: "30%" }}
            />
  
            {/* Card */}
            <Card
              style={{
                height: height - 300,
                width: "90%",
                borderRadius: 10,
                marginTop: 10,
                padding: 20,
              }}
            >
              {/* Title */}
              <Text style={{ fontSize: 18, marginTop: 10 }}>
                {selectedVideo.titleEN}
              </Text>
  
              {/* Description */}
              <Text style={{ marginTop: 5 }}>{selectedVideo.descriptionEN}</Text>
            </Card>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };
  
  export default VideoModal;
  