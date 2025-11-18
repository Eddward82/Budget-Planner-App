const db = require('./db');

// Initialize database schema
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create categories table
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          monthly_budget REAL DEFAULT 0
        )
      `, (err) => {
        if (err) {
          console.error('Error creating categories table:', err.message);
          reject(err);
        } else {
          console.log('Categories table ready');
        }
      });

      // Create transactions table
      db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
          category_id INTEGER,
          amount REAL NOT NULL,
          date TEXT NOT NULL,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('Error creating transactions table:', err.message);
          reject(err);
        } else {
          console.log('Transactions table ready');
          resolve();
        }
      });
    });
  });
};

module.exports = { initializeDatabase };
