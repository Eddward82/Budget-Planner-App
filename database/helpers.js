const db = require('./db');

/**
 * Add a new category
 * @param {string} name - Category name
 * @param {number} monthlyBudget - Monthly budget amount (optional)
 * @returns {Promise<number>} - ID of the newly created category
 */
const addCategory = (name, monthlyBudget = 0) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO categories (name, monthly_budget) VALUES (?, ?)';
    db.run(query, [name, monthlyBudget], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

/**
 * Get all categories
 * @returns {Promise<Array>} - Array of all categories
 */
const getCategories = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM categories ORDER BY name';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Update monthly budget for a category
 * @param {number} categoryId - Category ID
 * @param {number} monthlyBudget - New monthly budget amount
 * @returns {Promise<void>}
 */
const updateBudget = (categoryId, monthlyBudget) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE categories SET monthly_budget = ? WHERE id = ?';
    db.run(query, [monthlyBudget, categoryId], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Add a new transaction
 * @param {string} type - Transaction type ('income' or 'expense')
 * @param {number} categoryId - Category ID (optional for income)
 * @param {number} amount - Transaction amount
 * @param {string} date - Transaction date (ISO format)
 * @returns {Promise<number>} - ID of the newly created transaction
 */
const addTransaction = (type, categoryId, amount, date) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO transactions (type, category_id, amount, date) VALUES (?, ?, ?, ?)';
    db.run(query, [type, categoryId, amount, date], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

/**
 * Get transactions for a specific month
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {Promise<Array>} - Array of transactions for the specified month
 */
const getTransactionsByMonth = (year, month) => {
  return new Promise((resolve, reject) => {
    // Format month to be zero-padded (e.g., 01, 02, etc.)
    const monthStr = month.toString().padStart(2, '0');
    const startDate = `${year}-${monthStr}-01`;

    // Calculate end date (first day of next month)
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonthStr = nextMonth.toString().padStart(2, '0');
    const endDate = `${nextYear}-${nextMonthStr}-01`;

    const query = `
      SELECT t.*, c.name as category_name
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.date >= ? AND t.date < ?
      ORDER BY t.date DESC
    `;

    db.all(query, [startDate, endDate], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Get total spent for a specific month
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {Promise<number>} - Total amount spent
 */
const getTotalSpent = (year, month) => {
  return new Promise((resolve, reject) => {
    const monthStr = month.toString().padStart(2, '0');
    const startDate = `${year}-${monthStr}-01`;

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonthStr = nextMonth.toString().padStart(2, '0');
    const endDate = `${nextYear}-${nextMonthStr}-01`;

    const query = `
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE type = 'expense' AND date >= ? AND date < ?
    `;

    db.get(query, [startDate, endDate], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.total);
      }
    });
  });
};

/**
 * Get total income for a specific month
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {Promise<number>} - Total income amount
 */
const getTotalIncome = (year, month) => {
  return new Promise((resolve, reject) => {
    const monthStr = month.toString().padStart(2, '0');
    const startDate = `${year}-${monthStr}-01`;

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonthStr = nextMonth.toString().padStart(2, '0');
    const endDate = `${nextYear}-${nextMonthStr}-01`;

    const query = `
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions
      WHERE type = 'income' AND date >= ? AND date < ?
    `;

    db.get(query, [startDate, endDate], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.total);
      }
    });
  });
};

module.exports = {
  addCategory,
  getCategories,
  updateBudget,
  addTransaction,
  getTransactionsByMonth,
  getTotalSpent,
  getTotalIncome
};
