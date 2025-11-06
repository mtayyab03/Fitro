import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import icons from "@/constants/icons";
import { fontSize } from "@/constants/fontUtils";

interface CustomTabBarProps {
  tabs: string[];
  onTabChange?: (tab: string) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ tabs, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    onTabChange && onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.7}
            onPress={() => handleTabPress(tab)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === tab ? Colors.primary : Colors.placeholder,
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gray line */}
      <View style={styles.grayLine}>
        {/* Primary indicator line */}
        <View
          style={{
            position: "absolute",
            left: `${tabs.indexOf(selectedTab) * (100 / tabs.length)}%`,
            width: `${100 / tabs.length}%`,
            height: "100%",
            backgroundColor: Colors.primary,
            borderRadius: RFPercentage(5),
          }}
        />
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginTop: RFPercentage(2),
  },
  tabContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: RFPercentage(1.3),
    width: "33%",
  },
  tabText: {
    fontFamily: FontFamily.medium,
    fontSize: RFPercentage(2),
  },
  grayLine: {
    position: "relative",
    height: 2,
    width: "90%",
    backgroundColor: "#E6E7E7",
    marginTop: -2,
    borderRadius: RFPercentage(5),
  },
});
