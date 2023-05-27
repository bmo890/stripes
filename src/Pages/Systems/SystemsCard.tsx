import { Card, IconButton, List } from "react-native-paper";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BeltLevel } from "../../Stripe Playlist/index";
import { ScreenProps } from "../MainLayout/MainLayout";
import SystemThumbnail from "./SystemsThumbnail";

const SystemsCard: React.FC = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<ScreenProps["navigation"]>();

  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: "bold" }}
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <List.Icon icon="graph-outline" />
            <Text>Systems</Text>
          </View>
        }
      />
      <Card.Content
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <SystemThumbnail
        //   belt={BeltLevel.White}
          amount={4}
          onPress={() =>
            navigation.navigate("Systems")
        }
        />
      </Card.Content>
    </Card>
  );
};

export default SystemsCard;
