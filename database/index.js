const db = require('./db');
const { initializeDatabase } = require('./schema');
const {
  addCategory,
  getCategories,
  updateBudget,
  addTransaction,
  getTransactionsByMonth,
  getTotalSpent,
  getTotalIncome
} = require('./helpers');

module.exports = {
  db,
  initializeDatabase,
  addCategory,
  getCategories,
  updateBudget,
  addTransaction,
  getTransactionsByMonth,
  getTotalSpent,
  getTotalIncome
};
