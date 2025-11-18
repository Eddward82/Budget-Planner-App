import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useBudgetStore } from '../store/useBudgetStore';
import { formatCurrency, formatDate } from '../utils/formatters';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const { summary, transactions, loadSummary, loadTransactions } = useBudgetStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSummary();
      loadTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  const recentTransactions = transactions.slice(0, 5);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Overview</Text>
        <Text style={styles.headerSubtitle}>
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.income }]}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(summary.income)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.expense }]}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(summary.expenses)}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(summary.balance)}</Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={globalStyles.spaceBetween}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={globalStyles.card}>
            <Text style={globalStyles.textSecondary}>No transactions yet</Text>
          </View>
        ) : (
          recentTransactions.map((transaction) => (
            <View key={transaction.id} style={globalStyles.card}>
              <View style={globalStyles.spaceBetween}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionIcon}>{transaction.category_icon}</Text>
                  <View>
                    <Text style={globalStyles.text}>{transaction.category_name}</Text>
                    <Text style={globalStyles.textSecondary}>
                      {formatDate(transaction.date)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.type === 'income' ? theme.colors.income : theme.colors.expense }
                  ]}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </Text>
              </View>
              {transaction.description ? (
                <Text style={[globalStyles.textSecondary, { marginTop: theme.spacing.sm }]}>
                  {transaction.description}
                </Text>
              ) : null}
            </View>
          ))
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.income }]}
            onPress={() => navigation.navigate('AddTransaction', { type: 'income' })}
          >
            <Text style={styles.actionIcon}>💰</Text>
            <Text style={styles.actionText}>Add Income</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.expense }]}
            onPress={() => navigation.navigate('AddTransaction', { type: 'expense' })}
          >
            <Text style={styles.actionIcon}>💸</Text>
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
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
  headerSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  summaryContainer: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  summaryCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSize.sm,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  summaryAmount: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    marginTop: theme.spacing.xs,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  seeAllText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  transactionIcon: {
    fontSize: 32,
  },
  transactionAmount: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
});
