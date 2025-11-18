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

export default function AddTransactionScreen({ navigation, route }) {
  const { addTransaction, categories, loadCategories } = useBudgetStore();
  const initialType = route.params?.type || 'expense';

  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = categories.filter((cat) => cat.type === type);

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
      await addTransaction({
        amount: parseFloat(amount),
        type,
        category_id: categoryId,
        description,
        date: new Date().toISOString(),
      });

      Alert.alert('Success', 'Transaction added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction');
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={globalStyles.title}>Add Transaction</Text>

        {/* Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
            onPress={() => {
              setType('expense');
              setCategoryId(null);
            }}
          >
            <Text
              style={[
                styles.typeButtonText,
                type === 'expense' && styles.typeButtonTextActive,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
            onPress={() => {
              setType('income');
              setCategoryId(null);
            }}
          >
            <Text
              style={[
                styles.typeButtonText,
                type === 'income' && styles.typeButtonTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={[globalStyles.input, styles.amountInput]}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {filteredCategories.map((category) => (
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
          </ScrollView>
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[globalStyles.input, styles.descriptionInput]}
            placeholder="Add a note..."
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  typeButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
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
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  categoryChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
});
