import { create } from 'zustand';
import {
  getTransactions,
  addTransaction as addTransactionDB,
  deleteTransaction as deleteTransactionDB,
  getCategories as getCategoriesDB,
  getBudgets as getBudgetsDB,
  addBudget as addBudgetDB,
  getMonthSummary as getMonthSummaryDB,
  getCategoryExpenses as getCategoryExpensesDB,
  getTotalMonthlyBudgets as getTotalMonthlyBudgetsDB,
} from '../database/queries';

export const useBudgetStore = create((set, get) => ({
  // State
  transactions: [],
  categories: [],
  budgets: [],
  summary: { income: 0, expenses: 0, balance: 0 },
  dashboardData: {
    totalIncome: 0,
    totalExpenses: 0,
    totalBudget: 0,
    remainingBudget: 0,
    categoryExpenses: [],
  },
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
      await get().calculateMonthlyTotals();
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
      await get().calculateMonthlyTotals();
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

  // Dashboard helper: Calculate monthly totals
  calculateMonthlyTotals: async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      // Get monthly summary (income and expenses)
      const summary = await getMonthSummaryDB(year, month);

      // Get total budget amount
      const totalBudget = await getTotalMonthlyBudgetsDB();

      // Calculate remaining budget
      const remainingBudget = totalBudget - summary.expenses;

      // Get category-wise expenses
      const categoryExpenses = await getCategoryExpensesDB(year, month);

      const dashboardData = {
        totalIncome: summary.income,
        totalExpenses: summary.expenses,
        totalBudget: totalBudget,
        remainingBudget: remainingBudget,
        categoryExpenses: categoryExpenses,
      };

      set({ dashboardData });
      return dashboardData;
    } catch (error) {
      console.error('Error calculating monthly totals:', error);
      throw error;
    }
  },

  // Dashboard helper: Generate pie chart data
  generatePieChartData: () => {
    const { dashboardData } = get();
    const { categoryExpenses, totalExpenses } = dashboardData;

    if (!categoryExpenses || categoryExpenses.length === 0) {
      return [];
    }

    return categoryExpenses.map((category) => ({
      name: category.name,
      amount: category.total,
      percentage: totalExpenses > 0 ? ((category.total / totalExpenses) * 100).toFixed(1) : 0,
      color: category.color,
      icon: category.icon,
    }));
  },

  // Initialize all data
  initializeData: async () => {
    await Promise.all([
      get().loadTransactions(),
      get().loadCategories(),
      get().loadBudgets(),
      get().loadSummary(),
      get().calculateMonthlyTotals(),
    ]);
  },
}));
