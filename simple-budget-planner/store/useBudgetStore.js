import { create } from 'zustand';
import {
  getTransactions,
  addTransaction as addTransactionDB,
  deleteTransaction as deleteTransactionDB,
  getCategories as getCategoriesDB,
  getBudgets as getBudgetsDB,
  addBudget as addBudgetDB,
  getMonthSummary as getMonthSummaryDB,
} from '../database/queries';

export const useBudgetStore = create((set, get) => ({
  // State
  transactions: [],
  categories: [],
  budgets: [],
  summary: { income: 0, expenses: 0, balance: 0 },
  isLoading: false,
  error: null,

  // Actions
  loadTransactions: async () => {
    try {
      set({ isLoading: true, error: null });
      const transactions = await getTransactions();
      set({ transactions, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error loading transactions:', error);
    }
  },

  addTransaction: async (transaction) => {
    try {
      set({ isLoading: true, error: null });
      const id = await addTransactionDB(transaction);
      await get().loadTransactions();
      await get().loadSummary();
      set({ isLoading: false });
      return id;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await deleteTransactionDB(id);
      await get().loadTransactions();
      await get().loadSummary();
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  loadCategories: async (type = null) => {
    try {
      set({ isLoading: true, error: null });
      const categories = await getCategoriesDB(type);
      set({ categories, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error loading categories:', error);
    }
  },

  loadBudgets: async () => {
    try {
      set({ isLoading: true, error: null });
      const budgets = await getBudgetsDB();
      set({ budgets, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error loading budgets:', error);
    }
  },

  addBudget: async (budget) => {
    try {
      set({ isLoading: true, error: null });
      const id = await addBudgetDB(budget);
      await get().loadBudgets();
      set({ isLoading: false });
      return id;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error('Error adding budget:', error);
      throw error;
    }
  },

  loadSummary: async () => {
    try {
      const now = new Date();
      const summary = await getMonthSummaryDB(now.getFullYear(), now.getMonth() + 1);
      set({ summary });
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  },

  // Initialize all data
  initializeData: async () => {
    await Promise.all([
      get().loadTransactions(),
      get().loadCategories(),
      get().loadBudgets(),
      get().loadSummary(),
    ]);
  },
}));
