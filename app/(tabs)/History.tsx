import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import { fontSize } from "@/constants/fontUtils";
import icons from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

// compoenets
import ProgressBar3D from "@/components/common/ProgressBar3D";
import TopBar from "@/components/common/TopBar";

const History = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const totalSections = 5;
  const progressPercent = Math.min(Math.max(0.35 * 100, 0), 100); // keep as number

  const islands = [
    { id: 1, title: "Monde", image: icons.island2 },
    { id: 2, title: "Rondo", image: icons.island2 },
    { id: 3, title: "Lawando", image: icons.island2 },
    { id: 4, title: "Zorina", image: icons.island2 },
  ];

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
        <TopBar
          coins={127}
          rewards={15}
          onInvertPress={() => console.log("Invert pressed")}
        />
        <ProgressBar3D
          progressPercent={progressPercent}
          totalSections={totalSections}
        />
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
                    <LinearGradient
                      colors={["#5FBF81", "#93D94D"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.radio}
                    >
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={Colors.white}
                      />
                    </LinearGradient>
                  </LinearGradient>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        {/* Page indicator */}
        <View style={styles.pageDots}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === 1 && {
                  backgroundColor: Colors.primary,
                  width: RFPercentage(2.3),
                },
              ]}
            />
          ))}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default History;

const styles = StyleSheet.create({
  container: { flex: 1 },

  progressImg: {
    width: 250,
    height: 25,
    borderRadius: 12,
  },

  title: {
    textAlign: "center",
    fontSize: fontSize(30),
    fontFamily: FontFamily.bold,
    color: Colors.primary,
    marginTop: RFPercentage(7),
    marginBottom: RFPercentage(1),
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
    width: "85%",
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
    height: RFPercentage(30),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  islandImage: {
    position: "absolute",
    width: RFPercentage(40),
    height: RFPercentage(33),
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFPercentage(2),
  },
  cardTitle: {
    fontSize: fontSize(24),
    fontFamily: FontFamily.bold,
    color: Colors.primary,
    marginHorizontal: RFPercentage(1),
  },
  radioContainer: { flexDirection: "row" },
  radio: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(4),
    alignItems: "center",
    justifyContent: "center",
  },
  CoinstatBox: {
    alignItems: "center",
    borderRadius: RFPercentage(3),
    paddingBottom: RFPercentage(0.5),
    padding: RFPercentage(0.2),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RFPercentage(3),
    padding: 4,
    justifyContent: "center",
  },

  pageDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },
  dot: {
    width: RFPercentage(1.2),
    height: RFPercentage(1.2),
    borderRadius: RFPercentage(1),
    backgroundColor: Colors.white,
  },
});
