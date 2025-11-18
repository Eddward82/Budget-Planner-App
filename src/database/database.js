import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('budgetPlanner.db');

// Initialize database tables
export const initDatabase = () => {
  try {
    // Create categories table
    db.execSync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create transactions table
    db.execSync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
    `);

    // Create settings table
    db.execSync(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL
      );
    `);

    // Insert default categories if not exists
    const categoryCount = db.getFirstSync('SELECT COUNT(*) as count FROM categories');

    if (categoryCount.count === 0) {
      const defaultCategories = [
        // Income categories
        { name: 'Salary', type: 'income', color: '#4CAF50', icon: 'wallet' },
        { name: 'Freelance', type: 'income', color: '#8BC34A', icon: 'briefcase' },
        { name: 'Investments', type: 'income', color: '#CDDC39', icon: 'trending-up' },
        { name: 'Other Income', type: 'income', color: '#9CCC65', icon: 'cash' },

        // Expense categories
        { name: 'Food & Dining', type: 'expense', color: '#F44336', icon: 'restaurant' },
        { name: 'Transportation', type: 'expense', color: '#E91E63', icon: 'car' },
        { name: 'Shopping', type: 'expense', color: '#9C27B0', icon: 'cart' },
        { name: 'Entertainment', type: 'expense', color: '#673AB7', icon: 'film' },
        { name: 'Bills & Utilities', type: 'expense', color: '#3F51B5', icon: 'receipt' },
        { name: 'Health', type: 'expense', color: '#2196F3', icon: 'medkit' },
        { name: 'Education', type: 'expense', color: '#03A9F4', icon: 'school' },
        { name: 'Other Expenses', type: 'expense', color: '#00BCD4', icon: 'ellipsis-horizontal' },
      ];

      const insertStmt = db.prepareSync(
        'INSERT INTO categories (name, type, color, icon) VALUES (?, ?, ?, ?)'
      );

      for (const category of defaultCategories) {
        insertStmt.executeSync([category.name, category.type, category.color, category.icon]);
      }
    }

    // Set default currency if not exists
    const currencySetting = db.getFirstSync("SELECT * FROM settings WHERE key = 'currency'");

    if (!currencySetting) {
      db.runSync("INSERT INTO settings (key, value) VALUES ('currency', 'USD')");
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Categories operations
export const getAllCategories = () => {
  try {
    return db.getAllSync('SELECT * FROM categories ORDER BY type, name');
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoriesByType = (type) => {
  try {
    return db.getAllSync('SELECT * FROM categories WHERE type = ? ORDER BY name', [type]);
  } catch (error) {
    console.error('Error fetching categories by type:', error);
    return [];
  }
};

export const addCategory = (name, type, color, icon) => {
  try {
    const result = db.runSync(
      'INSERT INTO categories (name, type, color, icon) VALUES (?, ?, ?, ?)',
      [name, type, color, icon]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const deleteCategory = (id) => {
  try {
    db.runSync('DELETE FROM categories WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Transactions operations
export const getAllTransactions = () => {
  try {
    return db.getAllSync(`
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.date DESC, t.created_at DESC
    `);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const getTransactionsByDateRange = (startDate, endDate) => {
  try {
    return db.getAllSync(`
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.date BETWEEN ? AND ?
      ORDER BY t.date DESC, t.created_at DESC
    `, [startDate, endDate]);
  } catch (error) {
    console.error('Error fetching transactions by date range:', error);
    return [];
  }
};

export const addTransaction = (amount, categoryId, type, description, date) => {
  try {
    const result = db.runSync(
      'INSERT INTO transactions (amount, category_id, type, description, date) VALUES (?, ?, ?, ?, ?)',
      [amount, categoryId, type, description, date]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const deleteTransaction = (id) => {
  try {
    db.runSync('DELETE FROM transactions WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const updateTransaction = (id, amount, categoryId, type, description, date) => {
  try {
    db.runSync(
      'UPDATE transactions SET amount = ?, category_id = ?, type = ?, description = ?, date = ? WHERE id = ?',
      [amount, categoryId, type, description, date, id]
    );
    return true;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Dashboard data
export const getDashboardData = () => {
  try {
    // Get total income and expenses
    const totals = db.getFirstSync(`
      SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
      FROM transactions
    `);

    // Get spending by category
    const categorySpending = db.getAllSync(`
      SELECT
        c.name,
        c.color,
        c.icon,
        c.type,
        COALESCE(SUM(t.amount), 0) as total
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id
      GROUP BY c.id, c.name, c.color, c.icon, c.type
      HAVING total > 0
      ORDER BY total DESC
    `);

    // Get recent transactions
    const recentTransactions = db.getAllSync(`
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.date DESC, t.created_at DESC
      LIMIT 10
    `);

    return {
      totalIncome: totals.total_income || 0,
      totalExpense: totals.total_expense || 0,
      balance: (totals.total_income || 0) - (totals.total_expense || 0),
      categorySpending,
      recentTransactions,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      categorySpending: [],
      recentTransactions: [],
    };
  }
};

// Settings operations
export const getSetting = (key) => {
  try {
    const result = db.getFirstSync('SELECT value FROM settings WHERE key = ?', [key]);
    return result ? result.value : null;
  } catch (error) {
    console.error('Error fetching setting:', error);
    return null;
  }
};

export const setSetting = (key, value) => {
  try {
    db.runSync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      [key, value]
    );
    return true;
  } catch (error) {
    console.error('Error setting value:', error);
    throw error;
  }
};

// Reset all data
export const resetAllData = () => {
  try {
    db.execSync('DELETE FROM transactions');
    db.execSync('DELETE FROM categories');
    db.execSync('DELETE FROM settings');

    // Reinitialize with defaults
    initDatabase();

    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    throw error;
  }
};

export default db;
