import React, { useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Card, Button, List, IconButton } from "react-native-paper";

interface Bookmark {
  title: string;
  imageUrl: string;
}

interface Bookmarks {
  [belt: string]: Bookmark[];
}

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
            icon="format-align-justify"
            onPress={handleAllPress}
          />
        )}
      />
      <Card.Content>
        {Object.keys(bookmarks).map((belt) => (
          <List.Accordion
            key={belt}
            title={belt}
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
        ))}
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
