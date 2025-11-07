import icons from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

interface ProgressBar3DProps {
  totalSections?: number; // total divider sections
  progressPercent: number; // 0–100
  style?: ViewStyle;
}

const ProgressBar3D: React.FC<ProgressBar3DProps> = ({
  totalSections = 5,
  progressPercent,
  style,
}) => {
  const sectionWidth = 100 / totalSections;

  return (
    <View
      style={[
        {
          width: "100%",
          alignItems: "center",
          marginTop: RFPercentage(2.5),
        },
        style,
      ]}
    >
      {/* Outer gradient border */}
      <LinearGradient
        colors={["#EAEFF4", "#CFDDE8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ProgressBar3DContainer}
      >
        {/* Inner white gradient box */}
        <LinearGradient
          colors={["#FFFFFF", "#F5F8FA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statBox}
        >
          <View style={styles.Progresscontainer}>
            {/* Main bar */}
            <LinearGradient
              colors={["#F2F6FA", "#D8E3ED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.outerBar}
            >
              <View style={styles.innerBar}>
                {/* Sections (alternating gradient / image) */}
                {Array.from({ length: totalSections }).map((_, i) => {
                  const start = i * sectionWidth;
                  const end = (i + 1) * sectionWidth;
                  const isGradient = i % 2 === 0;

                  const fillPercent =
                    progressPercent >= end
                      ? 100
                      : progressPercent > start
                      ? ((progressPercent - start) / sectionWidth) * 100
                      : 0;

                  if (fillPercent <= 0) return null;

                  return (
                    <View
                      key={i}
                      style={[
                        styles.segment,
                        { left: `${start}%`, width: `${sectionWidth}%` },
                      ]}
                    >
                      {isGradient ? (
                        <LinearGradient
                          colors={["#A6E57D", "#60C76F"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.fill, { width: `${fillPercent}%` }]}
                        />
                      ) : (
                        <ImageBackground
                          source={icons.progress}
                          resizeMode="stretch"
                          style={[
                            styles.fill,
                            { width: `${fillPercent * 1.4}%` }, // Extend to reach divider visually
                          ]}
                        />
                      )}
                    </View>
                  );
                })}

                {/* Divider lines */}
                {Array.from({ length: totalSections - 1 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.divider,
                      { left: `${(i + 1) * sectionWidth}%` },
                    ]}
                  />
                ))}
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </LinearGradient>

      {/* 🎁 Gift icon */}
      <Image source={icons.gift} style={styles.giftIcon} resizeMode="contain" />
    </View>
  );
};

export default ProgressBar3D;

const styles = StyleSheet.create({
  outerBar: {
    width: 340,
    height: 26,
    borderRadius: 50,
    padding: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  innerBar: {
    flex: 1,
    backgroundColor: "#2B3E4F",
    borderRadius: 50,
    overflow: "hidden",
  },
  segment: {
    position: "absolute",
    top: 0,
    bottom: 0,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
  divider: {
    position: "absolute",
    top: 0,
    width: 2,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  giftIcon: {
    position: "absolute",
    right: 20,
    bottom: 8,
    width: 50,
    height: 50,
  },

  gradientContainer: {
    borderRadius: 20,
    width: "100%",
    height: RFPercentage(25),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  Progresscontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ProgressBar3DContainer: {
    alignItems: "center",
    borderRadius: RFPercentage(10),
    paddingBottom: RFPercentage(0.7),
  },
  statBox: {
    alignItems: "center",
    padding: RFPercentage(1),
    borderRadius: RFPercentage(10),
    justifyContent: "center",
  },
});
