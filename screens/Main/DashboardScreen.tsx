import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useThemeColor } from "../../hooks/useThemeColor";

const { width } = Dimensions.get("window");

const DashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('today');
  const [scrollY] = useState(new Animated.Value(0));

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subtextColor = useThemeColor({}, 'subtext');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const tertiaryColor = useThemeColor({}, 'tertiary');
  const borderColor = useThemeColor({}, 'border');
  const successColor = useThemeColor({}, 'success');
  const errorColor = useThemeColor({}, 'error');
  const warningColor = useThemeColor({}, 'warning');

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  // Sample data
  const meals = [
    { emoji: '🍳', label: 'Breakfast', name: 'Avocado Toast & Eggs', time: '8:00 AM', calories: 420 },
    { emoji: '🥗', label: 'Lunch', name: 'Mediterranean Bowl', time: '12:30 PM', calories: 550 },
    { emoji: '🫐', label: 'Snack', name: 'Greek Yogurt & Berries', time: '3:00 PM', calories: 180 },
    { emoji: '🍽️', label: 'Dinner', name: 'Grilled Salmon & Quinoa', time: '7:00 PM', calories: 620 },
  ];

  const nutrition = {
    calories: { current: 1770, target: 2100 },
    protein: { current: 95, target: 120, color: useThemeColor({}, 'protein') },
    carbs: { current: 180, target: 250, color: useThemeColor({}, 'carbs') },
    fat: { current: 60, target: 70, color: useThemeColor({}, 'fats') },
    fiber: { current: 22, target: 30, color: useThemeColor({}, 'success') },
  };

  const challenges = [
    { 
      title: 'Veggie Week', 
      participants: 128, 
      daysLeft: 5,
      progress: 60,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      title: 'No Added Sugar', 
      participants: 243, 
      daysLeft: 12,
      progress: 40,
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
  ];

  const friends = [
    { name: 'Emma', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', streak: 12 },
    { name: 'James', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', streak: 8 },
    { name: 'Olivia', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', streak: 21 },
  ];

  const groceryItems = [
    { name: 'Spinach', status: 'low', icon: '🥬' },
    { name: 'Eggs', status: 'low', icon: '🥚' },
    { name: 'Chicken', status: 'out', icon: '🍗' },
  ];

  const quickActions = [
    { 
      icon: 'add-circle-outline', 
      label: 'Add Meal', 
      color: primaryColor,
      onPress: () => navigation.navigate('Meals' as never)
    },
    { 
      icon: 'calendar-outline', 
      label: 'Plan Week', 
      color: secondaryColor,
      onPress: () => navigation.navigate('Meals' as never)
    },
    { 
      icon: 'list-outline', 
      label: 'Grocery List', 
      color: tertiaryColor,
      onPress: () => navigation.navigate('Groceries' as never)
    },
  ];

  // Render functions
  const renderMeal = (meal, index) => (
    <TouchableOpacity 
      key={index} 
      style={[styles.mealCard, { backgroundColor: cardColor }]}
      onPress={() => navigation.navigate('Meals' as never)}
    >
      <View style={styles.mealRow}>
        <ThemedText style={styles.emoji}>{meal.emoji}</ThemedText>
        <View style={styles.mealTextGroup}>
          <View style={styles.mealLabelRow}>
            <ThemedText style={styles.mealLabel}>{meal.label}</ThemedText>
            <ThemedText style={styles.mealTime}>{meal.time}</ThemedText>
          </View>
          <ThemedText style={styles.mealName}>{meal.name}</ThemedText>
        </View>
      </View>
      <View style={[styles.calorieTag, { backgroundColor: `${primaryColor}20` }]}>
        <ThemedText style={[styles.calorieText, { color: primaryColor }]}>{meal.calories} kcal</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const renderNutritionProgress = (label, value, color) => {
    const percent = (value.current / value.target) * 100;
    return (
      <View style={styles.progressBlock} key={label}>
        <View style={styles.progressLabelRow}>
          <ThemedText style={styles.progressLabel}>{label}</ThemedText>
          <ThemedText style={styles.progressValue}>{value.current}/{value.target}g</ThemedText>
        </View>
        <View style={[styles.progressBar, { backgroundColor: borderColor }]}>
          <View style={[styles.progressFill, { width: `${Math.min(percent, 100)}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  const renderChallenge = (challenge, index) => (
    <TouchableOpacity 
      key={index} 
      style={[styles.challengeCard, { backgroundColor: cardColor }]}
      onPress={() => navigation.navigate('Meals' as never)}
    >
      <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
      <View style={styles.challengeContent}>
        <ThemedText style={styles.challengeTitle}>{challenge.title}</ThemedText>
        <View style={styles.challengeStats}>
          <ThemedText style={styles.challengeParticipants}>
            <Ionicons name="people" size={14} color={subtextColor} /> {challenge.participants}
          </ThemedText>
          <ThemedText style={styles.challengeDays}>{challenge.daysLeft} days left</ThemedText>
        </View>
        <View style={[styles.progressBar, { backgroundColor: borderColor, marginTop: 8 }]}>
          <View style={[styles.progressFill, { width: `${challenge.progress}%`, backgroundColor: primaryColor }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFriend = (friend, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.friendItem}
      onPress={() => navigation.navigate('Profile' as never)}
    >
      <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
      <ThemedText style={styles.friendName}>{friend.name}</ThemedText>
      <View style={[styles.streakBadge, { backgroundColor: errorColor }]}>
        <Ionicons name="flame" size={12} color="#FFF" />
        <ThemedText style={styles.streakText}>{friend.streak}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const renderGroceryItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={[styles.groceryItem, { backgroundColor: cardColor }]}
      onPress={() => navigation.navigate('Groceries' as never)}
    >
      <ThemedText style={styles.groceryIcon}>{item.icon}</ThemedText>
      <View style={styles.groceryTextContainer}>
        <ThemedText style={styles.groceryName}>{item.name}</ThemedText>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'out' ? errorColor : warningColor 
        }]}>
          <ThemedText style={styles.statusText}>{item.status.toUpperCase()}</ThemedText>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color={primaryColor} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderQuickAction = (action, index) => (
    <TouchableOpacity 
      key={index} 
      style={[styles.quickAction, { backgroundColor: cardColor }]}
      onPress={action.onPress}
    >
      <View style={[styles.actionIconContainer, { backgroundColor: action.color + '20' }]}>
        <Ionicons name={action.icon} size={24} color={action.color} />
      </View>
      <ThemedText style={styles.actionLabel}>{action.label}</ThemedText>
    </TouchableOpacity>
  );

  const renderTabButton = (tabId, label, icon) => (
    <TouchableOpacity 
      style={[
        styles.tabButton, 
        activeTab === tabId && { backgroundColor: `${primaryColor}20`, borderBottomWidth: 2, borderBottomColor: primaryColor }
      ]} 
      onPress={() => setActiveTab(tabId)}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={activeTab === tabId ? primaryColor : subtextColor} 
      />
      <ThemedText 
        style={[
          styles.tabLabel, 
          { color: activeTab === tabId ? primaryColor : subtextColor }
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  // Calculate calorie percentage for the progress circle
  const caloriePercentage = nutrition.calories.current / nutrition.calories.target;
  const calorieAngle = caloriePercentage * 360;

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.animatedHeader, 
          { 
            backgroundColor, 
            opacity: headerOpacity, 
            transform: [{ translateY: headerTranslate }],
            paddingTop: insets.top,
            borderBottomColor: borderColor,
          }
        ]}
      >
        <ThemedText style={styles.headerTitle}>Dashboard</ThemedText>
      </Animated.View>

      <View style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>Hello, Alex!</ThemedText>
          <ThemedText style={styles.heading}>Your Wellness Journey</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Ionicons name="person-circle" size={36} color={primaryColor} />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabContainer, { borderBottomColor: borderColor }]}>
        {renderTabButton('today', 'Today', 'today-outline')}
        {renderTabButton('week', 'This Week', 'calendar-outline')}
        {renderTabButton('stats', 'Stats', 'stats-chart-outline')}
      </View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Nutrition Summary Card */}
        <View style={[styles.card, styles.summaryCard, { backgroundColor: cardColor }]}>
          <View style={styles.summaryHeader}>
            <ThemedText style={styles.cardTitle}>Nutrition Summary</ThemedText>
            <TouchableOpacity 
              style={styles.moreButton}
              onPress={() => navigation.navigate('Meals' as never)}
            >
              <ThemedText style={[styles.moreButtonText, { color: primaryColor }]}>Details</ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.calorieCircle}>
            <ThemedText style={styles.calorieCount}>{nutrition.calories.current}</ThemedText>
            <ThemedText style={[styles.calorieLabel, { color: subtextColor }]}>kcal</ThemedText>
            <ThemedText style={[styles.calorieTarget, { color: subtextColor }]}>of {nutrition.calories.target}</ThemedText>
            
            {/* Calorie progress circle */}
            <View style={styles.calorieRingContainer}>
              <View style={[styles.calorieRing, { borderColor: borderColor }]} />
              <View 
                style={[
                  styles.calorieProgressRing, 
                  { 
                    borderColor: primaryColor,
                    borderLeftColor: 'transparent',
                    borderBottomColor: calorieAngle > 180 ? primaryColor : 'transparent',
                    borderRightColor: calorieAngle > 90 ? primaryColor : 'transparent',
                    borderTopColor: calorieAngle > 270 ? primaryColor : 'transparent',
                    transform: [{ rotate: `${calorieAngle <= 180 ? 0 : 180}deg` }]
                  }
                ]} 
              />
              {calorieAngle > 180 && (
                <View 
                  style={[
                    styles.calorieProgressRing, 
                    { 
                      borderColor: 'transparent',
                      borderLeftColor: primaryColor,
                      borderBottomColor: calorieAngle > 270 ? primaryColor : 'transparent',
                      borderTopColor: calorieAngle > 360 ? primaryColor : 'transparent',
                      transform: [{ rotate: `${180}deg` }]
                    }
                  ]} 
                />
              )}
            </View>
          </View>

          <View style={styles.macroContainer}>
            {renderNutritionProgress('Protein', nutrition.protein, nutrition.protein.color)}
            {renderNutritionProgress('Carbs', nutrition.carbs, nutrition.carbs.color)}
            {renderNutritionProgress('Fat', nutrition.fat, nutrition.fat.color)}
            {renderNutritionProgress('Fiber', nutrition.fiber, nutrition.fiber.color)}
          </View>
        </View>

        {/* Today's Meals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Today's Meals</ThemedText>
            <TouchableOpacity 
              style={styles.moreButton}
              onPress={() => navigation.navigate('Meals' as never)}
            >
              <ThemedText style={[styles.moreButtonText, { color: primaryColor }]}>View All</ThemedText>
            </TouchableOpacity>
          </View>
          {meals.map(renderMeal)}
        </View>

        {/* Quick Actions */}
        <View style={[styles.card, styles.quickActionsCard, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.cardTitle}>Quick Actions</ThemedText>
          <View style={styles.actionButtonsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionButton}
                onPress={action.onPress}
              >
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <ThemedText style={styles.actionLabel}>{action.label}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Grocery Highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Grocery Highlights</ThemedText>
            <TouchableOpacity 
              style={styles.moreButton}
              onPress={() => navigation.navigate('Groceries' as never)}
            >
              <ThemedText style={[styles.moreButtonText, { color: primaryColor }]}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          {groceryItems.map(renderGroceryItem)}
        </View>

        {/* Community Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Community</ThemedText>
            <TouchableOpacity style={styles.moreButton}>
              <ThemedText style={[styles.moreButtonText, { color: primaryColor }]}>See All</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ThemedText style={styles.subsectionTitle}>Active Challenges</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {challenges.map(renderChallenge)}
            <TouchableOpacity style={[styles.challengeCard, styles.newChallengeCard, { backgroundColor: cardColor }]}>
              <View style={styles.newChallengeContent}>
                <View style={[styles.plusIconContainer, { backgroundColor: `${primaryColor}20` }]}>
                  <Ionicons name="add" size={30} color={primaryColor} />
                </View>
                <ThemedText style={[styles.newChallengeText, { color: primaryColor }]}>Join New Challenge</ThemedText>
              </View>
            </TouchableOpacity>
          </ScrollView>
          
          <ThemedText style={styles.subsectionTitle}>Friends</ThemedText>
          <View style={[styles.card, { backgroundColor: cardColor, padding: 16 }]}>
            <View style={styles.friendsContainer}>
              {friends.map(renderFriend)}
              <TouchableOpacity style={styles.inviteFriend}>
                <View style={[styles.inviteIconContainer, { backgroundColor: `${primaryColor}20` }]}>
                  <Ionicons name="person-add" size={20} color={primaryColor} />
                </View>
                <ThemedText style={[styles.inviteText, { color: primaryColor }]}>Invite</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Goals Widget */}
        <View style={[styles.card, { backgroundColor: cardColor, marginBottom: 20 }]}>
          <View style={styles.summaryHeader}>
            <ThemedText style={styles.cardTitle}>Your Goals</ThemedText>
            <TouchableOpacity style={styles.moreButton}>
              <ThemedText style={[styles.moreButtonText, { color: primaryColor }]}>Update</ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.goalItem}>
            <View style={[styles.goalIconContainer, { backgroundColor: errorColor }]}>
              <MaterialCommunityIcons name="weight" size={20} color="#FFF" />
            </View>
            <View style={styles.goalContent}>
              <ThemedText style={styles.goalTitle}>Weight Goal</ThemedText>
              <ThemedText style={[styles.goalValue, { color: subtextColor }]}>150 lbs (3.5 lbs to go)</ThemedText>
              <View style={[styles.progressBar, { backgroundColor: borderColor, marginTop: 8 }]}>
                <View style={[styles.progressFill, { width: '85%', backgroundColor: successColor }]} />
              </View>
            </View>
          </View>
          
          <View style={styles.goalItem}>
            <View style={[styles.goalIconContainer, { backgroundColor: primaryColor }]}>
              <Ionicons name="water" size={20} color="#FFF" />
            </View>
            <View style={styles.goalContent}>
              <ThemedText style={styles.goalTitle}>Water Intake</ThemedText>
              <ThemedText style={[styles.goalValue, { color: subtextColor }]}>6/8 glasses</ThemedText>
              <View style={[styles.progressBar, { backgroundColor: borderColor, marginTop: 8 }]}>
                <View style={[styles.progressFill, { width: '75%', backgroundColor: primaryColor }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom padding for scroll view */}
        <View style={{ height: 80 }} />
      </Animated.ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    zIndex: 100,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 16,
    opacity: 0.7,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 24,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  tabLabel: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 16,
  },
  moreButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  summaryCard: {
    padding: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  calorieCircle: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  calorieRingContainer: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calorieRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
  },
  calorieProgressRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
  },
  calorieCount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  calorieLabel: {
    fontSize: 14,
  },
  calorieTarget: {
    fontSize: 12,
    marginTop: 4,
  },
  macroContainer: {
    marginTop: 8,
  },
  progressBlock: {
    marginBottom: 12,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  mealCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 1,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 24,
    marginRight: 16,
  },
  mealTextGroup: {
    flex: 1,
  },
  mealLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
  mealTime: {
    fontSize: 12,
    opacity: 0.7,
  },
  mealName: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  calorieTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  calorieText: {
    fontWeight: '500',
    fontSize: 12,
  },
  quickActionsCard: {
    marginBottom: 24,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  challengeCard: {
    width: 220,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 1,
  },
  challengeImage: {
    width: '100%',
    height: 100,
  },
  challengeContent: {
    padding: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  challengeParticipants: {
    fontSize: 12,
    opacity: 0.7,
  },
  challengeDays: {
    fontSize: 12,
    opacity: 0.7,
  },
  newChallengeCard: {
    width: 220,
    height: 164,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChallengeContent: {
    alignItems: 'center',
  },
  plusIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  newChallengeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  friendsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendItem: {
    alignItems: 'center',
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  friendName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: 'center',
  },
  streakText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
  inviteFriend: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  inviteText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  goalItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalValue: {
    fontSize: 14,
    marginTop: 2,
  },
  groceryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 1,
  },
  groceryIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  groceryTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groceryName: {
    fontSize: 15,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  quickAction: {
    width: '30%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 1,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default DashboardScreen;
