import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory-native';
import useBudgetStore from '../store/useBudgetStore';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../styles/theme';
import { formatCurrency, formatDateShort } from '../utils/formatters';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // Access Zustand store
  const {
    dashboardData,
    selectedCurrency,
    refreshDashboard,
    isLoading,
  } = useBudgetStore();

  useEffect(() => {
    // Refresh dashboard data when screen mounts
    refreshDashboard();
  }, []);

  const handleRefresh = () => {
    refreshDashboard();
  };

  // Prepare chart data
  const pieChartData = dashboardData.categorySpending
    .filter((item) => item.type === 'expense' && item.total > 0)
    .map((item) => ({
      x: item.name,
      y: item.total,
      color: item.color,
    }));

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text
          style={[
            styles.balanceAmount,
            { color: dashboardData.balance >= 0 ? colors.income : colors.expense },
          ]}
        >
          {formatCurrency(dashboardData.balance, selectedCurrency)}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.income + '20' }]}>
              <Ionicons name="arrow-down" size={20} color={colors.income} />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryAmount, { color: colors.income }]}>
                {formatCurrency(dashboardData.totalIncome, selectedCurrency)}
              </Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.expense + '20' }]}>
              <Ionicons name="arrow-up" size={20} color={colors.expense} />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryAmount, { color: colors.expense }]}>
                {formatCurrency(dashboardData.totalExpense, selectedCurrency)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Spending by Category Chart */}
      {pieChartData.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spending by Category</Text>
          <View style={styles.chartContainer}>
            <VictoryPie
              data={pieChartData}
              width={width - 32}
              height={250}
              colorScale={pieChartData.map((item) => item.color)}
              labelRadius={({ innerRadius }) => innerRadius + 30}
              style={{
                labels: { fontSize: 12, fill: colors.text.white, fontWeight: 'bold' },
              }}
              labels={({ datum }) =>
                `${((datum.y / dashboardData.totalExpense) * 100).toFixed(0)}%`
              }
            />
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {pieChartData.slice(0, 5).map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText} numberOfLines={1}>
                  {item.x}: {formatCurrency(item.y, selectedCurrency)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Recent Transactions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>

        {dashboardData.recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={colors.text.light} />
            <Text style={styles.emptyText}>No transactions yet</Text>
            <Text style={styles.emptySubtext}>Add your first transaction to get started</Text>
          </View>
        ) : (
          dashboardData.recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View
                style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.category_color + '20' },
                ]}
              >
                <Ionicons
                  name={transaction.category_icon || 'cash-outline'}
                  size={24}
                  color={transaction.category_color}
                />
              </View>

              <View style={styles.transactionDetails}>
                <Text style={styles.transactionCategory}>{transaction.category_name}</Text>
                <Text style={styles.transactionDescription} numberOfLines={1}>
                  {transaction.description || 'No description'}
                </Text>
                <Text style={styles.transactionDate}>{formatDateShort(transaction.date)}</Text>
              </View>

              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color: transaction.type === 'income' ? colors.income : colors.expense,
                  },
                ]}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount, selectedCurrency)}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  balanceLabel: {
    fontSize: fontSize.md,
    color: colors.text.white,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.white,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: colors.text.white,
    opacity: 0.8,
  },
  summaryAmount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
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
  chartContainer: {
    alignItems: 'center',
  },
  legend: {
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: fontSize.sm,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
  },
  transactionDescription: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  transactionDate: {
    fontSize: fontSize.xs,
    color: colors.text.light,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginLeft: spacing.sm,
  },
  bottomPadding: {
    height: spacing.lg,
  },
});

export default HomeScreen;
