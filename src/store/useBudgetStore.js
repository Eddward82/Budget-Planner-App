import { create } from 'zustand';
import {
  initDatabase,
  getAllCategories,
  getCategoriesByType,
  addCategory as dbAddCategory,
  deleteCategory as dbDeleteCategory,
  getAllTransactions,
  getTransactionsByDateRange,
  addTransaction as dbAddTransaction,
  deleteTransaction as dbDeleteTransaction,
  updateTransaction as dbUpdateTransaction,
  getDashboardData,
  getSetting,
  setSetting as dbSetSetting,
  resetAllData,
} from '../database/database';

const useBudgetStore = create((set, get) => ({
  // State
  categories: [],
  transactions: [],
  selectedCurrency: 'USD',
  dashboardData: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categorySpending: [],
    recentTransactions: [],
  },
  isLoading: false,
  error: null,

  // Initialize store - load all data from SQLite
  initialize: async () => {
    try {
      set({ isLoading: true, error: null });

      // Initialize database tables
      initDatabase();

      // Load all data
      const categories = getAllCategories();
      const transactions = getAllTransactions();
      const currency = getSetting('currency') || 'USD';
      const dashboardData = getDashboardData();

      set({
        categories,
        transactions,
        selectedCurrency: currency,
        dashboardData,
        isLoading: false,
      });

      console.log('Budget store initialized successfully');
    } catch (error) {
      console.error('Error initializing store:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  // Category Methods
  loadCategories: () => {
    try {
      const categories = getAllCategories();
      set({ categories });
      return categories;
    } catch (error) {
      console.error('Error loading categories:', error);
      set({ error: error.message });
      return [];
    }
  },

  getCategoriesByType: (type) => {
    try {
      return getCategoriesByType(type);
    } catch (error) {
      console.error('Error getting categories by type:', error);
      return [];
    }
  },

  addCategory: (name, type, color, icon) => {
    try {
      const id = dbAddCategory(name, type, color, icon);
      const categories = getAllCategories();
      set({ categories });
      return id;
    } catch (error) {
      console.error('Error adding category:', error);
      set({ error: error.message });
      throw error;
    }
  },

  deleteCategory: (id) => {
    try {
      dbDeleteCategory(id);
      const categories = getAllCategories();
      set({ categories });
      // Refresh dashboard as category deletion affects it
      get().refreshDashboard();
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Transaction Methods
  loadTransactions: () => {
    try {
      const transactions = getAllTransactions();
      set({ transactions });
      return transactions;
    } catch (error) {
      console.error('Error loading transactions:', error);
      set({ error: error.message });
      return [];
    }
  },

  getTransactionsByDateRange: (startDate, endDate) => {
    try {
      return getTransactionsByDateRange(startDate, endDate);
    } catch (error) {
      console.error('Error getting transactions by date range:', error);
      return [];
    }
  },

  addTransaction: (amount, categoryId, type, description, date) => {
    try {
      const id = dbAddTransaction(amount, categoryId, type, description, date);

      // Refresh all related data
      const transactions = getAllTransactions();
      const dashboardData = getDashboardData();

      set({ transactions, dashboardData });

      return id;
    } catch (error) {
      console.error('Error adding transaction:', error);
      set({ error: error.message });
      throw error;
    }
  },

  deleteTransaction: (id) => {
    try {
      dbDeleteTransaction(id);

      // Refresh all related data
      const transactions = getAllTransactions();
      const dashboardData = getDashboardData();

      set({ transactions, dashboardData });

      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      set({ error: error.message });
      throw error;
    }
  },

  updateTransaction: (id, amount, categoryId, type, description, date) => {
    try {
      dbUpdateTransaction(id, amount, categoryId, type, description, date);

      // Refresh all related data
      const transactions = getAllTransactions();
      const dashboardData = getDashboardData();

      set({ transactions, dashboardData });

      return true;
    } catch (error) {
      console.error('Error updating transaction:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Dashboard Methods
  refreshDashboard: () => {
    try {
      const dashboardData = getDashboardData();
      set({ dashboardData });
      return dashboardData;
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
      set({ error: error.message });
      return null;
    }
  },

  // Settings Methods
  setCurrency: (currency) => {
    try {
      dbSetSetting('currency', currency);
      set({ selectedCurrency: currency });
      return true;
    } catch (error) {
      console.error('Error setting currency:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Reset Methods
  resetAppData: () => {
    try {
      resetAllData();

      // Reload all data
      const categories = getAllCategories();
      const transactions = getAllTransactions();
      const currency = getSetting('currency') || 'USD';
      const dashboardData = getDashboardData();

      set({
        categories,
        transactions,
        selectedCurrency: currency,
        dashboardData,
      });

      return true;
    } catch (error) {
      console.error('Error resetting app data:', error);
      set({ error: error.message });
      throw error;
    }
  },

  // Utility Methods
  clearError: () => set({ error: null }),
}));

export default useBudgetStore;
