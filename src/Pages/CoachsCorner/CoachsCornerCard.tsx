import React, { useState } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { Card, Text, Button, List, IconButton } from "react-native-paper";

const CoachCornerCard = () => {
  const [expanded, setExpanded] = useState(false);

  const announcement =
    "Hello team! 🥋\n\nI hope you're all ready for an exciting week of training ahead. This week, we're going to focus on a few key techniques:\n\n1. **White Belts:** We will be covering basics of guard passing, specifically the Knee Slice and the X-Pass. Make sure to revisit the instructional videos on these topics.\n\n2. **Blue Belts:** We're going to delve into more complex guard play this week, focusing on the Spider Guard and Butterfly Guard. The instructional videos have been updated in the app.\n\nAs usual, we'll start every class with a thorough warm-up and end with some good rounds of sparring.\n\nRemember, the key to success in Jiu-Jitsu is consistency and mindful practice. Let's make the most of this week! 💪\n\nDon't forget to check the 'Coach's Corner' section in our app for detailed breakdowns and video links for these techniques.\n\nSee you all on the mat!\n\nCoach";

  const date = new Date();

  return (
    <Card>
      <Card.Title
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>

            <List.Icon icon="bullhorn-outline" />
            <Text style={{ fontWeight: "bold" }}>Coach's Corner</Text>
            </View>
          </View>
        }
        right={(props) => (
          <IconButton
            {...props}
            icon="chevron-right"
            onPress={() => {
              return;
            }}
          />
        )}
        subtitle={date.toDateString()}
        // left={LeftContent}
      />

      <Card.Content>
        <ScrollView>
          <Text style={{ maxHeight: 225 }}>
            {expanded ? announcement : announcement.slice(0, 100) + "..."}
          </Text>
        </ScrollView>
        <Button onPress={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Show More"}
        </Button>
        {/* <List.Accordion
          title="Announcements"
          left={(props) => <List.Icon {...props} icon='bullhorn' />}
          >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion> */}
      </Card.Content>
    </Card>
  );
};

export default CoachCornerCard;
