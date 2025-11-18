import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PieChart } from 'react-native-chart-kit';
import theme from '../styles/theme';
import Card from '../components/Card';
import ScreenHeader from '../components/ScreenHeader';

const screenWidth = Dimensions.get('window').width;

export default function BudgetOverviewScreen() {
  const budgetData = [
    {
      name: 'Food',
      amount: 850,
      budget: 1000,
      color: theme.colors.chartColors[0],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 14,
    },
    {
      name: 'Transport',
      amount: 320,
      budget: 500,
      color: theme.colors.chartColors[1],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 14,
    },
    {
      name: 'Shopping',
      amount: 650,
      budget: 800,
      color: theme.colors.chartColors[2],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 14,
    },
    {
      name: 'Bills',
      amount: 1200,
      budget: 1500,
      color: theme.colors.chartColors[3],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 14,
    },
    {
      name: 'Entertainment',
      amount: 230,
      budget: 300,
      color: theme.colors.chartColors[4],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 14,
    },
  ];

  const pieChartData = budgetData.map(item => ({
    name: item.name,
    population: item.amount,
    color: item.color,
    legendFontColor: item.legendFontColor,
    legendFontSize: item.legendFontSize,
  }));

  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Budget Overview"
          subtitle="Your spending by category"
        />

        <View style={styles.content}>
          {/* Total Summary */}
          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Budget</Text>
                <Text style={styles.summaryValue}>
                  ${totalBudget.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Spent</Text>
                <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
                  ${totalSpent.toLocaleString()}
                </Text>
              </View>
            </View>
          </Card>

          {/* Pie Chart */}
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Spending Distribution</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth - 64}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={false}
            />
          </Card>

          {/* Category Details */}
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          {budgetData.map((category, index) => {
            const percentage = ((category.amount / category.budget) * 100).toFixed(0);
            const isOverBudget = category.amount > category.budget;

            return (
              <Card key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitleRow}>
                    <View
                      style={[
                        styles.categoryDot,
                        { backgroundColor: category.color }
                      ]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryAmount}>
                    ${category.amount}
                  </Text>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOverBudget
                            ? theme.colors.error
                            : category.color,
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.categoryFooter}>
                  <Text style={styles.budgetText}>
                    of ${category.budget} budget
                  </Text>
                  <Text
                    style={[
                      styles.percentageText,
                      isOverBudget && { color: theme.colors.error },
                    ]}
                  >
                    {percentage}%
                  </Text>
                </View>
              </Card>
            );
          })}
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  summaryValue: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  chartCard: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  chartTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoryCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.round,
    marginRight: theme.spacing.sm,
  },
  categoryName: {
    ...theme.typography.subtitle1,
    color: theme.colors.textPrimary,
  },
  categoryAmount: {
    ...theme.typography.h3,
    fontSize: 18,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  progressContainer: {
    marginVertical: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.borderRadius.round,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  percentageText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
});
