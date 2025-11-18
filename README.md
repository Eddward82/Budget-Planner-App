# Budget Planner App

A modern, feature-rich budget planning mobile application built with React Native, Expo, and Zustand for state management.

## Features

- **Dashboard Overview**: View your financial summary at a glance
- **Transaction Management**: Add, view, and delete income/expense transactions
- **Category Management**: Organize transactions with customizable categories
- **Visual Analytics**: Beautiful charts showing spending patterns
- **Multi-Currency Support**: Support for USD, EUR, GBP, JPY, INR, AUD, CAD
- **Local Data Storage**: All data stored locally using SQLite
- **Global State Management**: Powered by Zustand for efficient state management

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Database**: SQLite (expo-sqlite)
- **Navigation**: React Navigation
- **Charts**: Victory Native
- **Icons**: Expo Vector Icons

## Project Structure

```
Budget-Planner-App/
├── App.js                      # Main entry point
├── src/
│   ├── screens/               # Screen components
│   │   ├── HomeScreen.js
│   │   ├── AddTransactionScreen.js
│   │   ├── CategoriesScreen.js
│   │   └── SettingsScreen.js
│   ├── components/            # Reusable components
│   ├── store/                 # Zustand store
│   │   └── useBudgetStore.js
│   ├── database/              # SQLite operations
│   │   └── database.js
│   ├── navigation/            # Navigation configuration
│   │   └── AppNavigator.js
│   ├── styles/                # Theme and styles
│   │   └── theme.js
│   └── utils/                 # Utility functions
│       └── formatters.js
├── assets/                    # Images and icons
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional but recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Budget-Planner-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Install the Expo Go app on your iOS or Android device
- Scan the QR code from the terminal
- Or press `a` for Android emulator or `i` for iOS simulator

## Zustand Store Architecture

The app uses Zustand for lightweight, scalable global state management. The store is located at `/src/store/useBudgetStore.js`.

### Store Structure

```javascript
{
  // State
  categories: [],              // All budget categories
  transactions: [],            // All transactions
  selectedCurrency: 'USD',     // Current currency
  dashboardData: {             // Dashboard metrics
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categorySpending: [],
    recentTransactions: []
  },
  isLoading: false,
  error: null,

  // Methods
  initialize(),                // Initialize app and load data from SQLite
  loadCategories(),            // Load all categories
  getCategoriesByType(type),   // Get categories by type (income/expense)
  addCategory(...),            // Add new category
  deleteCategory(id),          // Delete category
  loadTransactions(),          // Load all transactions
  getTransactionsByDateRange(start, end), // Get transactions in date range
  addTransaction(...),         // Add new transaction
  deleteTransaction(id),       // Delete transaction
  updateTransaction(...),      // Update existing transaction
  refreshDashboard(),          // Refresh dashboard data
  setCurrency(currency),       // Change currency
  resetAppData(),              // Reset all data to defaults
  clearError()                 // Clear error state
}
```

### Using the Store in Components

#### Example: Home Screen

```javascript
import useBudgetStore from '../store/useBudgetStore';

const HomeScreen = () => {
  // Access state and methods from the store
  const {
    dashboardData,
    selectedCurrency,
    refreshDashboard,
    isLoading,
  } = useBudgetStore();

  useEffect(() => {
    // Load data when component mounts
    refreshDashboard();
  }, []);

  return (
    <View>
      <Text>Balance: {dashboardData.balance}</Text>
      <Text>Currency: {selectedCurrency}</Text>
    </View>
  );
};
```

#### Example: Adding a Transaction

```javascript
import useBudgetStore from '../store/useBudgetStore';

const AddTransactionScreen = () => {
  const { addTransaction } = useBudgetStore();

  const handleSubmit = () => {
    addTransaction(
      100.50,           // amount
      1,                // categoryId
      'expense',        // type
      'Groceries',      // description
      '2025-01-15'      // date
    );
  };

  return <Button onPress={handleSubmit} title="Add Transaction" />;
};
```

## Database Schema

### Categories Table
- `id`: INTEGER PRIMARY KEY
- `name`: TEXT (category name)
- `type`: TEXT (income/expense)
- `color`: TEXT (hex color)
- `icon`: TEXT (icon name)
- `created_at`: DATETIME

### Transactions Table
- `id`: INTEGER PRIMARY KEY
- `amount`: REAL (transaction amount)
- `category_id`: INTEGER (foreign key)
- `type`: TEXT (income/expense)
- `description`: TEXT
- `date`: TEXT (ISO date string)
- `created_at`: DATETIME

### Settings Table
- `id`: INTEGER PRIMARY KEY
- `key`: TEXT UNIQUE
- `value`: TEXT

## Key Features Explained

### 1. Global State with Zustand

The app uses Zustand for simple, fast state management:
- **Lightweight**: Only ~1KB bundle size
- **No boilerplate**: Simple API without providers
- **React hooks**: Natural integration with React
- **Auto-updates**: Components re-render only when used state changes

### 2. SQLite Integration

All data is persisted locally:
- **Offline-first**: Works without internet
- **Fast queries**: Optimized database operations
- **Relational data**: Proper foreign key relationships
- **Automatic initialization**: Database created on first launch

### 3. Dashboard Analytics

Real-time financial insights:
- **Balance tracking**: Income vs Expenses
- **Category breakdown**: Pie chart visualization
- **Recent transactions**: Quick view of latest activity
- **Spending trends**: Visual representation of spending

## Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android emulator
- `npm run ios`: Run on iOS simulator
- `npm run web`: Run in web browser

## Customization

### Adding New Categories

Categories are automatically initialized with defaults. To add custom categories, use the Categories screen or call:

```javascript
const { addCategory } = useBudgetStore();
addCategory('New Category', 'expense', '#FF5722', 'cart');
```

### Changing Theme Colors

Edit `/src/styles/theme.js` to customize:
- Primary/Secondary colors
- Income/Expense colors
- Text colors
- Spacing and typography

### Adding New Currencies

Edit the currencies array in `/src/screens/SettingsScreen.js`:

```javascript
{ code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' }
```

## Troubleshooting

### Database Initialization Errors

If you encounter database errors:
1. Clear app data from device settings
2. Restart the app
3. Or use "Reset All Data" in Settings screen

### Store Not Updating

If components don't update when state changes:
1. Ensure you're using the hook: `useBudgetStore()`
2. Check that you're calling the right store method
3. Verify the method returns updated data

## Future Enhancements

- [ ] Budget goals and limits
- [ ] Recurring transactions
- [ ] Export data to CSV
- [ ] Cloud sync
- [ ] Biometric authentication
- [ ] Advanced filtering and search
- [ ] Custom date ranges for analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React Native, Expo, and Zustand**
