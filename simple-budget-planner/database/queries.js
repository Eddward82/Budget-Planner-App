import { getDatabase } from './database';

// Transaction queries
export const addTransaction = async (transaction) => {
  const db = getDatabase();
  const result = await db.runAsync(
    'INSERT INTO transactions (amount, type, category_id, description, date) VALUES (?, ?, ?, ?, ?)',
    [transaction.amount, transaction.type, transaction.category_id, transaction.description, transaction.date || new Date().toISOString()]
  );
  return result.lastInsertRowId;
};

export const getTransactions = async (limit = 50) => {
  const db = getDatabase();
  const transactions = await db.getAllAsync(
    `SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     ORDER BY t.date DESC
     LIMIT ?`,
    [limit]
  );
  return transactions;
};

export const getTransactionsByDateRange = async (startDate, endDate) => {
  const db = getDatabase();
  const transactions = await db.getAllAsync(
    `SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     WHERE t.date BETWEEN ? AND ?
     ORDER BY t.date DESC`,
    [startDate, endDate]
  );
  return transactions;
};

export const deleteTransaction = async (id) => {
  const db = getDatabase();
  await db.runAsync('DELETE FROM transactions WHERE id = ?', [id]);
};

// Category queries
export const getCategories = async (type = null) => {
  const db = getDatabase();
  if (type) {
    return await db.getAllAsync('SELECT * FROM categories WHERE type = ? ORDER BY name', [type]);
  }
  return await db.getAllAsync('SELECT * FROM categories ORDER BY type, name');
};

export const addCategory = async (category) => {
  const db = getDatabase();
  const result = await db.runAsync(
    'INSERT INTO categories (name, type, color, icon) VALUES (?, ?, ?, ?)',
    [category.name, category.type, category.color, category.icon]
  );
  return result.lastInsertRowId;
};

// Budget queries
export const addBudget = async (budget) => {
  const db = getDatabase();
  const result = await db.runAsync(
    'INSERT INTO budgets (category_id, amount, period, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
    [budget.category_id, budget.amount, budget.period, budget.start_date, budget.end_date]
  );
  return result.lastInsertRowId;
};

export const getBudgets = async () => {
  const db = getDatabase();
  const budgets = await db.getAllAsync(
    `SELECT b.*, c.name as category_name, c.color as category_color, c.icon as category_icon
     FROM budgets b
     LEFT JOIN categories c ON b.category_id = c.id
     ORDER BY b.created_at DESC`
  );
  return budgets;
};

export const getBudgetSpending = async (budgetId) => {
  const db = getDatabase();
  const budget = await db.getFirstAsync('SELECT * FROM budgets WHERE id = ?', [budgetId]);

  if (!budget) return null;

  const spending = await db.getFirstAsync(
    `SELECT SUM(amount) as total
     FROM transactions
     WHERE category_id = ? AND type = 'expense'
     AND date BETWEEN ? AND ?`,
    [budget.category_id, budget.start_date, budget.end_date]
  );

  return {
    ...budget,
    spent: spending?.total || 0,
    remaining: budget.amount - (spending?.total || 0),
  };
};

// Summary queries
export const getMonthSummary = async (year, month) => {
  const db = getDatabase();
  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

  const income = await db.getFirstAsync(
    'SELECT SUM(amount) as total FROM transactions WHERE type = "income" AND date BETWEEN ? AND ?',
    [startDate, endDate]
  );

  const expenses = await db.getFirstAsync(
    'SELECT SUM(amount) as total FROM transactions WHERE type = "expense" AND date BETWEEN ? AND ?',
    [startDate, endDate]
  );

  return {
    income: income?.total || 0,
    expenses: expenses?.total || 0,
    balance: (income?.total || 0) - (expenses?.total || 0),
  };
};

// Get category-wise expense breakdown for a specific month
export const getCategoryExpenses = async (year, month) => {
  const db = getDatabase();
  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

  const categoryExpenses = await db.getAllAsync(
    `SELECT c.id, c.name, c.color, c.icon,
            COALESCE(SUM(t.amount), 0) as total
     FROM categories c
     LEFT JOIN transactions t ON c.id = t.category_id
       AND t.type = 'expense'
       AND t.date BETWEEN ? AND ?
     WHERE c.type = 'expense'
     GROUP BY c.id, c.name, c.color, c.icon
     HAVING total > 0
     ORDER BY total DESC`,
    [startDate, endDate]
  );

  return categoryExpenses;
};

// Get total of all active monthly budgets
export const getTotalMonthlyBudgets = async () => {
  const db = getDatabase();
  const now = new Date().toISOString();

  const result = await db.getFirstAsync(
    `SELECT COALESCE(SUM(amount), 0) as total
     FROM budgets
     WHERE period = 'monthly'
     AND start_date <= ?
     AND end_date >= ?`,
    [now, now]
  );

  return result?.total || 0;
};
