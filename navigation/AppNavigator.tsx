import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import DashboardScreen from "../screens/Main/DashboardScreen";
import GroceryListScreen from "../screens/Main/GroceryListScreen";
import MealPlanScreen from "../screens/Main/MealPlanScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const primaryColor = useThemeColor({}, 'primary');
  const inactiveColor = useThemeColor({}, 'tabBarInactive');
  const color = focused ? primaryColor : inactiveColor;
  
  let iconName = 'home-outline';
  if (name === 'Dashboard') iconName = 'home-outline';
  if (name === 'Meals') iconName = 'restaurant-outline';
  if (name === 'Groceries') iconName = 'cart-outline';
  if (name === 'Profile') iconName = 'person-outline';
  
  return (
    <View style={styles.iconContainer}>
      <Ionicons name={iconName} size={24} color={color} />
      <Text style={[styles.iconLabel, { color }]}>{name}</Text>
      {focused && (
        <View style={[styles.activeIndicator, { backgroundColor: primaryColor }]} />
      )}
    </View>
  );
};

export default function AppNavigator() {
  const backgroundColor = useThemeColor({}, 'tabBarBackground');
  const borderColor = useThemeColor({}, 'border');
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          borderTopColor: borderColor,
          height: 60,
          paddingTop: 6,
          paddingBottom: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="Dashboard" focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Meals" 
        component={MealPlanScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="Meals" focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Groceries" 
        component={GroceryListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="Groceries" focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -6,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
