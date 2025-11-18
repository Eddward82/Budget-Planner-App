import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import theme from '../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';

export default function AddTransactionScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Food', icon: '🍔', color: theme.colors.chartColors[0] },
    { id: 2, name: 'Transport', icon: '🚗', color: theme.colors.chartColors[1] },
    { id: 3, name: 'Shopping', icon: '🛍️', color: theme.colors.chartColors[2] },
    { id: 4, name: 'Bills', icon: '💡', color: theme.colors.chartColors[3] },
    { id: 5, name: 'Entertainment', icon: '🎬', color: theme.colors.chartColors[4] },
    { id: 6, name: 'Health', icon: '⚕️', color: theme.colors.chartColors[5] },
    { id: 7, name: 'Other', icon: '📌', color: theme.colors.chartColors[6] },
  ];

  const handleAddTransaction = () => {
    if (!amount || !description || !selectedCategory) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Success',
      'Transaction added successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setAmount('');
            setDescription('');
            setSelectedCategory(null);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Add Transaction"
          subtitle="Record your expense"
        />

        <View style={styles.content}>
          {/* Amount Input */}
          <Card>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={theme.colors.textTertiary}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </Card>

          {/* Description Input */}
          <Card>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="What did you buy?"
              placeholderTextColor={theme.colors.textTertiary}
              value={description}
              onChangeText={setDescription}
            />
          </Card>

          {/* Category Selection */}
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Card
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && {
                      backgroundColor: category.color,
                      ...theme.shadows.lg,
                    },
                  ]}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category.id && {
                        color: theme.colors.surface,
                        fontWeight: '600',
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              title="Add Transaction"
              onPress={handleAddTransaction}
            />
            <View style={{ height: theme.spacing.sm }} />
            <Button
              title="Cancel"
              variant="secondary"
              onPress={() => navigation.goBack()}
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
  label: {
    ...theme.typography.subtitle2,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    ...theme.typography.h1,
    fontSize: 32,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.xs,
  },
  amountInput: {
    ...theme.typography.h1,
    fontSize: 32,
    color: theme.colors.textPrimary,
    flex: 1,
    padding: 0,
  },
  input: {
    ...theme.typography.body1,
    color: theme.colors.textPrimary,
    padding: 0,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: 100,
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
  },
  actions: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
