import { Card, IconButton, List } from "react-native-paper";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BeltLevel } from "../../Stripe Playlist/index";
import { ScreenProps } from "../MainLayout/MainLayout";
import BeltThumbnail from "./Components/BeltIcon";

const BeltCard: React.FC = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<ScreenProps["navigation"]>();

  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: "bold" }}
        title={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <List.Icon icon="bow-tie" />
            <Text>Belts</Text>
          </View>
        }
      />
      <Card.Content
        style={{ flexDirection: "row", justifyContent: "space-around" }}
      >
        <BeltThumbnail
          belt={BeltLevel.White}
          amount={4}
          onPress={() =>
            navigation.navigate("Belt", {
              beltPage: BeltLevel.White,
            })
          }
        />
        <BeltThumbnail
          belt={BeltLevel.Blue}
          amount={4}
          onPress={() =>
            navigation.navigate("Belt", {
              beltPage: BeltLevel.Blue,
            })
          }
        />
      </Card.Content>
    </Card>
  );
};

export default BeltCard;
