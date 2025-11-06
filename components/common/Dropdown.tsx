import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

// constants
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";

interface DropdownProps {
  title: string;
  description: string;
}

const Dropdown: React.FC<DropdownProps> = ({ title, description }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <View
      style={{
        backgroundColor: "#F4F4F4",
        width: "90%",
        borderRadius: RFPercentage(1),
        borderWidth: RFPercentage(0.1),
        borderColor: Colors.stroke,
        paddingVertical: RFPercentage(1.7),
        justifyContent: "center",
        marginTop: RFPercentage(1),
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setDropdown((prev) => !prev)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ width: "85%" }}>
          <Text
            style={{
              fontFamily: FontFamily.regular,
              fontSize: RFPercentage(1.5),
              marginLeft: RFPercentage(2),
              color: Colors.lightBlack,
            }}
          >
            {title}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setDropdown((prev) => !prev)}
          style={{
            position: "absolute",
            right: RFPercentage(2),
          }}
        >
          <MaterialIcons
            name={dropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            color={Colors.primary}
            size={28}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {dropdown && (
        <View
          style={{
            width: "95%",
            padding: RFPercentage(2),
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.regular,
              fontSize: RFPercentage(1.5),
              color: Colors.darkGrey,
            }}
          >
            {description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
