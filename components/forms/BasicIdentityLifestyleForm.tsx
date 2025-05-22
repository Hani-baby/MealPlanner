import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import * as ExpoDateTimePicker from 'expo-community-datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { UserBasicProfile, Gender, MeasurementSystem, ActivityLevel } from '../../types/UserProfile';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '../../hooks/useThemeColor';

interface BasicIdentityLifestyleFormProps {
  profile: UserBasicProfile;
  onProfileChange: (profile: UserBasicProfile) => void;
}

export function BasicIdentityLifestyleForm({ profile, onProfileChange }: BasicIdentityLifestyleFormProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const placeholderColor = useThemeColor({}, 'text-secondary');

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      onProfileChange({ ...profile, dateOfBirth: selectedDate });
    }
  };

  const inputStyle = {
    ...styles.input,
    color: textColor,
    borderColor: textColor,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Full Name */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Full Name</ThemedText>
        <TextInput
          style={inputStyle}
          value={profile.fullName}
          onChangeText={(text) => onProfileChange({ ...profile, fullName: text })}
          placeholder="Enter your full name"
          placeholderTextColor={placeholderColor}
        />
      </View>

      {/* Date of Birth */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Date of Birth</ThemedText>
        <TouchableOpacity
          style={inputStyle}
          onPress={() => {
            // For now, we'll just use a simple date input
            // TODO: Implement a proper cross-platform date picker
            const currentDate = profile.dateOfBirth || new Date();
            onProfileChange({
              ...profile,
              dateOfBirth: currentDate
            });
          }}
        >
          <ThemedText>
            {profile.dateOfBirth
              ? profile.dateOfBirth.toLocaleDateString()
              : 'Select date of birth'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Gender Selection */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Gender</ThemedText>
        <View style={styles.radioGroup}>
          {Object.values(Gender).map((gender) => (
            <TouchableOpacity
              key={gender}
              style={styles.radioButton}
              onPress={() => onProfileChange({ ...profile, gender })}
            >
              <View
                style={[
                  styles.radio,
                  profile.gender === gender && styles.radioSelected,
                  { borderColor: textColor },
                ]}
              >
                {profile.gender === gender && (
                  <View
                    style={[styles.radioInner, { backgroundColor: textColor }]}
                  />
                )}
              </View>
              <ThemedText style={styles.radioLabel}>
                {gender.toLowerCase().replace(/_/g, ' ')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Country */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Country</ThemedText>
        <TextInput
          style={inputStyle}
          value={profile.country}
          onChangeText={(text) => onProfileChange({ ...profile, country: text })}
          placeholder="Enter your country"
          placeholderTextColor={placeholderColor}
        />
      </View>

      {/* Measurement System */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Measurement System</ThemedText>
        <View style={styles.radioGroup}>
          {Object.values(MeasurementSystem).map((system) => (
            <TouchableOpacity
              key={system}
              style={styles.radioButton}
              onPress={() =>
                onProfileChange({ ...profile, measurementSystem: system })
              }
            >
              <View
                style={[
                  styles.radio,
                  profile.measurementSystem === system && styles.radioSelected,
                  { borderColor: textColor },
                ]}
              >
                {profile.measurementSystem === system && (
                  <View
                    style={[styles.radioInner, { backgroundColor: textColor }]}
                  />
                )}
              </View>
              <ThemedText style={styles.radioLabel}>
                {system.toLowerCase()}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Activity Level */}
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.label}>Activity Level</ThemedText>
        <View style={styles.activityLevelContainer}>
          {Object.values(ActivityLevel).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.activityLevelButton,
                profile.activityLevel === level && {
                  backgroundColor: textColor,
                },
              ]}
              onPress={() => onProfileChange({ ...profile, activityLevel: level })}
            >
              <ThemedText
                style={[
                  styles.activityLevelText,
                  profile.activityLevel === level && {
                    color: backgroundColor,
                  },
                ]}
              >
                {level.toLowerCase().replace(/_/g, ' ')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderWidth: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 16,
  },
  activityLevelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityLevelButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  activityLevelText: {
    fontSize: 14,
  },
});
