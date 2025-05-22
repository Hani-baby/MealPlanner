import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DietaryPreferences, DietType, Cuisine } from '../../types/UserProfile';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '../../hooks/useThemeColor';

interface DietaryPreferencesFormProps {
  preferences: DietaryPreferences;
  onPreferencesChange: (preferences: DietaryPreferences) => void;
}

export function DietaryPreferencesForm({
  preferences,
  onPreferencesChange,
}: DietaryPreferencesFormProps) {
  const [newIngredient, setNewIngredient] = useState('');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const placeholderColor = useThemeColor({}, 'text-secondary');

  const handleAddLikedIngredient = () => {
    if (newIngredient.trim()) {
      onPreferencesChange({
        ...preferences,
        likedIngredients: [...preferences.likedIngredients, newIngredient.trim()],
      });
      setNewIngredient('');
    }
  };

  const handleRemoveLikedIngredient = (ingredient: string) => {
    onPreferencesChange({
      ...preferences,
      likedIngredients: preferences.likedIngredients.filter(i => i !== ingredient),
    });
  };

  const handleAddDislikedIngredient = () => {
    if (newIngredient.trim()) {
      onPreferencesChange({
        ...preferences,
        dislikedIngredients: [...preferences.dislikedIngredients, newIngredient.trim()],
      });
      setNewIngredient('');
    }
  };

  const handleRemoveDislikedIngredient = (ingredient: string) => {
    onPreferencesChange({
      ...preferences,
      dislikedIngredients: preferences.dislikedIngredients.filter(i => i !== ingredient),
    });
  };

  const toggleCuisine = (cuisine: Cuisine) => {
    const newCuisines = new Set(preferences.cuisinePreferences);
    if (newCuisines.has(cuisine)) {
      newCuisines.delete(cuisine);
    } else {
      newCuisines.add(cuisine);
    }
    onPreferencesChange({
      ...preferences,
      cuisinePreferences: newCuisines,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Diet Type Selection */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Diet Type</ThemedText>
        <View style={styles.dietTypeContainer}>
          {Object.values(DietType).map((dietType) => (
            <TouchableOpacity
              key={dietType}
              style={[
                styles.dietTypeButton,
                preferences.dietType === dietType && {
                  backgroundColor: textColor,
                },
              ]}
              onPress={() => onPreferencesChange({ ...preferences, dietType })}
            >
              <ThemedText
                style={[
                  styles.dietTypeText,
                  preferences.dietType === dietType && {
                    color: backgroundColor,
                  },
                ]}
              >
                {dietType.toLowerCase().replace(/_/g, ' ')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cuisine Preferences */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Cuisine Preferences</ThemedText>
        <View style={styles.cuisineContainer}>
          {Object.values(Cuisine).map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              style={[
                styles.cuisineChip,
                preferences.cuisinePreferences.has(cuisine) && {
                  backgroundColor: textColor,
                },
              ]}
              onPress={() => toggleCuisine(cuisine)}
            >
              <ThemedText
                style={[
                  styles.cuisineText,
                  preferences.cuisinePreferences.has(cuisine) && {
                    color: backgroundColor,
                  },
                ]}
              >
                {cuisine.toLowerCase().replace(/_/g, ' ')}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Liked Ingredients */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Liked Ingredients</ThemedText>
        <View style={styles.ingredientInput}>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: textColor }]}
            value={newIngredient}
            onChangeText={setNewIngredient}
            placeholder="Add ingredient"
            placeholderTextColor={placeholderColor}
            onSubmitEditing={handleAddLikedIngredient}
          />
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: textColor }]}
            onPress={handleAddLikedIngredient}
          >
            <MaterialIcons name="add" size={24} color={backgroundColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.ingredientChips}>
          {preferences.likedIngredients.map((ingredient) => (
            <View key={ingredient} style={styles.ingredientChip}>
              <ThemedText>{ingredient}</ThemedText>
              <TouchableOpacity
                onPress={() => handleRemoveLikedIngredient(ingredient)}
              >
                <MaterialIcons name="close" size={18} color={textColor} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Disliked Ingredients */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Disliked Ingredients</ThemedText>
        <View style={styles.ingredientInput}>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: textColor }]}
            value={newIngredient}
            onChangeText={setNewIngredient}
            placeholder="Add ingredient"
            placeholderTextColor={placeholderColor}
            onSubmitEditing={handleAddDislikedIngredient}
          />
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: textColor }]}
            onPress={handleAddDislikedIngredient}
          >
            <MaterialIcons name="add" size={24} color={backgroundColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.ingredientChips}>
          {preferences.dislikedIngredients.map((ingredient) => (
            <View key={ingredient} style={styles.ingredientChip}>
              <ThemedText>{ingredient}</ThemedText>
              <TouchableOpacity
                onPress={() => handleRemoveDislikedIngredient(ingredient)}
              >
                <MaterialIcons name="close" size={18} color={textColor} />
              </TouchableOpacity>
            </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  dietTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietTypeButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  dietTypeText: {
    fontSize: 14,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cuisineChip: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  cuisineText: {
    fontSize: 14,
  },
  ingredientInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
});
