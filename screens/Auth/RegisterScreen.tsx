import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { AuthContext } from "../../context/AuthContext";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useThemeColor } from "../../hooks/useThemeColor";

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  
  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subtextColor = useThemeColor({}, 'subtext');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      Alert.alert("Weak password", "Password should be at least 6 characters");
      return;
    }

    // Mock registration success
    try {
      // This would normally be an API call to register the user
      console.log("Registering with:", { name, email, password });
      
      // Mock success - create a token and login
      const mockToken = "new-user-jwt-token-xyz789";
      login(mockToken);
      
    } catch (error) {
      Alert.alert("Registration Failed", "An error occurred during registration");
    }
  };

  const handleLogin = () => {
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
          {/* Logo/Header Section */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: primaryColor }]}>
              <ThemedText style={[styles.logoText]} type="logo">MP</ThemedText>
            </View>
            <ThemedText style={styles.title} type="heading">Meal Planner</ThemedText>
            <ThemedText style={styles.subtitle} type="default">Create your account</ThemedText>
          </View>

          {/* Form Section */}
          <View style={[styles.formCard, { backgroundColor: cardColor }]}>
            <ThemedText style={styles.formTitle} type="subtitle">Sign Up</ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: isNameFocused ? primaryColor : borderColor,
                    backgroundColor: backgroundColor,
                    color: textColor
                  }
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={subtextColor}
                value={name}
                onChangeText={setName}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
              />
            </View>
            
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
                keyboardType="email-address"
                autoCapitalize="none"
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
                placeholder="Create a password"
                placeholderTextColor={subtextColor}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    borderColor: isConfirmPasswordFocused ? primaryColor : borderColor,
                    backgroundColor: backgroundColor,
                    color: textColor
                  }
                ]}
                placeholder="Confirm your password"
                placeholderTextColor={subtextColor}
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, { backgroundColor: primaryColor }]} 
              onPress={handleRegister}
            >
              <ThemedText style={styles.registerButtonText}>Create Account</ThemedText>
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

          {/* Sign In Section */}
          <View style={styles.signinContainer}>
            <ThemedText style={styles.signinText}>Already have an account?</ThemedText>
            <TouchableOpacity onPress={handleLogin}>
              <ThemedText style={[styles.signinLink, { color: primaryColor }]}>
                Sign In
              </ThemedText>
            </TouchableOpacity>
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
    marginBottom: 30,
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
  registerButton: {
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
  registerButtonText: {
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
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    marginRight: 5,
  },
  signinLink: {
    fontSize: 14,
    fontWeight: "600",
  }
});
