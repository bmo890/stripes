import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ChooseStripeIcon from "../../../Components/ChooseStripeIcon/ChooseStripeIcon";
import { BeltLevel } from "../../../Stripe Playlist/index";
import { LinearGradient } from "expo-linear-gradient";

interface BeltThumbnailProps {
  onPress: () => void;
  belt: BeltLevel;
  amount: number;
}

const BeltThumbnail: React.FC<BeltThumbnailProps> = ({
  onPress,
  belt,
  amount,
}) => {
  const gradientColorsWhite = ["#f0f0f0", "#c0c0c0"];
  const gradientColorsBlue = ["#90d4ff", "#1e88e5"];

  const gradientColors =
    belt === BeltLevel.White ? gradientColorsWhite : gradientColorsBlue;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 100, height: 100, borderRadius: 10, overflow: "hidden" }}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ChooseStripeIcon belt={belt} amount={amount} />
        <Text style={{ color: "black", fontWeight: "bold", paddingTop: 8}}>
          {belt === BeltLevel.White ? "White Belt" : "Blue Belt"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BeltThumbnail;
