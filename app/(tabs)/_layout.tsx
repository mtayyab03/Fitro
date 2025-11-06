import { HapticTab } from "@/components/haptic-tab";
import icons from "@/constants/icons";
import { Colors } from "@/constants/theme";
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
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
        },
      }}
    >
      {/* 🕵️‍♀️ History Tab */}
      <Tabs.Screen
        name="History"
        options={{
          title: "Histoire",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.history}
              style={styles.icon}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 6, // move text a bit lower
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
            marginTop: 10, // pushes label further down
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
            marginTop: 6, // move text a bit lower
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
    width: 38,
    height: 38,
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
