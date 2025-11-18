# Simple Budget Planner

A clean, minimal, and modern budget planning mobile app built with React Native and Expo.

## Features

- 📊 Track income and expenses
- 🎯 Set budgets by category
- 💰 View financial summary
- 📱 Clean and intuitive UI
- 💾 Local SQLite database storage
- 🚀 Fast and responsive

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Zustand
- **Database**: SQLite (expo-sqlite)
- **UI**: Custom minimal design with theme system

## Project Structure

```
simple-budget-planner/
├── App.js                      # Main app entry with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
│
├── screens/                    # All screen components
│   ├── HomeScreen.js          # Dashboard with summary
│   ├── TransactionsScreen.js  # Transaction list
│   ├── BudgetScreen.js        # Budget management
│   ├── SettingsScreen.js      # App settings
│   ├── AddTransactionScreen.js
│   └── AddBudgetScreen.js
│
├── components/                 # Reusable components (empty for now)
│
├── database/                   # Database setup and queries
│   ├── database.js            # SQLite initialization
│   └── queries.js             # Database queries
│
├── store/                      # State management
│   └── useBudgetStore.js      # Zustand store
│
├── utils/                      # Utility functions
│   └── formatters.js          # Currency and date formatters
│
└── styles/                     # Styling
    ├── theme.js               # Theme configuration
    └── globalStyles.js        # Global styles
```

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (optional, but recommended)

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd simple-budget-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - **iOS**: Press `i` in the terminal or scan the QR code with the Camera app
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web**: Press `w` in the terminal

## Usage

### Adding Transactions

1. Navigate to the Home screen
2. Tap "Add Income" or "Add Expense"
3. Enter the amount, select a category, and add a description (optional)
4. Tap "Add Transaction"

### Creating Budgets

1. Navigate to the Budget tab
2. Tap the "+" button
3. Set the budget amount, select a period (weekly/monthly/yearly), and choose a category
4. Tap "Create Budget"

### Viewing Transactions

1. Navigate to the Transactions tab
2. View all transactions sorted by date
3. Long-press any transaction to delete it

## Database Schema

### Tables

- **categories**: Transaction categories (income/expense)
- **transactions**: All financial transactions
- **budgets**: Budget limits by category

### Default Categories

**Income:**
- 💰 Salary
- 💼 Freelance

**Expenses:**
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 📄 Bills & Utilities
- 🏥 Health

## Customization

### Theme

Edit `styles/theme.js` to customize colors, spacing, and typography:

```javascript
export const theme = {
  colors: {
    primary: '#4A90E2',    // Change primary color
    secondary: '#50C878',   // Change secondary color
    // ... more colors
  },
  // ... spacing, fonts, etc.
};
```

### Adding New Categories

Categories are automatically populated on first launch. To add more, you can insert them directly into the SQLite database or modify the `insertDefaultCategories` function in `database/database.js`.

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## Building for Production

### Android (APK)

```bash
npx expo build:android
```

### iOS (IPA)

```bash
npx expo build:ios
```

### Using EAS Build (Recommended)

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Troubleshooting

### Database Issues

If you encounter database errors, try:
1. Clearing the app data
2. Uninstalling and reinstalling the app
3. Running `npx expo start -c` to clear the cache

### Navigation Issues

Make sure all navigation dependencies are properly installed:
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
```

## Future Enhancements

- [ ] Data export (CSV/PDF)
- [ ] Charts and analytics
- [ ] Recurring transactions
- [ ] Multiple accounts
- [ ] Cloud sync
- [ ] Dark mode
- [ ] Notifications for budget limits

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

Made with ❤️ using React Native and Expo
