import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useBudgetStore from '../store/useBudgetStore';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../styles/theme';

const SettingsScreen = () => {
  const { selectedCurrency, setCurrency, resetAppData, dashboardData } = useBudgetStore();

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  ];

  const handleCurrencyChange = (currencyCode) => {
    Alert.alert(
      'Change Currency',
      `Change currency to ${currencyCode}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change',
          onPress: () => {
            try {
              setCurrency(currencyCode);
              Alert.alert('Success', 'Currency updated successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to update currency');
            }
          },
        },
      ]
    );
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to reset all data? This will delete all transactions and reset categories to default. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            try {
              resetAppData();
              Alert.alert('Success', 'All data has been reset');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset data');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* App Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>App Statistics</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Transactions</Text>
          <Text style={styles.statValue}>
            {dashboardData.recentTransactions?.length || 0}
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Categories</Text>
          <Text style={styles.statValue}>
            {dashboardData.categorySpending?.length || 0}
          </Text>
        </View>
      </View>

      {/* Currency Settings */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Currency</Text>

        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.code}
            style={styles.currencyItem}
            onPress={() => handleCurrencyChange(currency.code)}
          >
            <View style={styles.currencyInfo}>
              <Text style={styles.currencySymbol}>{currency.symbol}</Text>
              <View>
                <Text style={styles.currencyName}>{currency.name}</Text>
                <Text style={styles.currencyCode}>{currency.code}</Text>
              </View>
            </View>

            {selectedCurrency === currency.code && (
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Danger Zone */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Danger Zone</Text>

        <TouchableOpacity style={styles.dangerButton} onPress={handleResetData}>
          <Ionicons name="warning-outline" size={24} color={colors.danger} />
          <View style={styles.dangerButtonTextContainer}>
            <Text style={styles.dangerButtonTitle}>Reset All Data</Text>
            <Text style={styles.dangerButtonSubtitle}>
              Delete all transactions and reset to defaults
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Budget Planner v1.0.0</Text>
        <Text style={styles.footerSubtext}>
          Built with React Native, Expo & Zustand
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  currencySymbol: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    width: 32,
    textAlign: 'center',
  },
  currencyName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
  },
  currencyCode: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.danger + '10',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.danger + '30',
  },
  dangerButtonTextContainer: {
    flex: 1,
  },
  dangerButtonTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.danger,
    marginBottom: spacing.xs,
  },
  dangerButtonSubtitle: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text.secondary,
  },
  footerSubtext: {
    fontSize: fontSize.sm,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
});

export default SettingsScreen;
