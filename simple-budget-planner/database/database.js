import * as SQLite from 'expo-sqlite';

let db = null;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('budgetplanner.db');

    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        color TEXT,
        icon TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        category_id INTEGER,
        description TEXT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );

      CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        amount REAL NOT NULL,
        period TEXT NOT NULL,
        start_date DATETIME,
        end_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
    `);

    // Insert default categories if table is empty
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM categories');
    if (result.count === 0) {
      await insertDefaultCategories();
    }

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

const insertDefaultCategories = async () => {
  const defaultCategories = [
    { name: 'Salary', type: 'income', color: '#27AE60', icon: '💰' },
    { name: 'Freelance', type: 'income', color: '#3498DB', icon: '💼' },
    { name: 'Food & Dining', type: 'expense', color: '#E74C3C', icon: '🍔' },
    { name: 'Transportation', type: 'expense', color: '#9B59B6', icon: '🚗' },
    { name: 'Shopping', type: 'expense', color: '#E67E22', icon: '🛍️' },
    { name: 'Entertainment', type: 'expense', color: '#F39C12', icon: '🎬' },
    { name: 'Bills & Utilities', type: 'expense', color: '#34495E', icon: '📄' },
    { name: 'Health', type: 'expense', color: '#1ABC9C', icon: '🏥' },
  ];

  for (const category of defaultCategories) {
    await db.runAsync(
      'INSERT INTO categories (name, type, color, icon) VALUES (?, ?, ?, ?)',
      [category.name, category.type, category.color, category.icon]
    );
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
};
