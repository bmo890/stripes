import { Card, IconButton, List } from "react-native-paper";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BeltLevel } from "../../Stripe Playlist/index";
import { ScreenProps } from "../MainLayout/MainLayout";
import CoursesThumbnail from "./CoursesThumbnail";
import {Berimbolo_1} from '.'

const CoursesCard: React.FC = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<ScreenProps["navigation"]>();

  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: "bold" }}
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <List.Icon icon="graph-outline" />
            <Text>Courses</Text>
          </View>
        }
      />
      <Card.Content
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <CoursesThumbnail
        //   belt={BeltLevel.White}
          amount={4}
          onPress={() =>
            navigation.navigate("Courses")
        }
        />
      </Card.Content>
    </Card>
  );
};

export default CoursesCard;
