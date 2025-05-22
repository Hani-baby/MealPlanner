import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthNavigator from "./navigation/AuthNavigator";
import AppNavigator from "./navigation/AppNavigator";
import { ActivityIndicator, View, StyleSheet, Animated } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useThemeColor } from "./hooks/useThemeColor";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const MainNavigation = () => {
  const { userToken, isLoading, isPerformingLoginTransition } = useContext(AuthContext);
  const primaryColor = "#4A80F0"; // Default primary color

  // Fade in animation for smooth transitions
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  console.log("🚀 App Load:", { userToken, isLoading });

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: '#FFFFFF' }]}>
        <ActivityIndicator size="large" color={primaryColor} />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <NavigationContainer>
        {userToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
