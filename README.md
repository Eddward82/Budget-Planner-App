# Budget Planner App

A clean and minimal budget planner app built with React Native and Expo.

## Features

- Clean, modern UI with soft rounded cards and light shadows
- Neutral color palette with subtle gradients
- Consistent spacing system throughout the app
- Track expenses by category with visual pie charts
- Add and manage transactions
- Budget overview with spending breakdown
- Responsive design with smooth navigation

## Design System

The app uses a comprehensive design system defined in `/styles/theme.js` that includes:

- **Colors**: Neutral palette with soft, subtle accent colors
- **Typography**: Minimal font system with consistent hierarchy
- **Spacing**: 8px-based spacing scale for consistent layouts
- **Shadows**: Light, subtle shadows for depth
- **Border Radius**: Soft rounded corners throughout
- **Components**: Reusable Card, Button, and ScreenHeader components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (install with `npm install -g expo-cli`)

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
- Scan the QR code with the Expo Go app (Android/iOS)
- Or press `i` for iOS simulator
- Or press `a` for Android emulator

## Project Structure

```
Budget-Planner-App/
├── App.js                      # Main app with navigation
├── styles/
│   └── theme.js               # Design system and theme
├── components/
│   ├── Card.js                # Reusable card component
│   ├── Button.js              # Button with gradient support
│   └── ScreenHeader.js        # Simple header for screens
├── screens/
│   ├── HomeScreen.js          # Dashboard with budget summary
│   ├── TransactionsScreen.js # List of all transactions
│   ├── AddTransactionScreen.js # Add new transactions
│   └── BudgetOverviewScreen.js # Pie chart and category breakdown
└── package.json
```

## Screens

1. **Home**: Dashboard with budget summary, categories, and recent transactions
2. **Transactions**: Filterable list of all transactions
3. **Add Transaction**: Form to add new expenses with category selection
4. **Budget Overview**: Pie chart and detailed category breakdown

## Technologies Used

- React Native
- Expo
- React Navigation
- React Native Chart Kit (for pie charts)
- Expo Linear Gradient (for button gradients) 
