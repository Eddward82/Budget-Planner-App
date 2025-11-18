const {
  initializeDatabase,
  addCategory,
  getCategories,
  updateBudget,
  addTransaction,
  getTransactionsByMonth,
  getTotalSpent,
  getTotalIncome
} = require('./index');

// Test the database setup
async function testDatabase() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();

    console.log('\n--- Testing Categories ---');

    // Add categories
    const foodId = await addCategory('Food', 500);
    console.log('Added Food category with ID:', foodId);

    const transportId = await addCategory('Transport', 200);
    console.log('Added Transport category with ID:', transportId);

    const entertainmentId = await addCategory('Entertainment', 150);
    console.log('Added Entertainment category with ID:', entertainmentId);

    // Get all categories
    const categories = await getCategories();
    console.log('\nAll categories:', categories);

    // Update budget
    await updateBudget(foodId, 600);
    console.log('\nUpdated Food budget to 600');

    console.log('\n--- Testing Transactions ---');

    // Add some transactions
    const today = new Date().toISOString().split('T')[0];

    await addTransaction('income', null, 5000, today);
    console.log('Added income transaction');

    await addTransaction('expense', foodId, 50.25, today);
    console.log('Added food expense');

    await addTransaction('expense', transportId, 30.00, today);
    console.log('Added transport expense');

    await addTransaction('expense', entertainmentId, 75.50, today);
    console.log('Added entertainment expense');

    // Get transactions for current month
    const now = new Date();
    const transactions = await getTransactionsByMonth(now.getFullYear(), now.getMonth() + 1);
    console.log('\nTransactions for current month:', transactions);

    // Get totals
    const totalSpent = await getTotalSpent(now.getFullYear(), now.getMonth() + 1);
    console.log('\nTotal spent this month:', totalSpent);

    const totalIncome = await getTotalIncome(now.getFullYear(), now.getMonth() + 1);
    console.log('Total income this month:', totalIncome);

    console.log('\n✅ Database setup and all functions working correctly!');

    process.exit(0);
  } catch (error) {
    console.error('Error testing database:', error);
    process.exit(1);
  }
}

testDatabase();
