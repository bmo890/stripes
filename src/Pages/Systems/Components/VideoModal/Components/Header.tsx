import React from "react";
import {
  Modal,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  View,
} from "react-native";
import { Text, Card, IconButton, List } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { HEADER_HEIGHT } from "../../../../../Components/AppBar/AppBar";
import { F_TLV_BLUE, F_TLV_PINK } from "../../../../Home/HomeScreen";
import { ModalProps } from "../VideoModal";
import ChooseStripeIcon from "../../../../../Components/ChooseStripeIcon/ChooseStripeIcon";

const ModalHeader = ({
  selectedVideo,
  visible,
  selectedSection,
  changeVideo,
  closeCB,
}: ModalProps) => {
  if (!selectedVideo || !selectedSection) {
    return null;
  }

  const gradientColors = [F_TLV_PINK, F_TLV_BLUE];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 5, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: HEADER_HEIGHT,
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}>
        <List.Icon icon="graph-outline" />
      </View>
      <View
        style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}
      >
        <Text
          style={{ color: "black", fontSize: 15, fontWeight: "bold" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedSection.nameEN}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            flexShrink: 1,
          }}
        >
          {selectedVideo.titleEN}
        </Text>
      </View>
      <IconButton
        icon="close-circle-outline"
        iconColor={"black"}
        size={30}
        onPress={() => closeCB()}
      />
    </LinearGradient>
  );
};

export default ModalHeader;
