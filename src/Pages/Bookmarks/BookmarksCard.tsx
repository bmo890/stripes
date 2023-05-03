import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Card, Button, List, IconButton } from "react-native-paper";
import ChooseStripeIcon from "../../Components/ChooseStripeIcon/ChooseStripeIcon";
import { LinearGradient } from "expo-linear-gradient";
import { F_TLV_BLUE, F_TLV_PINK } from "../Home/HomeScreen";

import {
  Section,
  VideoType,
  StripeLevel,
  UserBookmarks,
  BeltLevel,
  BookmarkedItem,
} from "../../Stripe Playlist";
import {
  W1_PLAYLIST,
  W2_PLAYLIST,
  W3_PLAYLIST,
} from "../../Stripe Playlist/WhiteBelt/WhiteBeltPlaylist";

const bookmarkedItems: UserBookmarks = {
  savedItems: [
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.section[0].section,
      video: W1_PLAYLIST.section[0].playlist[0],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.section[2].section,
      video: W1_PLAYLIST.section[2].playlist[1],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.section[2].section,
      video: W1_PLAYLIST.section[2].playlist[2],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.section[3].section,
      video: W1_PLAYLIST.section[3].playlist[1],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W2_PLAYLIST.stripe,
      section: W2_PLAYLIST.section[1].section,
      video: W2_PLAYLIST.section[1].playlist[0],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W2_PLAYLIST.stripe,
      section: W2_PLAYLIST.section[1].section,
      video: W2_PLAYLIST.section[1].playlist[2],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W3_PLAYLIST.stripe,
      section: W3_PLAYLIST.section[0].section,
      video: W3_PLAYLIST.section[0].playlist[0],
    },
  ],
};


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
  const [expanded, setExpanded] = useState<{ [belt: string]: boolean }>({
    W1: true,
    W3: false,
    B1: false,
  });

  const [allExpanded, setAllExpanded] = useState(false);

  interface BookmarkDisplay {
    belt: BeltLevel;
    stripe: StripeLevel;
    items: VideoType[];
  }

  const [displayedBookmarks, setDisplayedBookmarks] = useState<
    BookmarkDisplay[]
  >([]);

  const groupedByStripeLevel = (videos: BookmarkedItem[]) => {
    const bookmarkDisplay: BookmarkDisplay[] = [];

    for (const video of videos) {
      let found = false;

      for (const item of bookmarkDisplay) {
        if (video.belt === item.belt && video.stripe === item.stripe) {
          item.items.push(video.video);
          found = true;
          break;
        }
      }

      if (!found) {
        bookmarkDisplay.push({
          belt: video.belt,
          stripe: video.stripe,
          items: [video.video],
        });
      }
    }

    return bookmarkDisplay;
  };

  useEffect(() => {
    const vids = groupedByStripeLevel(bookmarkedItems.savedItems);
    setDisplayedBookmarks(vids);
  }, []);

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

  let count = 1;

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
            {displayedBookmarks.map((stripe, index: number) => {
              return (
                <List.Accordion
                  style={{ backgroundColor: "lightgrey", borderRadius: 10 }}
                  key={index}
                  title={
                    <View
                      style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center',paddingLeft: 20, width: '100%' }}
                    >
                      <ChooseStripeIcon
                        amount={stripe.stripe}
                        belt={stripe.belt}
                      />
                      {/* <Text style={{ marginLeft: 5 }}>{stripe.stripe}</Text> */}
                    </View>
                  }
                  expanded={true}
                  onPress={() => {
                    return;
                  }}
                >
                  <View style={{ paddingTop: 10 }}>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                      {stripe.items.map((move, index: number) => {
                        count++;
                        return (
                          <View key={index} style={styles.thumbnailContainer}>
                            <Image
                              style={styles.thumbnail}
                              source={{ uri: fakebookmarks[count].imageUrl }}
                            />
                            <Text style={{ textAlign: "center" }}>
                              {move.titleEN}
                            </Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </List.Accordion>
              );
            })}
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
