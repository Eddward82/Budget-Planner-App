import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudget } from '../context/BudgetContext';

export default function BudgetScreen() {
  const { budgetLimits, updateBudgetLimit, getExpensesByCategory } = useBudget();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const expensesByCategory = getExpensesByCategory();

  const handleEditBudget = (category) => {
    setSelectedCategory(category);
    setNewLimit(budgetLimits[category]?.toString() || '');
    setModalVisible(true);
  };

  const handleSaveBudget = () => {
    if (newLimit && parseFloat(newLimit) > 0) {
      updateBudgetLimit(selectedCategory, newLimit);
      setModalVisible(false);
      setSelectedCategory('');
      setNewLimit('');
    }
  };

  const getProgressPercentage = (category) => {
    const spent = expensesByCategory[category] || 0;
    const limit = budgetLimits[category] || 0;
    return limit > 0 ? (spent / limit) * 100 : 0;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return '#f44336';
    if (percentage >= 80) return '#ff9800';
    return '#4CAF50';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Budget Categories</Text>
          <Text style={styles.headerSubtext}>
            Track your spending against budget limits
          </Text>
        </View>

        {Object.keys(budgetLimits).map((category) => {
          const spent = expensesByCategory[category] || 0;
          const limit = budgetLimits[category];
          const percentage = getProgressPercentage(category);
          const progressColor = getProgressColor(percentage);

          return (
            <View key={category} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <Text style={styles.categoryName}>{category}</Text>
                <TouchableOpacity
                  onPress={() => handleEditBudget(category)}
                  style={styles.editButton}
                >
                  <Ionicons name="create-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.amountContainer}>
                <Text style={styles.spentAmount}>
                  ${spent.toFixed(2)}
                  <Text style={styles.limitAmount}> / ${limit.toFixed(2)}</Text>
                </Text>
                <Text
                  style={[styles.percentageText, { color: progressColor }]}
                >
                  {percentage.toFixed(0)}%
                </Text>
              </View>

              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: progressColor,
                    },
                  ]}
                />
              </View>

              <Text style={styles.remainingText}>
                ${Math.max(limit - spent, 0).toFixed(2)} remaining
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Budget Limit</Text>
            <Text style={styles.modalCategory}>{selectedCategory}</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Monthly Limit</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={newLimit}
                  onChangeText={setNewLimit}
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveBudget}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  budgetCard: {
    backgroundColor: 'white',
    margin: 15,
    marginBottom: 0,
    marginTop: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    padding: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  spentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  limitAmount: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#999',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  remainingText: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalCategory: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
