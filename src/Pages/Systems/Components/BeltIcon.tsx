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
        colors={gradientColors}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ paddingTop: 8 }}>
          <ChooseStripeIcon belt={belt} amount={amount} />
        </View>
        <Text style={{ color: "black", fontWeight: "bold", paddingTop: 8 }}>
          {belt === BeltLevel.White ? "WHITE" : "BLUE"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BeltThumbnail;
