import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {F_TLV_BLUE, F_TLV_PINK} from '../MainLayout/index'

interface CourseThumbnailProps {
  onPress: (style: string) => void;
  style: string;
}

const CourseThumbnail: React.FC<CourseThumbnailProps> = ({
  onPress,
  style,
}) => {
  const gradientColorsWhite = ["#f0f0f0", "#c0c0c0"];
  const gradient = style === 'Gi' ? [F_TLV_BLUE, F_TLV_PINK] : [F_TLV_PINK, F_TLV_BLUE]
console.log(style)

  return (
    <TouchableOpacity
      onPress={() => onPress(style)}
      style={{
        width: 110,
        height: 110,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 1, // Add an elevation value to apply a shadow
        shadowColor: "#000", // Set the shadow color to black
        shadowOpacity: 0.25, // Set the shadow opacity to 25%
        shadowRadius: 3, // Set the shadow radius to 3 pixels
        shadowOffset: { width: 0, height: 3 }, // Set the shadow offse
      }}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "black", fontWeight: "bold", paddingTop: 8 }}>
          {style}
          {/* {belt === BeltLevel.White ? "WHITE" : "BLUE"} */}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CourseThumbnail;
