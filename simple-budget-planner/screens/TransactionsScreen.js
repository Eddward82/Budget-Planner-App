import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useBudgetStore } from '../store/useBudgetStore';
import { formatCurrency, formatDate } from '../utils/formatters';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function TransactionsScreen({ navigation }) {
  const { transactions, loadTransactions, deleteTransaction } = useBudgetStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Transactions</Text>
          <Text style={styles.headerSubtitle}>{transactions.length} total</Text>
        </View>

        {transactions.length === 0 ? (
          <View style={[globalStyles.card, globalStyles.centered]}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={globalStyles.text}>No transactions yet</Text>
            <Text style={globalStyles.textSecondary}>Start by adding your first transaction</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {transactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={globalStyles.card}
                onLongPress={() => handleDelete(transaction.id)}
              >
                <View style={globalStyles.spaceBetween}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionIcon}>{transaction.category_icon}</Text>
                    <View>
                      <Text style={globalStyles.text}>{transaction.category_name}</Text>
                      <Text style={globalStyles.textSecondary}>
                        {formatDate(transaction.date, 'long')}
                      </Text>
                      {transaction.description ? (
                        <Text style={globalStyles.textSecondary} numberOfLines={1}>
                          {transaction.description}
                        </Text>
                      ) : null}
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
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
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
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  transactionIcon: {
    fontSize: 32,
  },
  transactionAmount: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
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
