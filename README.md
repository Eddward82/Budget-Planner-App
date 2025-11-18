# Budget Planner App

A beautiful, intuitive mobile budget planner application built with React Native and Expo. Track your income, expenses, and stay within your budget limits with ease.

![Budget Planner App](https://img.shields.io/badge/React%20Native-0.74.5-blue)
![Expo](https://img.shields.io/badge/Expo-~51.0.0-black)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Dashboard Overview**: View your current balance, total income, and expenses at a glance
- **Transaction Management**: Add, view, and delete income and expense transactions
- **Category-based Tracking**: Organize transactions by customizable categories
- **Budget Limits**: Set monthly budget limits for different expense categories
- **Visual Progress Tracking**: Monitor spending with color-coded progress bars
- **Filter Transactions**: Filter transactions by type (all, income, or expenses)
- **Beautiful UI**: Clean, modern interface with gradient effects and smooth animations

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **React Navigation** - Navigation between screens
- **Context API** - State management
- **Expo Linear Gradient** - Beautiful gradient effects
- **Expo Vector Icons** - Icon library

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Expo CLI** - Install globally: `npm install -g expo-cli`
- **Git** - Version control system

### For iOS Development:
- **macOS** computer
- **Xcode** (latest version)
- **iOS Simulator** or physical iPhone
- **Apple Developer Account** (for building and distribution)

### For Android Development:
- **Android Studio** with Android SDK
- **Android Emulator** or physical Android device
- **Java Development Kit (JDK)** 11 or higher

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Eddward82/Budget-Planner-App.git
cd Budget-Planner-App
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm start
# or
yarn start
# or
expo start
```

This will start the Expo development server and open the Expo DevTools in your browser.

## Testing on Devices

### Testing on Android

#### Option 1: Using Expo Go App (Recommended for Quick Testing)

1. Install **Expo Go** from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Make sure your Android device and computer are on the same Wi-Fi network
3. Run `npm start` in the project directory
4. Scan the QR code displayed in the terminal or Expo DevTools using the Expo Go app
5. The app will load and run on your device

#### Option 2: Using Android Emulator

1. Install **Android Studio** from [developer.android.com](https://developer.android.com/studio)
2. Open Android Studio and go to **Tools > AVD Manager**
3. Create a new Virtual Device (recommended: Pixel 5 with Android 13)
4. Start the emulator
5. Run the following command:
   ```bash
   npm run android
   # or
   expo start --android
   ```
6. The app will automatically install and launch on the emulator

### Testing on iPhone/iOS

#### Option 1: Using Expo Go App (Recommended for Quick Testing)

1. Install **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Make sure your iPhone and computer are on the same Wi-Fi network
3. Run `npm start` in the project directory
4. Scan the QR code displayed in the terminal or Expo DevTools using the Camera app
5. Tap the notification to open in Expo Go
6. The app will load and run on your iPhone

#### Option 2: Using iOS Simulator (macOS only)

1. Install **Xcode** from the Mac App Store
2. Open Xcode and go to **Xcode > Preferences > Locations**
3. Ensure Command Line Tools is set to the current Xcode version
4. Run the following command:
   ```bash
   npm run ios
   # or
   expo start --ios
   ```
5. The iOS Simulator will launch automatically with the app

## Building for Production

For production builds, you'll need to set up **EAS (Expo Application Services)**.

### Initial EAS Setup

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```bash
   eas login
   ```

3. Configure your project:
   ```bash
   eas build:configure
   ```

### Building Android APK

#### Build APK for Testing/Distribution

```bash
# Build a preview APK
eas build --platform android --profile preview

# Build a production APK
eas build --platform android --profile production
```

The build process will:
1. Upload your project to Expo servers
2. Build the APK in the cloud
3. Provide a download link when complete

#### Download and Install APK

1. After the build completes, you'll receive a download URL
2. Download the APK file to your computer
3. Transfer it to your Android device
4. Enable "Install from Unknown Sources" in your device settings
5. Open the APK file on your device to install

### Building iOS App

#### Prerequisites for iOS Build

- **Apple Developer Account** ($99/year)
- **App Store Connect** access
- **macOS** computer (for local builds)

#### Build iOS App

```bash
# Build for iOS simulator (testing)
eas build --platform ios --profile development

# Build for production (App Store)
eas build --platform ios --profile production
```

#### For App Store Distribution:

1. Create an App ID in [Apple Developer Portal](https://developer.apple.com/)
2. Create a provisioning profile
3. Run the production build command
4. Download the `.ipa` file when the build completes
5. Upload to App Store Connect using **Transporter** app or Xcode

### Build Both Platforms Simultaneously

```bash
eas build --platform all
```

## Project Structure

```
Budget-Planner-App/
├── App.js                      # Main app component with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── eas.json                    # EAS Build configuration
├── babel.config.js             # Babel configuration
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Dashboard with balance overview
│   │   ├── TransactionsScreen.js  # List of all transactions
│   │   ├── AddTransactionScreen.js  # Add new transaction
│   │   └── BudgetScreen.js     # Budget limits and tracking
│   └── context/
│       └── BudgetContext.js    # Global state management
└── assets/                     # Images, icons, and fonts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser
- `npm run build:android` - Build Android APK with EAS
- `npm run build:ios` - Build iOS app with EAS
- `npm run build:all` - Build for both platforms

## Configuration

### Customizing App Information

Edit `app.json` to customize:
- App name
- Splash screen
- Icon
- Bundle identifiers
- App version

### Customizing Categories

Edit the `CATEGORIES` object in `src/screens/AddTransactionScreen.js` to add or remove transaction categories.

Edit the initial `budgetLimits` in `src/context/BudgetContext.js` to set default budget limits.

## Troubleshooting

### Common Issues

**Issue: "Unable to resolve module"**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start --clear
```

**Issue: "Metro bundler not starting"**
```bash
# Kill existing Metro process and restart
killall -9 node
npm start
```

**Issue: "Android build fails"**
- Ensure you have accepted Android SDK licenses: `cd ~/Android/Sdk/tools/bin && ./sdkmanager --licenses`
- Update Android Studio and SDK tools

**Issue: "iOS simulator not found"**
- Open Xcode and install iOS simulators: **Xcode > Preferences > Components**

### Getting Help

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Budget Planner App - A personal finance management solution

---

**Note**: This is an MVP (Minimum Viable Product). Features like data persistence (AsyncStorage/Database), cloud sync, charts, and notifications can be added in future updates.
