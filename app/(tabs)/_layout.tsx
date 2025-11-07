import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/Colors";
import { FontFamily } from "@/constants/font";
import icons from "@/constants/icons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.tabColor,
        tabBarInactiveTintColor: Colors.nonActiveTab,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 85,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "#fff",
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: FontFamily.FigsemiBold,
        },
      }}
    >
      {/* 🕵️‍♀️ History Tab */}
      <Tabs.Screen
        name="History"
        options={{
          title: "Histoire",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={icons.history}
                style={styles.icon}
                resizeMode="contain"
              />

              {/* {focused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -40, // just below icon/label
                    width: 30,
                    height: 5,
                    borderTopLeftRadius: RFPercentage(1),
                    borderTopRightRadius: RFPercentage(1),
                    backgroundColor: Colors.tabColor,
                  }}
                />
              )} */}
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 10, // move text a bit lower
            fontFamily: FontFamily.FigsemiBold,
          },
          tabBarIconStyle: {
            marginTop: 8, // move icon slightly lower
          },
        }}
      />

      {/* 🧑‍🌾 Profile (center icon, elevated) */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerIconWrapper}>
              <Image
                source={icons.profile}
                style={styles.centerIcon}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 12, // pushes label further down
            fontFamily: FontFamily.FigsemiBold,
          },
        }}
      />

      {/* 🛍 Boutique */}
      <Tabs.Screen
        name="Boutique"
        options={{
          title: "Boutique",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.boutique}
              style={styles.icon}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 10, // move text a bit lower
            fontFamily: FontFamily.FigsemiBold,
          },
          tabBarIconStyle: {
            marginTop: 8, // move icon slightly lower
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
  centerIconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 8,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  centerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
