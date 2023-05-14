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
import {ModalProps} from '../VideoModal'


const ModalHeader = ({selectedVideo, visible, selectedSection, changeVideo, closeCB}: ModalProps) => {
    if (!selectedVideo) {
        return null;
      }
      const gradientColors = [ F_TLV_PINK, F_TLV_BLUE]

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
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: "black", fontSize: 15 }}>
            {selectedVideo.stripe} {">"} {selectedVideo.section}
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
