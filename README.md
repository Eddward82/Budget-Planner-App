# Budget Planner App

A comprehensive React Native budget tracking application built with Expo, featuring income/expense tracking, category-based budgeting, and visual analytics.

## Features

- **Dashboard Screen**: View total income, expenses, and remaining budget with a pie chart breakdown by category
- **Add Transaction**: Easy form to add income or expenses with category selection and date input
- **Categories Management**: Create and manage spending categories with monthly budgets
- **Settings**: Change currency and reset data
- **SQLite Database**: Local data storage for all transactions and settings
- **Visual Analytics**: Pie charts showing spending breakdown by category
- **Tab Navigation**: Easy navigation between Home, Categories, and Settings

## Tech Stack

- React Native with Expo
- React Navigation (Tab & Stack navigators)
- Expo SQLite for local database
- React Native Chart Kit for visualizations
- React Native SVG for graphics
- Expo Vector Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## Project Structure

```
Budget-Planner-App/
├── App.js                          # Main app entry point
├── database.js                     # SQLite database utilities
├── navigation/
│   └── AppNavigator.js            # Navigation configuration
├── screens/
│   ├── HomeScreen.js              # Dashboard with budget summary
│   ├── AddTransactionScreen.js   # Add income/expense transactions
│   ├── CategoriesScreen.js        # Manage categories and budgets
│   └── SettingsScreen.js          # App settings
├── package.json
├── app.json
└── babel.config.js
```

## Usage

### Adding Transactions
1. Tap "Add Transaction" button on the home screen
2. Select transaction type (Income or Expense)
3. Enter amount
4. Choose category
5. Set date (format: YYYY-MM-DD)
6. Tap "Save Transaction"

### Managing Categories
1. Navigate to "Categories" tab
2. View existing categories and their budgets
3. Tap edit icon to modify category budget
4. Tap "Add Category" to create new categories

### Changing Settings
1. Navigate to "Settings" tab
2. Tap "Currency" to select your preferred currency
3. Use "Reset All Data" to clear all transactions (warning: irreversible)

## Default Categories

The app comes with 6 default categories:
- Food ($500 budget)
- Transport ($200 budget)
- Entertainment ($150 budget)
- Shopping ($300 budget)
- Bills ($400 budget)
- Other ($100 budget)

## Supported Currencies

- USD ($) - US Dollar
- EUR (€) - Euro
- GBP (£) - British Pound
- JPY (¥) - Japanese Yen
- INR (₹) - Indian Rupee

## Database Schema

### Transactions Table
- id (Primary Key)
- amount (Real)
- category (Text)
- type (Text: 'income' or 'expense')
- date (Text: YYYY-MM-DD format)
- created_at (DateTime)

### Categories Table
- id (Primary Key)
- name (Text, Unique)
- budget (Real)
- color (Text: hex color)

### Settings Table
- id (Primary Key, always 1)
- currency (Text)

## License

MIT 
