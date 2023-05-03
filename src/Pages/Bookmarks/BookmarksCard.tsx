import React, { useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Card, Button, List, IconButton } from "react-native-paper";
import ChooseStripeIcon from "../../Components/ChooseStripeIcon/ChooseStripeIcon";
import { Section, VideoType, SavedPlaylist, UserBookmarks } from "../../Stripe Playlist";
import {
  W1_PLAYLIST,
  W2_PLAYLIST,
  W3_PLAYLIST,
} from "../../Stripe Playlist/WhiteBelt/WhiteBeltPlaylist";

// console.log(W1_Playlist);
// const userSavedBookmarks: UserBookmarks = {
//   savedItems: [
//     {level: W1_Playlist[0], saved: [0, 1, 2]},
//     {level: W1_Playlist[1], saved: [0, 1, 2, 3]},
//     {level: W2_Playlist[1], saved: [0, 1]}
//   ]
// }
interface Bookmark {
  title: string;
  imageUrl: string;
}

interface Bookmarks {
  [belt: string]: Bookmark[];
}

const fakebookmarks = [
  { title: "Rear Naked Choke", imageUrl: "https://picsum.photos/200/200" },
  { title: "Armbar", imageUrl: "https://picsum.photos/200/201" },
  { title: "Triangle Choke", imageUrl: "https://picsum.photos/200/202" },
  { title: "Guillotine Choke", imageUrl: "https://picsum.photos/200/203" },
  { title: "Ankle Lock", imageUrl: "https://picsum.photos/200/204" },
  { title: "Omoplata", imageUrl: "https://picsum.photos/200/205" },
  { title: "Kimura", imageUrl: "https://picsum.photos/200/206" },
  { title: "Americana", imageUrl: "https://picsum.photos/200/207" },
  { title: "Omaplata", imageUrl: "https://picsum.photos/200/208" },
  { title: "Leg Lock", imageUrl: "https://picsum.photos/200/209" },
  { title: "Ezekiel Choke", imageUrl: "https://picsum.photos/200/210" },
  { title: "Bow and Arrow Choke", imageUrl: "https://picsum.photos/200/211" },
  { title: "Scissor Sweep", imageUrl: "https://picsum.photos/200/212" },
  { title: "Hip Bump Sweep", imageUrl: "https://picsum.photos/200/213" },
  { title: "Pendulum Sweep", imageUrl: "https://picsum.photos/200/214" },
  { title: "X-Guard Sweep", imageUrl: "https://picsum.photos/200/215" },
  { title: "De La Riva Sweep", imageUrl: "https://picsum.photos/200/216" },
  { title: "Half Guard Sweep", imageUrl: "https://picsum.photos/200/217" },
];

const BookmarkCard: React.FC = () => {
  const bookmarks: Bookmarks = {
    W1: [
      { title: "Rear Naked Choke", imageUrl: "https://picsum.photos/200/200" },
      { title: "Armbar", imageUrl: "https://picsum.photos/200/201" },
      { title: "Triangle Choke", imageUrl: "https://picsum.photos/200/202" },
      { title: "Guillotine Choke", imageUrl: "https://picsum.photos/200/203" },
      { title: "Ankle Lock", imageUrl: "https://picsum.photos/200/204" },
      { title: "Omoplata", imageUrl: "https://picsum.photos/200/205" },
    ],
    W3: [
      { title: "Kimura", imageUrl: "https://picsum.photos/200/206" },
      { title: "Americana", imageUrl: "https://picsum.photos/200/207" },
      { title: "Omaplata", imageUrl: "https://picsum.photos/200/208" },
      { title: "Leg Lock", imageUrl: "https://picsum.photos/200/209" },
      { title: "Ezekiel Choke", imageUrl: "https://picsum.photos/200/210" },
      {
        title: "Bow and Arrow Choke",
        imageUrl: "https://picsum.photos/200/211",
      },
    ],
    B1: [
      { title: "Scissor Sweep", imageUrl: "https://picsum.photos/200/212" },
      { title: "Hip Bump Sweep", imageUrl: "https://picsum.photos/200/213" },
      { title: "Pendulum Sweep", imageUrl: "https://picsum.photos/200/214" },
      { title: "X-Guard Sweep", imageUrl: "https://picsum.photos/200/215" },
      { title: "De La Riva Sweep", imageUrl: "https://picsum.photos/200/216" },
      { title: "Half Guard Sweep", imageUrl: "https://picsum.photos/200/217" },
    ],
  };

  const [expanded, setExpanded] = useState<{ [belt: string]: boolean }>({
    W1: true,
    W3: false,
    B1: false,
  });

  const [allExpanded, setAllExpanded] = useState(false);

  const handlePress = (belt: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [belt]: !prevExpanded[belt],
    }));
  };

  const handleAllPress = () => {
    setAllExpanded(!allExpanded);
    setExpanded({
      W1: !allExpanded,
      W3: !allExpanded,
      B1: !allExpanded,
    });
  };

  // const StripeIcon = (belt: "white" | "blue") => {
  //   console.log(belt);
  //   let rank: "white" | "blue" = belt;
  //   let stripe = 1;
  //   switch (belt) {
  //     case "W1":
  //       stripe = 1;
  //       break;
  //     case "W3":
  //       stripe = 3;
  //       break;
  //     case "B1":
  //       rank = "blue";
  //       stripe = 1;
  //       break;
  //     default:
  //       rank = "white";
  //       stripe = 1;
  //       break;
  //   }
  //   return <ChooseStripeIcon amount={stripe} belt={rank} />;
  // };

  const view = false;
  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: "bold" }}
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <List.Icon icon="bookmark-outline" />
            <Text>Bookmarks</Text>
          </View>
        }
        right={(props) => (
          <IconButton
            {...props}
            icon={
              allExpanded ? "close-box-multiple-outline" : "expand-all-outline"
            }
            onPress={handleAllPress}
          />
        )}
      />
      <Card.Content>
        <View style={{ maxHeight: 400 }}>
          <ScrollView>
            {/* {W1_Playlist.map((position: SectionPlaylist, index: number) => (
              <List.Accordion
                key={position.index}
                title={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <StripeIcon belt={position.index}/>
                    <Text style={{ marginLeft: 5 }}>{position.nameEN}</Text>
                  </View>
                }
                expanded={true}
                onPress={() => {
                  return;
                }}
              >
                <ScrollView horizontal={true} style={styles.scrollView}>
                  {position.playlist.map((move: VideoType, index: number) => (
                    <View key={index} style={styles.thumbnailContainer}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: fakebookmarks[index].imageUrl }}
                      />
                      <Text style={{textAlign: 'center'}}>{move.titleEN}</Text>
                    </View>
                  ))}
                </ScrollView>
              </List.Accordion>
            ))} */}
           {/* {Object.keys(bookmarks).map((belt) => {
              return (
                <List.Accordion
                  key={belt}
                  title={
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <StripeIcon belt='white'/>
                      {StripeIcon(belt)}
                      <Text style={{ marginLeft: 5 }}>{belt}</Text>
                    </View>
                  }
                  expanded={expanded[belt]}
                  onPress={() => handlePress(belt)}
                >
                  <ScrollView horizontal={true} style={styles.scrollView}>
                    {bookmarks[belt].map((bookmark, index) => (
                      <View key={index} style={styles.thumbnailContainer}>
                        <Image
                          style={styles.thumbnail}
                          source={{ uri: bookmark.imageUrl }}
                        />
                        <Text>{bookmark.title}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </List.Accordion>
              );
            }
            )} */}
          </ScrollView>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 10,
  },
  thumbnailContainer: {
    maxWidth: 125,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default BookmarkCard;
