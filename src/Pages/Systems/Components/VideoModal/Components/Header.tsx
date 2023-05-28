import React from "react";
import {
  Modal,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  View,
} from "react-native";
import { Text, Card, IconButton } from "react-native-paper";
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
        width: "100%",
        height: HEADER_HEIGHT,
        alignItems: "center",
      }}
    >
      {/* -----breadcrumbs section ------*/}
      <View
        style={{ marginLeft: 8, flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ marginRight: 10 }}>
          {/* <ChooseStripeIcon amount={selectedVideo. + 1} belt={0} /> */}
          <Text>{selectedSection.nameEN}</Text>
        </View>
        <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>
          {selectedVideo.titleEN}
        </Text>
      </View>
      {/* -----------------------------*/}
      <View>
        <IconButton
          icon="close-circle-outline"
          iconColor={"black"}
          size={30}
          onPress={() => closeCB()}
        />
      </View>
    </LinearGradient>
  );
};

export default ModalHeader;
