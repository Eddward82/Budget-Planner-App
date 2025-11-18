import React from 'react';
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

export default function HomeScreen({ navigation }) {
  const totalBudget = 5000;
  const totalSpent = 3250;
  const remaining = totalBudget - totalSpent;
  const percentageUsed = ((totalSpent / totalBudget) * 100).toFixed(0);

  const recentTransactions = [
    { id: 1, name: 'Groceries', amount: 125.50, category: 'Food', date: 'Today' },
    { id: 2, name: 'Gas', amount: 45.00, category: 'Transport', date: 'Yesterday' },
    { id: 3, name: 'Netflix', amount: 15.99, category: 'Entertainment', date: '2 days ago' },
  ];

  const categories = [
    { name: 'Food', spent: 850, budget: 1000, color: theme.colors.chartColors[0] },
    { name: 'Transport', spent: 320, budget: 500, color: theme.colors.chartColors[1] },
    { name: 'Shopping', spent: 650, budget: 800, color: theme.colors.chartColors[2] },
    { name: 'Bills', spent: 1200, budget: 1500, color: theme.colors.chartColors[3] },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Budget Planner"
          subtitle="Track your spending and save more"
        />

        {/* Budget Summary Card */}
        <View style={styles.content}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Budget</Text>
            <Text style={styles.summaryAmount}>${totalBudget.toLocaleString()}</Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${percentageUsed}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{percentageUsed}% used</Text>
            </View>

            <View style={styles.budgetRow}>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Spent</Text>
                <Text style={[styles.budgetValue, { color: theme.colors.error }]}>
                  ${totalSpent.toLocaleString()}
                </Text>
              </View>
              <View style={styles.budgetItem}>
                <Text style={styles.budgetLabel}>Remaining</Text>
                <Text style={[styles.budgetValue, { color: theme.colors.success }]}>
                  ${remaining.toLocaleString()}
                </Text>
              </View>
            </View>
          </Card>

          {/* Categories Grid */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Transactions')}
              >
                <Card style={styles.categoryCardInner}>
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: category.color }
                    ]}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryAmount}>
                    ${category.spent}
                  </Text>
                  <Text style={styles.categoryBudget}>
                    of ${category.budget}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Transactions */}
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionCategory}>
                    {transaction.category} • {transaction.date}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>
                  -${transaction.amount.toFixed(2)}
                </Text>
              </View>
            </Card>
          ))}

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              title="Add Transaction"
              onPress={() => navigation.navigate('AddTransaction')}
            />
            <View style={{ height: theme.spacing.sm }} />
            <Button
              title="View Budget Overview"
              variant="secondary"
              onPress={() => navigation.navigate('BudgetOverview')}
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
  summaryCard: {
    padding: theme.spacing.lg,
  },
  summaryLabel: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
  },
  summaryAmount: {
    ...theme.typography.h1,
    fontSize: 36,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
  },
  progressText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  budgetItem: {
    alignItems: 'center',
  },
  budgetLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  budgetValue: {
    ...theme.typography.h3,
    fontWeight: '600',
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  categoryCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  categoryCardInner: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.round,
    marginBottom: theme.spacing.sm,
  },
  categoryName: {
    ...theme.typography.subtitle2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  categoryAmount: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.textPrimary,
  },
  categoryBudget: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  transactionCard: {
    marginBottom: theme.spacing.sm,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    ...theme.typography.subtitle1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs / 2,
  },
  transactionCategory: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  transactionAmount: {
    ...theme.typography.subtitle1,
    color: theme.colors.error,
    fontWeight: '600',
  },
  actions: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
