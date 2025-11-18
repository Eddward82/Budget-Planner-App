import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('budget.db');

// Initialize database tables
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create transactions table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          category TEXT NOT NULL,
          type TEXT NOT NULL,
          date TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => console.log('Transactions table created'),
        (_, error) => console.error('Error creating transactions table:', error)
      );

      // Create categories table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          budget REAL DEFAULT 0,
          color TEXT DEFAULT '#4CAF50'
        );`,
        [],
        () => console.log('Categories table created'),
        (_, error) => console.error('Error creating categories table:', error)
      );

      // Create settings table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          currency TEXT DEFAULT 'USD'
        );`,
        [],
        () => console.log('Settings table created'),
        (_, error) => console.error('Error creating settings table:', error)
      );

      // Insert default categories
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, budget, color) VALUES
          ('Food', 500, '#FF6B6B'),
          ('Transport', 200, '#4ECDC4'),
          ('Entertainment', 150, '#FFE66D'),
          ('Shopping', 300, '#95E1D3'),
          ('Bills', 400, '#F38181'),
          ('Other', 100, '#AA96DA');`,
        [],
        () => console.log('Default categories inserted'),
        (_, error) => console.error('Error inserting default categories:', error)
      );

      // Insert default settings
      tx.executeSql(
        `INSERT OR IGNORE INTO settings (id, currency) VALUES (1, 'USD');`,
        [],
        () => {
          console.log('Default settings inserted');
          resolve();
        },
        (_, error) => {
          console.error('Error inserting default settings:', error);
          reject(error);
        }
      );
    });
  });
};

// Add transaction
export const addTransaction = (amount, category, type, date) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO transactions (amount, category, type, date) VALUES (?, ?, ?, ?)',
        [amount, category, type, date],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Get all transactions
export const getTransactions = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM transactions ORDER BY date DESC, created_at DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Get transactions by month
export const getTransactionsByMonth = (year, month) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM transactions
         WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?
         ORDER BY date DESC`,
        [year.toString(), month.toString().padStart(2, '0')],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Get all categories
export const getCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM categories ORDER BY name',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Update category budget
export const updateCategoryBudget = (categoryName, budget) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE categories SET budget = ? WHERE name = ?',
        [budget, categoryName],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Add category
export const addCategory = (name, budget, color) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO categories (name, budget, color) VALUES (?, ?, ?)',
        [name, budget, color],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Get settings
export const getSettings = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM settings WHERE id = 1',
        [],
        (_, { rows }) => resolve(rows._array[0] || { currency: 'USD' }),
        (_, error) => reject(error)
      );
    });
  });
};

// Update currency
export const updateCurrency = (currency) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings SET currency = ? WHERE id = 1',
        [currency],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Reset all data
export const resetData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM transactions', [], () => {
        console.log('Transactions deleted');
      });
      tx.executeSql('DELETE FROM categories', [], () => {
        console.log('Categories deleted');
      });
      tx.executeSql(
        `INSERT INTO categories (name, budget, color) VALUES
          ('Food', 500, '#FF6B6B'),
          ('Transport', 200, '#4ECDC4'),
          ('Entertainment', 150, '#FFE66D'),
          ('Shopping', 300, '#95E1D3'),
          ('Bills', 400, '#F38181'),
          ('Other', 100, '#AA96DA');`,
        [],
        (_, result) => {
          console.log('Data reset complete');
          resolve(result);
        },
        (_, error) => reject(error)
      );
    });
  });
};
