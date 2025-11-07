import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import { fontSize } from "@/constants/fontUtils";
import icons from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

interface TopBarProps {
  onInvertPress?: () => void;
  coins?: number;
  rewards?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  onInvertPress,
  coins = 127,
  rewards = 15,
}) => {
  return (
    <View style={styles.topBar}>
      {/* Invert Button */}
      <LinearGradient
        colors={["#2B3F4F", "#233240"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientInvertContainer}
      >
        <LinearGradient
          colors={["#75A0BB", "#35556F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <LinearGradient
            colors={["#416A88", "#2F495D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.invertGradient}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.invertButton}
              onPress={onInvertPress}
            >
              <Image source={icons.invert} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
      </LinearGradient>

      {/* Stat Boxes */}
      <View style={styles.statContainer}>
        {/* Coins */}
        <LinearGradient
          colors={["#EAEFF4", "#CFDDE8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.CoinstatBox}
        >
          <LinearGradient
            colors={["#FFFFFF", "#F5F8FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statBox}
          >
            <Image source={icons.coin} style={styles.iconSmall} />
            <Text style={styles.statText}>{coins}</Text>
          </LinearGradient>
        </LinearGradient>

        {/* Rewards */}
        <LinearGradient
          colors={["#EAEFF4", "#CFDDE8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.CoinstatBox}
        >
          <LinearGradient
            colors={["#FFFFFF", "#F5F8FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statBox}
          >
            <Image source={icons.reward} style={styles.iconSmall} />
            <Text style={styles.statText}>{rewards}</Text>
          </LinearGradient>
        </LinearGradient>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
    alignItems: "center",
  },
  invertGradient: {
    borderRadius: 10,
    padding: 2, // thin border look
    alignSelf: "flex-start",
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 2, // thickness of gradient border
  },
  gradientInvertContainer: {
    borderRadius: 10,
    paddingBottom: RFPercentage(0.7), // thickness of gradient border
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  invertButton: {
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statContainer: { flexDirection: "row", gap: 10 },
  CoinstatBox: {
    alignItems: "center",
    borderRadius: 12,
    paddingBottom: RFPercentage(0.7),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    width: fontSize(100),
    paddingVertical: 6,
    justifyContent: "center",
  },
  statText: {
    fontFamily: FontFamily.bold,
    fontSize: fontSize(21),
    marginLeft: RFPercentage(1.5),
    color: Colors.primary,
    marginTop: RFPercentage(0.5),
  },
  iconSmall: { width: fontSize(32), height: fontSize(32) },
});
