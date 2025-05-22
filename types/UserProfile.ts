// --- Basic Identity & Lifestyle ---
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

export enum MeasurementSystem {
  IMPERIAL = 'IMPERIAL',
  METRIC = 'METRIC'
}

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHTLY_ACTIVE = 'LIGHTLY_ACTIVE',
  ACTIVE = 'ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE'
}

export interface UserBasicProfile {
  fullName: string;
  dateOfBirth: Date | null;
  gender: Gender | null;
  country: string;
  timezone: string | null; // Using timezone string ID
  measurementSystem: MeasurementSystem;
  activityLevel: ActivityLevel;
}

// --- Dietary Preferences ---
export enum DietType {
  VEGAN = 'VEGAN',
  VEGETARIAN = 'VEGETARIAN',
  KETO = 'KETO',
  PALEO = 'PALEO',
  BALANCED = 'BALANCED',
  PESCATARIAN = 'PESCATARIAN',
  CUSTOM = 'CUSTOM'
}

export enum Cuisine {
  MEDITERRANEAN = 'MEDITERRANEAN',
  ASIAN = 'ASIAN',
  AMERICAN_GENERAL = 'AMERICAN_GENERAL',
  MEXICAN = 'MEXICAN',
  ITALIAN = 'ITALIAN',
  INDIAN = 'INDIAN',
  AFRICAN = 'AFRICAN',
  FRENCH = 'FRENCH'
}

export interface DietaryPreferences {
  dietType: DietType;
  customDietTypeName?: string;
  cuisinePreferences: Set<Cuisine>;
  likedIngredients: string[];
  dislikedIngredients: string[];
}

// --- Allergies & Intolerances ---
export enum CommonAllergen {
  DAIRY = 'DAIRY',
  GLUTEN = 'GLUTEN',
  NUTS = 'NUTS',
  SOY = 'SOY',
  EGGS = 'EGGS',
  FISH = 'FISH',
  SHELLFISH = 'SHELLFISH'
}

export enum AllergySeverity {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE'
}

export interface CustomAllergy {
  name: string;
  severity: AllergySeverity;
}

export interface AllergyInfo {
  commonAllergens: Set<CommonAllergen>;
  customAllergies: CustomAllergy[];
}

// --- Health & Nutrition Goals ---
export enum GoalType {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  MAINTENANCE = 'MAINTENANCE',
  SPECIFIC_CONDITION_DIABETES = 'SPECIFIC_CONDITION_DIABETES',
  SPECIFIC_CONDITION_HEART_HEALTH = 'SPECIFIC_CONDITION_HEART_HEALTH'
}

export interface MacroSplit {
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

export interface HealthGoals {
  goalType: GoalType;
  customGoalTypeName?: string;
  targetCalories?: number;
  macroPreferences: MacroSplit;
  notes: string;
}

// --- Meal Planning Habits ---
export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK_MORNING = 'SNACK_MORNING',
  SNACK_AFTERNOON = 'SNACK_AFTERNOON',
  SNACK_EVENING = 'SNACK_EVENING'
}

export enum MealPrepFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BI_WEEKLY = 'BI_WEEKLY',
  MONTHLY = 'MONTHLY',
  CUSTOM = 'CUSTOM'
}

export enum CookingSkill {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum KitchenTool {
  OVEN = 'OVEN',
  MICROWAVE = 'MICROWAVE',
  BLENDER = 'BLENDER',
  AIR_FRYER = 'AIR_FRYER',
  STOVETOP = 'STOVETOP',
  INSTANT_POT = 'INSTANT_POT',
  FOOD_PROCESSOR = 'FOOD_PROCESSOR'
}

export interface MealPlanningHabits {
  mealsToInclude: Set<MealType>;
  mealPrepFrequency: MealPrepFrequency;
  customMealPrepDays?: number;
  mealTimes: Record<MealType, string>;
  cookingSkillLevel: CookingSkill;
  availableKitchenTools: Set<KitchenTool>;
}

// --- Grocery Preferences ---
export enum AutoOrdering {
  ON = 'ON',
  OFF = 'OFF',
  PROMPT_ME = 'PROMPT_ME'
}

export enum SubstitutionPreference {
  ALWAYS_ALLOW = 'ALWAYS_ALLOW',
  ASK_FIRST = 'ASK_FIRST',
  NEVER_ALLOW = 'NEVER_ALLOW'
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export interface DeliveryPreferences {
  preferredDays: Set<DayOfWeek>;
  preferredTimeWindows: string[];
}

export interface GroceryPreferences {
  favoriteStores: string[];
  weeklyBudgetMin?: number;
  weeklyBudgetMax?: number;
  autoOrderingPreference: AutoOrdering;
  ingredientSubstitution: SubstitutionPreference;
  deliveryPreferences: DeliveryPreferences;
}

// --- Master User Profile ---
export interface UserProfile {
  id: string;
  basicProfile: UserBasicProfile;
  dietaryPreferences: DietaryPreferences;
  allergyInfo: AllergyInfo;
  healthGoals: HealthGoals;
  mealPlanningHabits: MealPlanningHabits;
  groceryPreferences: GroceryPreferences;
}
