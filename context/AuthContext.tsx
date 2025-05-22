import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Animated, Easing, View, StyleSheet } from "react-native";

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      console.log("🔄 Checking for saved token...");
      const token = await SecureStore.getItemAsync("userToken");
      console.log("📦 Retrieved token:", token);
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false); // Ensure this always runs
      console.log("✅ Done loading");
    };
    loadToken();
  }, []);
  
  

  const login = async (token: string) => {
    await SecureStore.setItemAsync("userToken", token);
    setUserToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
