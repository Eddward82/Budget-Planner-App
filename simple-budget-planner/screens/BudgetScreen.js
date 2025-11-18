import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useBudgetStore } from '../store/useBudgetStore';
import { formatCurrency } from '../utils/formatters';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function BudgetScreen({ navigation }) {
  const { budgets, loadBudgets } = useBudgetStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadBudgets();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Budget Management</Text>
          <Text style={styles.headerSubtitle}>Track your spending limits</Text>
        </View>

        {budgets.length === 0 ? (
          <View style={[globalStyles.card, globalStyles.centered]}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={globalStyles.text}>No budgets set</Text>
            <Text style={globalStyles.textSecondary}>Create a budget to track your spending</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {budgets.map((budget) => {
              const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
              const isOverBudget = percentage > 100;

              return (
                <View key={budget.id} style={globalStyles.card}>
                  <View style={globalStyles.spaceBetween}>
                    <View style={styles.budgetInfo}>
                      <Text style={styles.budgetIcon}>{budget.category_icon}</Text>
                      <View>
                        <Text style={globalStyles.subtitle}>{budget.category_name}</Text>
                        <Text style={globalStyles.textSecondary}>{budget.period}</Text>
                      </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={globalStyles.text}>{formatCurrency(budget.amount)}</Text>
                      <Text
                        style={[
                          globalStyles.textSecondary,
                          isOverBudget && { color: theme.colors.error }
                        ]}
                      >
                        {percentage.toFixed(0)}% used
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOverBudget ? theme.colors.error : theme.colors.success,
                        },
                      ]}
                    />
                  </View>

                  <View style={globalStyles.spaceBetween}>
                    <Text style={globalStyles.textSecondary}>
                      Spent: {formatCurrency(budget.spent || 0)}
                    </Text>
                    <Text
                      style={[
                        globalStyles.textSecondary,
                        isOverBudget && { color: theme.colors.error }
                      ]}
                    >
                      Remaining: {formatCurrency(budget.amount - (budget.spent || 0))}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddBudget')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
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
  listContainer: {
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  budgetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  budgetIcon: {
    fontSize: 32,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginVertical: theme.spacing.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});
