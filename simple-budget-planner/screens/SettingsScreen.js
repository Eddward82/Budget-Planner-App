import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function SettingsScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={globalStyles.text}>Currency</Text>
          <Text style={globalStyles.textSecondary}>USD ($)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={globalStyles.text}>Language</Text>
          <Text style={globalStyles.textSecondary}>English</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={globalStyles.text}>Export Data</Text>
          <Text style={globalStyles.textSecondary}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={globalStyles.text}>Backup & Restore</Text>
          <Text style={globalStyles.textSecondary}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.settingItem}>
          <Text style={globalStyles.text}>Version</Text>
          <Text style={globalStyles.textSecondary}>1.0.0</Text>
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={globalStyles.text}>Privacy Policy</Text>
          <Text style={globalStyles.textSecondary}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={globalStyles.text}>Terms of Service</Text>
          <Text style={globalStyles.textSecondary}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={globalStyles.textSecondary}>Simple Budget Planner</Text>
        <Text style={globalStyles.textSecondary}>Made with ❤️</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  settingItem: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
});
