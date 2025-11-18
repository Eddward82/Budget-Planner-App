import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import theme from '../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';

export default function TransactionsScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'];

  const transactions = [
    {
      id: 1,
      name: 'Whole Foods Market',
      amount: 125.50,
      category: 'Food',
      date: 'Today',
      time: '2:30 PM',
      color: theme.colors.chartColors[0],
    },
    {
      id: 2,
      name: 'Shell Gas Station',
      amount: 45.00,
      category: 'Transport',
      date: 'Today',
      time: '11:15 AM',
      color: theme.colors.chartColors[1],
    },
    {
      id: 3,
      name: 'Netflix Subscription',
      amount: 15.99,
      category: 'Entertainment',
      date: 'Yesterday',
      time: '9:00 PM',
      color: theme.colors.chartColors[4],
    },
    {
      id: 4,
      name: 'Amazon Purchase',
      amount: 89.99,
      category: 'Shopping',
      date: 'Yesterday',
      time: '3:45 PM',
      color: theme.colors.chartColors[2],
    },
    {
      id: 5,
      name: 'Electricity Bill',
      amount: 150.00,
      category: 'Bills',
      date: '2 days ago',
      time: '10:00 AM',
      color: theme.colors.chartColors[3],
    },
    {
      id: 6,
      name: 'Trader Joe\'s',
      amount: 67.30,
      category: 'Food',
      date: '3 days ago',
      time: '5:20 PM',
      color: theme.colors.chartColors[0],
    },
    {
      id: 7,
      name: 'Uber Ride',
      amount: 18.50,
      category: 'Transport',
      date: '3 days ago',
      time: '8:30 AM',
      color: theme.colors.chartColors[1],
    },
    {
      id: 8,
      name: 'H&M Store',
      amount: 95.00,
      category: 'Shopping',
      date: '4 days ago',
      time: '1:15 PM',
      color: theme.colors.chartColors[2],
    },
  ];

  const filteredTransactions = selectedFilter === 'All'
    ? transactions
    : transactions.filter(t => t.category === selectedFilter);

  const totalAmount = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Transactions"
          subtitle={`${filteredTransactions.length} transactions found`}
        />

        <View style={styles.content}>
          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
              >
                <View
                  style={[
                    styles.filterChip,
                    selectedFilter === filter && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedFilter === filter && styles.filterChipTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Total Card */}
          <Card style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Spent</Text>
            <Text style={styles.totalAmount}>
              ${totalAmount.toFixed(2)}
            </Text>
            {selectedFilter !== 'All' && (
              <Text style={styles.totalSubtext}>in {selectedFilter}</Text>
            )}
          </Card>

          {/* Transactions List */}
          <Text style={styles.sectionTitle}>All Transactions</Text>
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View
                  style={[
                    styles.categoryIndicator,
                    { backgroundColor: transaction.color }
                  ]}
                />
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>
                    {transaction.name}
                  </Text>
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionCategory}>
                      {transaction.category}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaction.date} • {transaction.time}
                    </Text>
                  </View>
                </View>
                <Text style={styles.transactionAmount}>
                  -${transaction.amount.toFixed(2)}
                </Text>
              </View>
            </Card>
          ))}

          {/* Add Transaction Button */}
          <View style={styles.actions}>
            <Button
              title="Add New Transaction"
              onPress={() => navigation.navigate('AddTransaction')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
  },
  filtersContainer: {
    marginBottom: theme.spacing.md,
  },
  filtersContent: {
    paddingRight: theme.spacing.md,
  },
  filterChip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    ...theme.typography.subtitle2,
    color: theme.colors.textSecondary,
  },
  filterChipTextActive: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  totalCard: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  totalLabel: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  totalAmount: {
    ...theme.typography.h1,
    fontSize: 36,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  totalSubtext: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  transactionCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIndicator: {
    width: 4,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    ...theme.typography.subtitle1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs / 2,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionCategory: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  transactionDate: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    marginLeft: theme.spacing.xs,
  },
  transactionAmount: {
    ...theme.typography.subtitle1,
    color: theme.colors.error,
    fontWeight: '600',
    marginLeft: theme.spacing.md,
  },
  actions: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
