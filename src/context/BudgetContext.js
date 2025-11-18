import React, { createContext, useState, useContext } from 'react';

const BudgetContext = createContext();

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

export const BudgetProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'income',
      amount: 5000,
      category: 'Salary',
      description: 'Monthly salary',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'expense',
      amount: 1500,
      category: 'Rent',
      description: 'Monthly rent payment',
      date: new Date().toISOString(),
    },
    {
      id: '3',
      type: 'expense',
      amount: 300,
      category: 'Food',
      description: 'Groceries',
      date: new Date().toISOString(),
    },
  ]);

  const [budgetLimits, setBudgetLimits] = useState({
    Rent: 1500,
    Food: 500,
    Transportation: 300,
    Entertainment: 200,
    Utilities: 200,
    Shopping: 400,
    Healthcare: 300,
    Other: 500,
  });

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateBudgetLimit = (category, limit) => {
    setBudgetLimits({
      ...budgetLimits,
      [category]: parseFloat(limit),
    });
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getExpensesByCategory = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};

    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return categoryTotals;
  };

  const value = {
    transactions,
    budgetLimits,
    addTransaction,
    deleteTransaction,
    updateBudgetLimit,
    getTotalIncome,
    getTotalExpenses,
    getBalance,
    getExpensesByCategory,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
