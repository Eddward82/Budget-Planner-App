# Quick Start Guide - Budget Planner App

Get up and running in 5 minutes!

## Prerequisites

Install these first:
- Node.js (v18+): https://nodejs.org/
- Expo CLI: `npm install -g expo-cli`

## Run Locally

```bash
# 1. Clone the project
git clone https://github.com/Eddward82/Budget-Planner-App.git
cd Budget-Planner-App

# 2. Install dependencies
npm install

# 3. Start the app
npm start
```

## Test on Your Phone (Easiest Way)

### Android
1. Install "Expo Go" from Google Play Store
2. Run `npm start` on your computer
3. Scan QR code with Expo Go app

### iPhone
1. Install "Expo Go" from App Store
2. Run `npm start` on your computer
3. Scan QR code with Camera app
4. Open in Expo Go

## Build APK (Android)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Build APK
eas build --platform android --profile preview

# 4. Download APK from the provided link
```

## Build iOS App

```bash
# Requires: macOS + Apple Developer Account ($99/year)

# 1. Build for production
eas build --platform ios --profile production

# 2. Download .ipa file
# 3. Upload to App Store Connect using Transporter app
```

## Need Help?

- Full setup instructions: See [README.md](README.md)
- Detailed build guide: See [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)
- Expo Docs: https://docs.expo.dev/

## Common Commands

```bash
npm start          # Start development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator (macOS only)
expo start --clear # Clear cache and restart
```

## Project Structure

```
├── App.js                 # Main navigation
├── src/
│   ├── screens/          # All app screens
│   │   ├── HomeScreen.js
│   │   ├── TransactionsScreen.js
│   │   ├── AddTransactionScreen.js
│   │   └── BudgetScreen.js
│   └── context/
│       └── BudgetContext.js  # State management
```

## Features

- Track income and expenses
- Set budget limits by category
- View spending progress
- Filter and manage transactions
- Beautiful, intuitive UI

That's it! You're ready to start developing. 🚀
