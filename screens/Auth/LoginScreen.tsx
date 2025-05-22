import React, { useContext, useState } from "react";
import { 
  Alert, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Pressable,
  Animated
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useColorScheme } from "../../hooks/useColorScheme";

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  
  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subtextColor = useThemeColor({}, 'subtext');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const tertiaryColor = useThemeColor({}, 'tertiary');
  const borderColor = useThemeColor({}, 'border');
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    // MOCKING backend call
    if (email === "test@example.com" && password === "123456") {
      const mockToken = "mock-jwt-token-abc123";
      login(mockToken); // Save token and trigger navigation
    } else {
      Alert.alert("Login Failed", "Invalid credentials.");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
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
          {/* Logo/Header Section */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: primaryColor }]}>
              <ThemedText style={[styles.logoText]} type="logo">MP</ThemedText>
            </View>
            <ThemedText style={styles.title} type="heading">Meal Planner</ThemedText>
            <ThemedText style={styles.subtitle}>Healthy meals, simplified</ThemedText>
          </View>

          {/* Form Section */}
          <View style={[styles.formCard, { backgroundColor: cardColor }]}>
            <ThemedText style={styles.formTitle}>Welcome Back</ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Email</ThemedText>
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
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Password</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: isPasswordFocused ? primaryColor : borderColor,
                    backgroundColor: backgroundColor,
                    color: textColor
                  }
                ]}
                placeholder="Enter your password"
                placeholderTextColor={subtextColor}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <ThemedText style={[styles.forgotPasswordText, { color: primaryColor }]}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: primaryColor }]} 
              onPress={handleLogin}
            >
              <ThemedText style={styles.loginButtonText}>Log In</ThemedText>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={[styles.orLine, { backgroundColor: borderColor }]}></View>
              <ThemedText style={styles.orText}>or</ThemedText>
              <View style={[styles.orLine, { backgroundColor: borderColor }]}></View>
            </View>

            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: backgroundColor, borderColor }]} 
            >
              <ThemedText style={styles.socialButtonText}>Continue with Google</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Sign Up Section */}
          <View style={styles.signupContainer}>
            <ThemedText style={styles.signupText}>Don't have an account?</ThemedText>
            <Pressable onPress={handleRegister}>
              <ThemedText style={[styles.signupLink, { color: primaryColor }]}>
                Sign Up
              </ThemedText>
            </Pressable>
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
    justifyContent: "center",
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
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
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#FFFFFF',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
  },
  orText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.6,
  },
  socialButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    marginRight: 5,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
  }
});
