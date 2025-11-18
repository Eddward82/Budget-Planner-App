import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useBudgetStore from '../store/useBudgetStore';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../styles/theme';

const CategoriesScreen = () => {
  const { categories, deleteCategory, loadCategories } = useBudgetStore();
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories =
    selectedType === 'all'
      ? categories
      : categories.filter((cat) => cat.type === selectedType);

  const handleDeleteCategory = (id, name) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${name}"? This will not delete associated transactions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              deleteCategory(id);
              Alert.alert('Success', 'Category deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete category');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedType('all')}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedType === 'all' && styles.filterButtonTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === 'income' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedType('income')}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedType === 'income' && styles.filterButtonTextActive,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === 'expense' && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedType('expense')}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedType === 'expense' && styles.filterButtonTextActive,
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {filteredCategories.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color={colors.text.light} />
            <Text style={styles.emptyText}>No categories found</Text>
          </View>
        ) : (
          filteredCategories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: category.color + '20' },
                ]}
              >
                <Ionicons
                  name={category.icon || 'pricetag-outline'}
                  size={28}
                  color={category.color}
                />
              </View>

              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryType}>
                  {category.type === 'income' ? 'Income' : 'Expense'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCategory(category.id, category.name)}
              >
                <Ionicons name="trash-outline" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text.secondary,
  },
  filterButtonTextActive: {
    color: colors.text.white,
  },
  list: {
    flex: 1,
    padding: spacing.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  categoryType: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
});

export default CategoriesScreen;
