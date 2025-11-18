# Budget Planner App - Build Instructions

This document provides detailed step-by-step instructions for building the Budget Planner App for both Android and iOS platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [How to Run the Project Locally](#how-to-run-the-project-locally)
3. [Testing on Android](#testing-on-android)
4. [Testing on iPhone](#testing-on-iphone)
5. [Building Android APK via Expo](#building-android-apk-via-expo)
6. [Generating iOS Build](#generating-ios-build)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js and npm**
   - Download and install from: https://nodejs.org/
   - Recommended version: v18.0.0 or higher
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Expo CLI**
   - Install globally:
     ```bash
     npm install -g expo-cli
     ```
   - Verify installation:
     ```bash
     expo --version
     ```

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

### For Android Development

4. **Android Studio** (for emulator)
   - Download from: https://developer.android.com/studio
   - Install with default settings
   - During installation, ensure these components are selected:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

5. **Java Development Kit (JDK)**
   - JDK 11 or higher required
   - Download from: https://www.oracle.com/java/technologies/downloads/

### For iOS Development (macOS Only)

6. **Xcode** (for simulator and builds)
   - Install from Mac App Store
   - After installation, open Xcode and accept the license agreement
   - Install iOS Simulator: Xcode > Preferences > Components

7. **Apple Developer Account**
   - Required for building and distributing iOS apps
   - Sign up at: https://developer.apple.com/
   - Cost: $99/year for individual account

### For Production Builds

8. **Expo Account**
   - Sign up at: https://expo.dev/
   - Free account is sufficient for builds

9. **EAS CLI**
   - Install globally:
     ```bash
     npm install -g eas-cli
     ```

---

## How to Run the Project Locally

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Eddward82/Budget-Planner-App.git

# Navigate to the project directory
cd Budget-Planner-App
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# Or if you prefer yarn
yarn install
```

This will install all required dependencies including:
- React Native
- Expo SDK
- React Navigation
- Expo Linear Gradient
- Other project dependencies

### Step 3: Start the Development Server

```bash
# Start Expo development server
npm start

# Alternative commands
expo start
# or
yarn start
```

The Expo DevTools will open in your browser at `http://localhost:19002/`

You'll see:
- QR code for scanning with mobile devices
- Options to run on iOS simulator, Android emulator, or web browser
- Connection information

### Step 4: Keep the Development Server Running

Leave the terminal window open while developing. The server will:
- Hot reload changes automatically
- Display build logs and errors
- Provide debugging information

---

## Testing on Android

### Method 1: Using Expo Go App (Quickest Method)

This is the easiest way to test without building a standalone app.

#### Steps:

1. **Install Expo Go on Your Android Device**
   - Open Google Play Store
   - Search for "Expo Go"
   - Install the app
   - Link: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Connect to Same Wi-Fi Network**
   - Ensure your Android device and development computer are on the same Wi-Fi network
   - Disable any VPN connections

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Scan QR Code**
   - Open Expo Go app on your Android device
   - Tap "Scan QR Code"
   - Scan the QR code shown in your terminal or browser
   - The app will download and run

5. **Testing Features**
   - The app will hot reload when you make changes
   - Shake device to open developer menu
   - Access debugging tools through the menu

### Method 2: Using Android Emulator

For testing without a physical device.

#### Setup Android Emulator:

1. **Open Android Studio**
   ```bash
   # Launch Android Studio
   # On macOS: open -a "Android Studio"
   # On Windows: Find Android Studio in Start Menu
   ```

2. **Configure Android Virtual Device (AVD)**
   - Click "More Actions" > "Virtual Device Manager"
   - Or go to: Tools > Device Manager
   - Click "Create Device"

3. **Select Hardware**
   - Choose: Pixel 5 or Pixel 6 (recommended)
   - Click "Next"

4. **Select System Image**
   - Choose: Android 13.0 (Tiramisu) - API Level 33
   - Or: Android 12.0 (S) - API Level 31
   - Download the system image if needed
   - Click "Next"

5. **Verify Configuration**
   - Name your AVD: "Pixel_5_API_33" (or similar)
   - Click "Finish"

#### Running on Emulator:

1. **Start the Emulator**
   - In Android Studio Device Manager, click the Play (▶) button next to your AVD
   - Wait for the emulator to fully boot (can take 1-2 minutes)

2. **Run the App**
   ```bash
   # Start with Android flag
   npm run android

   # Or
   expo start --android
   ```

3. **App Installation**
   - Expo will automatically detect the running emulator
   - The app will be installed and launched
   - First launch may take a few minutes

4. **Development**
   - Changes will hot reload automatically
   - Press `Ctrl+M` (Windows/Linux) or `Cmd+M` (macOS) in emulator for developer menu

### Troubleshooting Android

**Emulator won't start:**
```bash
# Check if AVD is created
emulator -list-avds

# Start specific AVD from command line
emulator -avd Pixel_5_API_33
```

**App won't install:**
```bash
# Clear Metro bundler cache
expo start --clear

# Or
npm start -- --clear
```

**Connection issues:**
```bash
# Use tunnel connection instead of LAN
expo start --tunnel
```

---

## Testing on iPhone

### Method 1: Using Expo Go App (Quickest Method)

#### Steps:

1. **Install Expo Go on Your iPhone**
   - Open App Store
   - Search for "Expo Go"
   - Install the app
   - Link: https://apps.apple.com/app/expo-go/id982107779

2. **Connect to Same Wi-Fi Network**
   - Ensure your iPhone and development computer are on the same Wi-Fi network

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Scan QR Code**
   - Open Camera app on iPhone (not Expo Go)
   - Point camera at QR code shown in terminal or browser
   - Tap the notification that appears
   - App will open in Expo Go and load

5. **Testing Features**
   - Shake device to open developer menu
   - Changes will hot reload automatically

### Method 2: Using iOS Simulator (macOS Only)

For testing without a physical iPhone.

#### Setup iOS Simulator:

1. **Install Xcode**
   - Open Mac App Store
   - Search for "Xcode"
   - Install (this is a large download, 10+ GB)
   - Open Xcode after installation to complete setup
   - Accept the license agreement

2. **Install Command Line Tools**
   - Open Xcode
   - Go to: Xcode > Preferences > Locations
   - Set Command Line Tools to the latest Xcode version

3. **Install iOS Simulators**
   - Xcode > Preferences > Components
   - Download desired iOS versions (recommend latest iOS 17 and iOS 16)

#### Running on iOS Simulator:

1. **Start the Simulator**
   ```bash
   # Open default simulator
   open -a Simulator

   # Or let Expo open it automatically
   npm run ios
   ```

2. **Choose Device Type**
   - In Simulator: File > Open Simulator > iOS [version] > iPhone 14 Pro (or your preference)

3. **Run the App**
   ```bash
   # Run on iOS
   npm run ios

   # Or
   expo start --ios
   ```

4. **App Installation**
   - Expo will automatically detect the running simulator
   - The app will be installed and launched
   - First launch may take a few minutes

5. **Development**
   - Changes will hot reload automatically
   - Press `Cmd+D` in simulator for developer menu
   - Press `Cmd+R` to reload manually

### Troubleshooting iOS

**Simulator won't start:**
```bash
# Reset simulator
xcrun simctl erase all

# List available simulators
xcrun simctl list devices
```

**Command line tools not found:**
```bash
# Install command line tools
xcode-select --install
```

**Build fails:**
```bash
# Clear watchman
watchman watch-del-all

# Clear Metro cache
rm -rf $TMPDIR/metro-*

# Restart
npm start --clear
```

---

## Building Android APK via Expo

### Prerequisites

1. **Expo Account**
   - Create account at: https://expo.dev/signup
   - Verify your email

2. **EAS CLI Installation**
   ```bash
   npm install -g eas-cli
   ```

### Build Process

#### Step 1: Login to Expo

```bash
eas login
```

Enter your Expo account credentials.

#### Step 2: Configure EAS Build

```bash
# Configure EAS for your project
eas build:configure
```

This creates/updates `eas.json` with build configurations.

#### Step 3: Build Preview APK (For Testing)

```bash
# Build a preview APK (doesn't need Google Play signing)
eas build --platform android --profile preview
```

What happens:
1. Code is uploaded to Expo servers
2. Project is built in the cloud
3. You'll see build progress in terminal
4. Build typically takes 10-20 minutes

#### Step 4: Build Production APK

```bash
# Build a production APK
eas build --platform android --profile production
```

For Google Play Store distribution.

#### Step 5: Monitor Build Progress

- Build progress is shown in terminal
- Visit the link provided to see detailed build logs
- You can close terminal and check later at: https://expo.dev/accounts/[your-account]/projects/budget-planner-app/builds

#### Step 6: Download APK

Once build completes:

1. **Download Link**
   - You'll receive a download URL in terminal
   - Or visit: https://expo.dev/ > Your Project > Builds
   - Click on the completed build
   - Click "Download" button

2. **Save APK File**
   - Save to your computer
   - File name: `build-[timestamp].apk`
   - Size: typically 50-80 MB

#### Step 7: Install APK on Android Device

**Option A: Via USB**
1. Enable Developer Mode on Android:
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging:
   - Settings > Developer Options > USB Debugging
3. Connect device to computer via USB
4. Transfer APK file to device
5. Open Files app on device
6. Tap the APK file
7. Allow installation from this source
8. Tap "Install"

**Option B: Via Cloud Storage**
1. Upload APK to Google Drive / Dropbox
2. Open link on Android device
3. Download APK
4. Open downloaded file
5. Allow installation from unknown sources if prompted
6. Tap "Install"

**Option C: Direct Download**
1. Share the Expo download link to your device
2. Open link on Android browser
3. Download APK
4. Install as above

### Advanced: Build with Custom Credentials

```bash
# Build with auto-generated credentials
eas build --platform android --profile production

# Or provide your own keystore
# Edit eas.json and add credentials configuration
```

### Build Profiles Explained

The `eas.json` file contains three profiles:

1. **development**: For development builds with developer tools
2. **preview**: Quick APK builds for testing (recommended for sharing with testers)
3. **production**: Optimized builds for Google Play Store

---

## Generating iOS Build

### Prerequisites

1. **macOS Computer** - Required for iOS builds
2. **Apple Developer Account** - $99/year subscription
3. **Expo Account** - Free
4. **EAS CLI** - Installed globally

### Build Process

#### Step 1: Enroll in Apple Developer Program

1. Visit: https://developer.apple.com/programs/
2. Click "Enroll"
3. Sign in with your Apple ID
4. Complete enrollment ($99/year fee)
5. Wait for approval (usually 24-48 hours)

#### Step 2: Login to Expo

```bash
eas login
```

#### Step 3: Configure iOS Build

```bash
# Configure project for iOS
eas build:configure
```

#### Step 4: Build for iOS Simulator (Testing)

```bash
# Build for simulator (no Apple Developer account needed)
eas build --platform ios --profile development
```

This creates a build you can run in Xcode Simulator.

#### Step 5: Build for Production (App Store)

```bash
# Build for App Store distribution
eas build --platform ios --profile production
```

What happens:
1. EAS will ask for Apple credentials
2. Or you can provide credentials manually
3. Code is uploaded and built in cloud
4. Build takes 15-30 minutes typically

#### Step 6: Handle Credentials

EAS will prompt you to:

1. **Automatic Credentials (Recommended)**
   - Select "Yes" when prompted
   - EAS will generate certificates and provisioning profiles
   - Credentials are stored securely

2. **Manual Credentials**
   - Create App ID in Apple Developer Portal
   - Generate Distribution Certificate
   - Create Provisioning Profile
   - Provide to EAS

#### Step 7: Download Build

Once build completes:

1. **Download .ipa File**
   - Download link provided in terminal
   - Or visit: https://expo.dev/ > Your Project > Builds
   - Download the .ipa file

2. **Save to Mac**
   - Required for uploading to App Store

#### Step 8: Upload to App Store Connect

**Method A: Using Transporter App (Recommended)**

1. **Download Transporter**
   - Install from Mac App Store
   - Free from Apple

2. **Prepare App Store Connect**
   - Visit: https://appstoreconnect.apple.com/
   - Click "My Apps" > "+" > "New App"
   - Fill in app information:
     - Platform: iOS
     - Name: Budget Planner
     - Primary Language: English
     - Bundle ID: com.budgetplanner.app
     - SKU: budgetplanner001
   - Click "Create"

3. **Upload with Transporter**
   - Open Transporter app
   - Sign in with Apple Developer credentials
   - Drag and drop .ipa file
   - Click "Deliver"
   - Wait for upload and processing (10-30 minutes)

4. **Complete App Store Listing**
   - Return to App Store Connect
   - Click your app
   - Fill in all required information:
     - Screenshots (required for all device sizes)
     - Description
     - Keywords
     - Support URL
     - Privacy Policy URL
   - Select the uploaded build
   - Submit for review

**Method B: Using Xcode**

1. **Open Xcode**
2. **Go to Window > Organizer**
3. **Drag .ipa to Archives section**
4. **Click "Distribute App"**
5. **Select "App Store Connect"**
6. **Follow the prompts**

#### Step 9: Submit for Review

1. Complete all App Store metadata
2. Add privacy information
3. Submit for App Store review
4. Review typically takes 24-48 hours

### iOS Build Profiles

1. **development**: For running on simulator and development devices
2. **production**: For App Store submission

### Testing iOS Build Before Submission

**TestFlight Distribution:**

```bash
# Build for TestFlight
eas build --platform ios --profile production
```

After upload to App Store Connect:
1. Go to TestFlight tab
2. Add build to testing
3. Invite testers via email
4. Testers install TestFlight app
5. They can then install and test your app

---

## Building Both Platforms Simultaneously

```bash
# Build for both Android and iOS at once
eas build --platform all --profile production
```

This will:
- Queue both builds
- They run in parallel
- Save time compared to building separately

---

## Build Commands Reference

### Development
```bash
# Run locally
npm start
npm run android
npm run ios

# Clear cache
npm start --clear
expo start --clear
```

### Building APKs/Apps
```bash
# Android builds
eas build --platform android --profile preview     # Quick APK
eas build --platform android --profile production  # Production APK

# iOS builds
eas build --platform ios --profile development     # Simulator
eas build --platform ios --profile production      # App Store

# Both platforms
eas build --platform all --profile production
```

### Check Build Status
```bash
# List all builds
eas build:list

# View specific build
eas build:view [build-id]
```

---

## Troubleshooting

### General Issues

**"Metro bundler won't start"**
```bash
# Kill all Node processes
killall -9 node

# Clear caches
rm -rf node_modules
npm install
expo start --clear
```

**"Dependencies issue"**
```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Android Issues

**"Unable to connect to development server"**
```bash
# Use tunnel instead of LAN
expo start --tunnel
```

**"Build failed on EAS"**
- Check build logs at expo.dev
- Verify app.json configuration
- Ensure package.json has correct dependencies

**"Android SDK not found"**
```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### iOS Issues

**"Xcode command line tools not found"**
```bash
xcode-select --install
```

**"Provisioning profile error"**
- Let EAS manage credentials automatically
- Or manually create in Apple Developer Portal

**"Build failed on EAS"**
- Check Apple Developer account status
- Verify bundle identifier matches App ID
- Review build logs for specific errors

### EAS Build Issues

**"Build quota exceeded"**
- Free Expo accounts have limited builds per month
- Upgrade to paid plan for unlimited builds
- Or wait for quota reset

**"Authentication failed"**
```bash
# Logout and login again
eas logout
eas login
```

---

## Additional Resources

### Documentation
- Expo Documentation: https://docs.expo.dev/
- EAS Build: https://docs.expo.dev/build/introduction/
- React Native: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/

### Support
- Expo Forums: https://forums.expo.dev/
- Expo Discord: https://chat.expo.dev/
- Stack Overflow: https://stackoverflow.com/questions/tagged/expo

### Tools
- Expo Snack (Online Editor): https://snack.expo.dev/
- Expo Status: https://status.expo.dev/
- EAS Build Dashboard: https://expo.dev/

---

## Next Steps After Building

1. **Testing**
   - Test on multiple devices
   - Test all features thoroughly
   - Get feedback from beta testers

2. **App Store Submission**
   - Prepare marketing materials
   - Create screenshots and preview videos
   - Write compelling app description
   - Set pricing and availability

3. **Updates**
   - Use `eas update` for OTA updates
   - No need to resubmit for small changes
   - Major updates require new builds

4. **Monitoring**
   - Set up crash reporting
   - Monitor user reviews
   - Track app analytics

---

**Congratulations!** You now have all the information needed to build and deploy the Budget Planner App to Android and iOS devices.

For questions or issues, refer to the troubleshooting section or check the official Expo documentation.
