import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import { fontSize } from "@/constants/fontUtils";
import icons from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseIslandScreen = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // scale up slightly (image goes outside gradient)
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // back to normal
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);
  return (
    <ImageBackground
      source={icons.bg}
      resizeMode="cover"
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.invertButton}>
            <Image source={icons.invert} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>

          <View style={styles.statContainer}>
            <View style={styles.statBox}>
              <Image source={icons.coin} style={styles.iconSmall} />
              <Text style={styles.statText}>127</Text>
            </View>

            <View style={styles.statBox}>
              <Image source={icons.reward} style={styles.iconSmall} />
              <Text style={styles.statText}>15</Text>
            </View>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Image
            source={icons.progress}
            style={styles.progressImg}
            resizeMode="stretch"
          />
          <Image source={icons.gift} style={styles.giftIcon} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Choisis ton île !</Text>

        {/* Island card */}
        <View style={styles.outerCard}>
          <View style={styles.card}>
            <LinearGradient
              colors={["#E6F8CF", "#B4E6C1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientContainer}
            />

            {/* Animated island floating ABOVE the gradient */}
            <Animated.Image
              source={icons.island2}
              style={[
                styles.islandImage,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      translateY: scaleAnim.interpolate({
                        inputRange: [1, 1.4],
                        outputRange: [0, -12],
                      }),
                    },
                  ],
                },
              ]}
              resizeMode="contain"
            />
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>Monde</Text>
              <View style={styles.radioContainer}>
                <TouchableOpacity style={styles.radio} />
              </View>
            </View>
          </View>
        </View>

        {/* Page indicator */}
        <View style={styles.pageDots}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[styles.dot, i === 1 && { backgroundColor: "#2B2B2B" }]}
            />
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChooseIslandScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  invertButton: {
    backgroundColor: "#E7ECF0",
    borderRadius: 10,
    padding: 10,
  },
  statContainer: { flexDirection: "row", gap: 10 },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statText: { fontWeight: "600", marginLeft: 4 },
  iconSmall: { width: 20, height: 20 },
  progressContainer: {
    alignSelf: "center",
    marginTop: 15,
    position: "relative",
  },
  progressImg: {
    width: 250,
    height: 25,
    borderRadius: 12,
  },
  giftIcon: {
    position: "absolute",
    right: -10,
    top: -8,
    width: 35,
    height: 35,
  },
  title: {
    textAlign: "center",
    fontSize: fontSize(30),
    fontFamily: FontFamily.bold,
    color: Colors.primary,
    marginTop: RFPercentage(6),
    marginBottom: RFPercentage(2),
  },

  card: {
    alignSelf: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "100%",
    paddingBottom: RFPercentage(2),
    padding: RFPercentage(1.5),
  },
  outerCard: {
    alignSelf: "center",
    backgroundColor: "#CFDDE8",
    borderRadius: 20,
    width: "75%",
    paddingBottom: RFPercentage(1.5),
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
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
  islandImage: {
    position: "absolute",
    width: RFPercentage(35),
    height: RFPercentage(28),
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#2B2B2B" },
  radioContainer: { flexDirection: "row" },
  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#56C596",
  },

  pageDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D0D0D0",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: { alignItems: "center" },
  navIcon: { width: 26, height: 26 },
  navProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: -5,
  },
  navCenter: {
    marginTop: -20,
  },
  navText: {
    fontSize: 12,
    color: "#2B2B2B",
    marginTop: 4,
  },
});
