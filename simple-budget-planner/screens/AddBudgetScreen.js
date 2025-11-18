import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useBudgetStore } from '../store/useBudgetStore';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function AddBudgetScreen({ navigation }) {
  const { addBudget, categories, loadCategories } = useBudgetStore();

  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    loadCategories('expense');
  }, []);

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!categoryId) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    try {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      await addBudget({
        category_id: categoryId,
        amount: parseFloat(amount),
        period,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      });

      Alert.alert('Success', 'Budget created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create budget');
    }
  };

  const expenseCategories = categories.filter((cat) => cat.type === 'expense');

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={globalStyles.title}>Create Budget</Text>

        {/* Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget Amount</Text>
          <TextInput
            style={[globalStyles.input, styles.amountInput]}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Period Selector */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Period</Text>
          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[
                styles.periodButton,
                period === 'weekly' && styles.periodButtonActive,
              ]}
              onPress={() => setPeriod('weekly')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  period === 'weekly' && styles.periodButtonTextActive,
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodButton,
                period === 'monthly' && styles.periodButtonActive,
              ]}
              onPress={() => setPeriod('monthly')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  period === 'monthly' && styles.periodButtonTextActive,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodButton,
                period === 'yearly' && styles.periodButtonActive,
              ]}
              onPress={() => setPeriod('yearly')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  period === 'yearly' && styles.periodButtonTextActive,
                ]}
              >
                Yearly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoriesGrid}>
            {expenseCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  categoryId === category.id && {
                    backgroundColor: category.color,
                  },
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    categoryId === category.id && { color: '#FFFFFF' },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Create Budget</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  amountInput: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  periodButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  periodButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  categoryChip: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    minWidth: '30%',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    textAlign: 'center',
  },
});
