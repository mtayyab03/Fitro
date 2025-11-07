import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import { fontSize } from "@/constants/fontUtils";
import icons from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
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
const { width } = Dimensions.get("window");
const History = () => {
  const totalSections = 5;
  const progressPercent = Math.min(Math.max(0.35 * 100, 0), 100); // keep as number

  const islands = [
    { id: 1, title: "Monde", image: icons.island2 },
    { id: 2, title: "Rondo", image: icons.island2 },
    { id: 3, title: "Lawando", image: icons.island2 },
    { id: 4, title: "Zorina", image: icons.island2 },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  // Separate scale animation for each island
  const scaleAnims = useRef(islands.map(() => new Animated.Value(1))).current;

  const triggerAnimation = (index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 1.2,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Play animation for the first island on mount
  useEffect(() => {
    triggerAnimation(0);
  }, []);

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
      triggerAnimation(index);
    }
  };
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

        <View
          style={{
            alignItems: "center",
            height: RFPercentage(48),
          }}
        >
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={handleScrollEnd}
            scrollEventThrottle={16}
            contentContainerStyle={{ flexGrow: 0 }}
          >
            {islands.map((island, index) => {
              const scale = scaleAnims[index] || new Animated.Value(1); // fallback

              return (
                <View
                  key={island.id}
                  style={{
                    width,
                    alignItems: "center",
                    height: RFPercentage(20),
                  }}
                >
                  <View style={styles.outerCard}>
                    <View style={styles.card}>
                      <LinearGradient
                        colors={["#E6F8CF", "#B4E6C1"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientContainer}
                      />

                      {/* Animated Island */}
                      <Animated.Image
                        source={island.image}
                        style={[
                          styles.islandImage,
                          {
                            transform: [
                              { scale },
                              {
                                translateY: scale.interpolate({
                                  inputRange: [1, 1.4],
                                  outputRange: [0, -12],
                                }),
                              },
                              {
                                translateX: scale.interpolate({
                                  inputRange: [1, 1.4],
                                  outputRange: [0, 8],
                                }),
                              },
                            ],
                          },
                        ]}
                        resizeMode="contain"
                      />

                      {/* Footer */}
                      <View style={styles.cardFooter}>
                        <Text style={styles.cardTitle}>{island.title}</Text>
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
              );
            })}
          </Animated.ScrollView>

          {/* Dots */}
          <View style={styles.pageDots}>
            {islands.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [10, 30, 10],
                extrapolate: "clamp",
              });

              const dotColor = scrollX.interpolate({
                inputRange,
                outputRange: [Colors.white, Colors.primary, Colors.white],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    { width: dotWidth, backgroundColor: dotColor },
                  ]}
                />
              );
            })}
          </View>
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
    gap: 6,
  },
  dot: {
    width: RFPercentage(1.7),
    height: RFPercentage(1.4),
    borderRadius: RFPercentage(2),
    backgroundColor: Colors.white,
  },
});
