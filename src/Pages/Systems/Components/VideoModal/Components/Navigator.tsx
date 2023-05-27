import { View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Section, VideoType } from "../../../../../Stripe Playlist/index";

interface ProgressBarProps {
  selectedVideo: VideoType;
  selectedSection: Section;
  changeVideo: (video: VideoType) => void;
}

const Navigator = ({
  selectedVideo,
  selectedSection,
  changeVideo,
}: ProgressBarProps) => {
  const currentIndex = selectedVideo.id;

  return (
    <Card
      style={{
        marginTop: 10,
        height: 60,
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <IconButton
            icon="arrow-left"
            onPress={() =>
              selectedVideo.id !== 0 &&
              changeVideo(selectedSection.playlist[currentIndex - 1])
            }
            style={{ opacity: selectedVideo.id === 0 ? 0 : 1 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {selectedSection.playlist.map((video, index) => (
            <View
              key={index}
              style={{
                backgroundColor: index === currentIndex ? "lightblue" : "gray",
                borderRadius: 5,
                width: 10,
                height: 10,
                marginHorizontal: 2,
              }}
            />
          ))}
        </View>
        <View>
          <IconButton
            iconColor="black"
            icon="arrow-right"
            onPress={() =>
              selectedVideo.id !== selectedSection.playlist.length - 1 &&
              changeVideo(selectedSection.playlist[currentIndex + 1])
            }
            style={{
              opacity:
                selectedVideo.id === selectedSection.playlist.length - 1
                  ? 0
                  : 1,
            }}
          />
        </View>
      </View>
    </Card>
  );
};

export default Navigator;
