import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../../types/UserProfile';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Collapsible } from '../../components/Collapsible';
import { useThemeColor } from '../../hooks/useThemeColor';
import { BasicIdentityLifestyleForm } from '../../components/forms/BasicIdentityLifestyleForm';

export default function UserProfileScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'text');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // TODO: Implement actual profile loading from backend
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      // TODO: Implement actual profile saving to backend
      setSaving(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tintColor} />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={tintColor} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Profile</ThemedText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          >
            <MaterialIcons name="settings" size={24} color={tintColor} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Basic Identity & Lifestyle */}
          <Collapsible title="Basic Identity & Lifestyle">
            <BasicIdentityLifestyleForm
              profile={userProfile?.basicProfile}
              onProfileChange={(updatedBasicProfile) => {
                setUserProfile((prev) => ({
                  ...prev!,
                  basicProfile: updatedBasicProfile,
                }));
              }}
            />
          </Collapsible>

          {/* Dietary Preferences */}
          <Collapsible title="Dietary Preferences">
            {/* TODO: Implement DietaryPreferencesForm */}
            <ThemedText>Coming soon...</ThemedText>
          </Collapsible>

          {/* Allergies & Intolerances */}
          <Collapsible title="Allergies & Intolerances">
            {/* TODO: Implement AllergiesForm */}
            <ThemedText>Coming soon...</ThemedText>
          </Collapsible>

          {/* Health & Nutrition Goals */}
          <Collapsible title="Health & Nutrition Goals">
            {/* TODO: Implement HealthGoalsForm */}
            <ThemedText>Coming soon...</ThemedText>
          </Collapsible>

          {/* Meal Planning Habits */}
          <Collapsible title="Meal Planning Habits">
            {/* TODO: Implement MealPlanningHabitsForm */}
            <ThemedText>Coming soon...</ThemedText>
          </Collapsible>

          {/* Grocery Preferences */}
          <Collapsible title="Grocery Preferences">
            {/* TODO: Implement GroceryPreferencesForm */}
            <ThemedText>Coming soon...</ThemedText>
          </Collapsible>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: tintColor }]}
            onPress={handleSaveProfile}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={backgroundColor} />
            ) : (
              <>
                <MaterialIcons name="save" size={24} color={backgroundColor} />
                <ThemedText style={[styles.saveButtonText, { color: backgroundColor }]}>
                  Save Profile
                </ThemedText>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra space for the save button
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
