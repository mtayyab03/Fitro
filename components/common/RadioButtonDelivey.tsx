import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import { fontSize } from "@/constants/fontUtils";

interface RadioButtonProps {
  name: string;
  selectedName: string;
  amount: string;
  onpress: () => void;
}

const RadioButtonDelivey: React.FC<RadioButtonProps> = ({
  name,
  selectedName,
  amount,
  onpress,
}) => {
  const isSelected = selectedName === name;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onpress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        justifyContent: "space-between",
        marginVertical: RFPercentage(1.5),
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: RFPercentage(2),
            height: RFPercentage(2),
            borderWidth: RFPercentage(0.2),
            borderColor: isSelected ? Colors.secondary : Colors.primary,
            borderRadius: RFPercentage(3),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSelected && (
            <View
              style={{
                width: RFPercentage(1.2),
                height: RFPercentage(1.2),
                borderRadius: RFPercentage(3),
                backgroundColor: Colors.secondary,
              }}
            />
          )}
        </View>
        <Text
          style={{
            color: Colors.blacky,
            fontFamily: FontFamily.medium,
            fontSize: fontSize(14),
            marginLeft: RFPercentage(1.5),
          }}
        >
          {name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.darkGrey,
            fontFamily: FontFamily.medium,
            fontSize: fontSize(12),
            marginRight: RFPercentage(1),
          }}
        >
          {amount}
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="info" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButtonDelivey;
