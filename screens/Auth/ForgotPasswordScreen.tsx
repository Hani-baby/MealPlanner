import React, { useState } from "react";
import { 
  Alert, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedText } from "../../components/ThemedText";
import { useColorScheme } from "../../hooks/useColorScheme";
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  
  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subtextColor = useThemeColor({}, 'subtext');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');
  
  // Form state
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Missing Email", "Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        "Reset Link Sent",
        "If an account exists with this email, you will receive password reset instructions.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login' as never)
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to send reset instructions. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackToLogin}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={textColor} 
            />
          </TouchableOpacity>

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: primaryColor }]}>
              <ThemedText style={[styles.logoText]} type="logo">MP</ThemedText>
            </View>
            <ThemedText style={styles.title} type="heading">Reset Password</ThemedText>
            <ThemedText style={styles.subtitle}>
              Enter your email address to receive password reset instructions
            </ThemedText>
          </View>

          {/* Form Section */}
          <View style={[styles.formCard, { backgroundColor: cardColor }]}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: isEmailFocused ? primaryColor : borderColor,
                    backgroundColor: backgroundColor,
                    color: textColor
                  }
                ]}
                placeholder="Enter your email"
                placeholderTextColor={subtextColor}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                autoComplete="email"
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.resetButton, 
                { 
                  backgroundColor: primaryColor,
                  opacity: isLoading ? 0.7 : 1
                }
              ]} 
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <ThemedText style={styles.resetButtonText}>
                  Send Reset Instructions
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoText}>
              Remember your password?{' '}
              <ThemedText 
                style={[styles.loginLink, { color: primaryColor }]}
                onPress={handleBackToLogin}
              >
                Back to Login
              </ThemedText>
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 4,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    height: 40,
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: 'center',
    height: 40,
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingTop: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 20,
    minHeight: 48,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  formCard: {
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resetButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#FFFFFF',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: "600",
  }
});
