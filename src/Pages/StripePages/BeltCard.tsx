import { Card, IconButton, List } from "react-native-paper";
import { Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BeltCard: React.FC = () => {
  const navigation = useNavigation();

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
        <IconButton
          icon={() => (
            <Image
              source={{ uri: "https://picsum.photos/200/200" }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          )}
          size={50}
          //   onPress={() => navigation.navigate("WhiteBeltScreen")}
          onPress={() => {
            return;
          }}
        />
        <IconButton
          icon={() => (
            <Image
              source={{ uri: "https://picsum.photos/200/205" }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          )}
          size={50}
          //   onPress={() => navigation.navigate("BlueBeltScreen")}
          onPress={() => {
            return;
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default BeltCard;
