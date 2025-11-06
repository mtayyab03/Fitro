import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    GrandstanderThin: require("../assets/fonts/Grandstander-Thin.ttf"),
    GrandstanderLight: require("../assets/fonts/Grandstander-Light.ttf"),
    GrandstanderRegular: require("../assets/fonts/Grandstander-Regular.ttf"),
    GrandstanderMedium: require("../assets/fonts/Grandstander-Medium.ttf"),
    GrandstanderSemiBold: require("../assets/fonts/Grandstander-SemiBold.ttf"),
    GrandstanderBold: require("../assets/fonts/Grandstander-Bold.ttf"),
    GrandstanderExtraBold: require("../assets/fonts/Grandstander-ExtraBold.ttf"),
    GrandstanderBlack: require("../assets/fonts/Grandstander-Black.ttf"),
    FigtreeLight: require("../assets/fonts/Figtree-Light.ttf"),
    FigtreeRegular: require("../assets/fonts/Figtree-Regular.ttf"),
    FigtreeMedium: require("../assets/fonts/Figtree-Medium.ttf"),
    FigtreeSemiBold: require("../assets/fonts/Figtree-SemiBold.ttf"),
    FigtreeBold: require("../assets/fonts/Figtree-Bold.ttf"),
    FigtreeExtraBold: require("../assets/fonts/Figtree-ExtraBold.ttf"),
    FigtreeBlack: require("../assets/fonts/Figtree-Black.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
