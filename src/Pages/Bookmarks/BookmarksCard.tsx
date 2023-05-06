import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Card, Button, List, IconButton, useTheme } from "react-native-paper";
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
} from "../../Stripe Playlist/WhiteBeltPlaylist";

const bookmarkedItems: UserBookmarks = {
  savedItems: [
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.sections[0].section,
      video: W1_PLAYLIST.sections[0].playlist[0],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.sections[2].section,
      video: W1_PLAYLIST.sections[2].playlist[1],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.sections[2].section,
      video: W1_PLAYLIST.sections[2].playlist[2],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W1_PLAYLIST.stripe,
      section: W1_PLAYLIST.sections[3].section,
      video: W1_PLAYLIST.sections[3].playlist[1],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W2_PLAYLIST.stripe,
      section: W2_PLAYLIST.sections[1].section,
      video: W2_PLAYLIST.sections[1].playlist[0],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W2_PLAYLIST.stripe,
      section: W2_PLAYLIST.sections[1].section,
      video: W2_PLAYLIST.sections[1].playlist[2],
    },
    {
      belt: W1_PLAYLIST.belt,
      stripe: W3_PLAYLIST.stripe,
      section: W3_PLAYLIST.sections[0].section,
      video: W3_PLAYLIST.sections[0].playlist[0],
    },
  ],
};


const BookmarkCard: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<boolean[]>([]);


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
    const initialExpandedState = new Array(vids.length).fill(false);
    initialExpandedState[0] = true;
    setExpanded(initialExpandedState);
  }, []);

  const handlePress = (index: number) => {
    setExpanded((prevExpanded) =>
      prevExpanded.map((item, idx) => (idx === index ? !item : item))
    );
  };

  const handleAllPress = () => {
    // If all accordions are expanded, collapse all, otherwise expand all
    const allExpanded = expanded.every((val) => val);
    setExpanded((prevExpanded) =>
      prevExpanded.map(() => !allExpanded)
    );
  };

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
              expanded.every((val) => val) ? "chevron-up" : "chevron-down"
            }
            onPress={handleAllPress}
          />
        )}
      />
      <Card.Content>
        <View style={{ maxHeight: 400 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {displayedBookmarks.map((stripe, index: number) => {
              return (
                <List.Accordion
                  style={{
                    marginBottom: 5,
                    backgroundColor: theme.colors.elevation.level4,
                    borderRadius: 10,
                  }}
                  key={index}
                  title={
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 20,
                        width: "100%",
                      }}
                    >
                      <ChooseStripeIcon
                        amount={stripe.stripe + 1}
                        belt={stripe.belt}
                      />
                    </View>
                  }
                  expanded={expanded[index]}
                  onPress={() => handlePress(index)}
                >
                  <View style={{ paddingTop: 10}}>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                      {stripe.items.map((move, index: number) => {
                        return (
                          <View key={index} style={styles.thumbnailContainer}>
                            <Image
                              style={styles.thumbnail}
                              source={{ uri: `https://i.ytimg.com/vi_webp/${move.url}/mqdefault.webp` }}
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
          </ScrollView>
        </View>
      </Card.Content>
      <Card.Actions>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 10,
  },
  thumbnailContainer: {
    maxWidth: 100,
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
