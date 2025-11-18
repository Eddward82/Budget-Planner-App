import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import { getTransactionsByMonth, getSettings } from '../database';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [refreshing, setRefreshing] = useState(false);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹'
  };

  const loadData = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const transactions = await getTransactionsByMonth(year, month);
      const settings = await getSettings();

      setCurrency(settings?.currency || 'USD');

      let income = 0;
      let expenses = 0;
      const categoryExpenses = {};

      transactions.forEach(transaction => {
        if (transaction.type === 'income') {
          income += parseFloat(transaction.amount);
        } else {
          expenses += parseFloat(transaction.amount);
          if (categoryExpenses[transaction.category]) {
            categoryExpenses[transaction.category].amount += parseFloat(transaction.amount);
          } else {
            categoryExpenses[transaction.category] = {
              amount: parseFloat(transaction.amount),
              color: getRandomColor()
            };
          }
        }
      });

      setTotalIncome(income);
      setTotalExpenses(expenses);

      // Prepare pie chart data
      const chartData = Object.keys(categoryExpenses).map((category, index) => ({
        name: category,
        amount: categoryExpenses[category].amount,
        color: categoryExpenses[category].color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      }));

      setCategoryData(chartData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FDCB6E', '#6C5CE7'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const remainingBudget = totalIncome - totalExpenses;
  const symbol = currencySymbols[currency] || '$';

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Dashboard</Text>
        <Text style={styles.monthText}>
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.card, styles.incomeCard]}>
          <Ionicons name="trending-up" size={24} color="#4CAF50" />
          <Text style={styles.cardLabel}>Total Income</Text>
          <Text style={styles.cardAmount}>{symbol}{totalIncome.toFixed(2)}</Text>
        </View>

        <View style={[styles.card, styles.expenseCard]}>
          <Ionicons name="trending-down" size={24} color="#F44336" />
          <Text style={styles.cardLabel}>Total Expenses</Text>
          <Text style={styles.cardAmount}>{symbol}{totalExpenses.toFixed(2)}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.budgetCard]}>
        <Ionicons
          name={remainingBudget >= 0 ? "wallet" : "alert-circle"}
          size={24}
          color={remainingBudget >= 0 ? "#2196F3" : "#FF9800"}
        />
        <Text style={styles.cardLabel}>Remaining Budget</Text>
        <Text style={[
          styles.cardAmount,
          { color: remainingBudget >= 0 ? '#4CAF50' : '#F44336' }
        ]}>
          {symbol}{remainingBudget.toFixed(2)}
        </Text>
      </View>

      {/* Pie Chart */}
      {categoryData.length > 0 ? (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Spending by Category</Text>
          <PieChart
            data={categoryData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      ) : (
        <View style={styles.emptyChart}>
          <Ionicons name="pie-chart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No expenses recorded this month</Text>
        </View>
      )}

      {/* Add Transaction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200EA',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  monthText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  incomeCard: {
    flex: 1,
    marginRight: 8,
  },
  expenseCard: {
    flex: 1,
    marginLeft: 8,
  },
  budgetCard: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyChart: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    elevation: 3,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#6200EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
