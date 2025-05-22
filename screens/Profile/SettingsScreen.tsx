import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useThemeColor } from '../../hooks/useThemeColor';

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {children}
  </View>
);

type SettingsItemProps = {
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
};

const SettingsItem = ({ title, subtitle, icon, onPress, rightElement }: SettingsItemProps) => {
  const tintColor = useThemeColor({}, 'text');
  
  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingsItemLeft}>
        <MaterialIcons name={icon as any} size={24} color={tintColor} style={styles.settingsItemIcon} />
        <View>
          <ThemedText style={styles.settingsItemTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.settingsItemSubtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
      {rightElement ?? (
        onPress && <MaterialIcons name="chevron-right" size={24} color={tintColor} />
      )}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoRecommendations, setAutoRecommendations] = useState(true);
  const [autoOrdering, setAutoOrdering] = useState(false);
  
  const tintColor = useThemeColor({}, 'text');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion logic
          },
        },
      ]
    );
  };

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
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
          <View style={styles.backButton} /> {/* Spacer for alignment */}
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Account Info */}
          <SettingsSection title="Account">
            <SettingsItem
              title="Profile Image"
              icon="account-circle"
              onPress={() => {}}
            />
            <SettingsItem
              title="Display Name"
              subtitle="John Doe"
              icon="person"
              onPress={() => {}}
            />
            <SettingsItem
              title="Email Address"
              subtitle="john@example.com"
              icon="email"
              onPress={() => {}}
            />
            <SettingsItem
              title="Change Password"
              icon="lock"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Billing & Subscription */}
          <SettingsSection title="Billing & Subscription">
            <SettingsItem
              title="Current Plan"
              subtitle="Premium"
              icon="star"
              onPress={() => {}}
            />
            <SettingsItem
              title="Billing History"
              icon="receipt"
              onPress={() => {}}
            />
            <SettingsItem
              title="Payment Methods"
              icon="credit-card"
              onPress={() => {}}
            />
            <SettingsItem
              title="Enter Promo Code"
              icon="local-offer"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* App Settings */}
          <SettingsSection title="App Settings">
            <SettingsItem
              title="Dark Mode"
              icon="brightness-4"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                />
              }
            />
            <SettingsItem
              title="Push Notifications"
              icon="notifications"
              rightElement={
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                />
              }
            />
            <SettingsItem
              title="Email Notifications"
              icon="mail"
              rightElement={
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                />
              }
            />
            <SettingsItem
              title="Language"
              subtitle="English"
              icon="language"
              onPress={() => {}}
            />
            <SettingsItem
              title="Export My Data"
              icon="download"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Privacy & Permissions */}
          <SettingsSection title="Privacy & Permissions">
            <SettingsItem
              title="Auto-Recommendations"
              icon="psychology"
              rightElement={
                <Switch
                  value={autoRecommendations}
                  onValueChange={setAutoRecommendations}
                />
              }
            />
            <SettingsItem
              title="Grocery Auto-Ordering"
              icon="shopping-cart"
              rightElement={
                <Switch
                  value={autoOrdering}
                  onValueChange={setAutoOrdering}
                />
              }
            />
            <SettingsItem
              title="Privacy Policy"
              icon="privacy-tip"
              onPress={() => {}}
            />
            <SettingsItem
              title="Terms of Service"
              icon="description"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Account Actions */}
          <SettingsSection title="Account Actions">
            <SettingsItem
              title="Logout"
              icon="logout"
              onPress={handleLogout}
            />
            <SettingsItem
              title="Delete Account"
              icon="delete-forever"
              onPress={handleDeleteAccount}
            />
          </SettingsSection>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemIcon: {
    marginRight: 16,
    width: 24,
  },
  settingsItemTitle: {
    fontSize: 16,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
});
