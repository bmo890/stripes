import React, { useState } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Button,
  List,
  IconButton,
  Avatar,
  Chip,
} from "react-native-paper";
import HomeCardTitle from "../Home/Components/HomeCardTitle";
// import Avatar from "react-native-paper/lib/typescript/src/components/Avatar/AvatarIcon";

const CoachCornerCard = () => {
  const [expanded, setExpanded] = useState(false);

  const announcement =
    "Hello team! 🥋\n\nI hope you're all ready for an exciting week of training ahead. This week, we're going to focus on a few key techniques:\n\n1. **White Belts:** We will be covering basics of guard passing, specifically the Knee Slice and the X-Pass. Make sure to revisit the instructional videos on these topics.\n\n2. **Blue Belts:** We're going to delve into more complex guard play this week, focusing on the Spider Guard and Butterfly Guard. The instructional videos have been updated in the app.\n\nAs usual, we'll start every class with a thorough warm-up and end with some good rounds of sparring.\n\nRemember, the key to success in Jiu-Jitsu is consistency and mindful practice. Let's make the most of this week! 💪\n\nDon't forget to check the 'Coach's Corner' section in our app for detailed breakdowns and video links for these techniques.\n\nSee you all on the mat!\n\nCoach";

  const date = new Date();

  return (
    <Card>
      <HomeCardTitle
        page={"Coach"}
        icon={"bullhorn-outline"}
        title={"Coach's Corner"}
      />

      <View
        style={{
          // marginBottom: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={45}
          source={require("../../../assets/gal_avatar.png")}
        />
        <View style={{ paddingLeft: 5 }}>
          <Text style={{ fontWeight: "bold" }}>Gal</Text>
          <Text>{date.toDateString()}</Text>
        </View>
      </View>
      <Card.Content>
        {/* <View style={{marginBottom: 5, flexDirection: 'row', alignItems: 'center'}}>
        <Avatar.Image  size={45} source={require("../../../assets/gal_avatar.png")} />
        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Gal</Text>
        </View> */}
        <ScrollView>
          <Text style={{ maxHeight: 225 }}>
            {expanded ? announcement : announcement.slice(0, 100) + "..."}
          </Text>
        </ScrollView>
        <Button onPress={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CoachCornerCard;
