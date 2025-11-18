import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { initDatabase } from './database/database';
import { useBudgetStore } from './store/useBudgetStore';
import { theme } from './styles/theme';
import { globalStyles } from './styles/globalStyles';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetScreen from './screens/BudgetScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import AddBudgetScreen from './screens/AddBudgetScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator Component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 24 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 24 }}>💳</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 24 }}>🎯</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: 24 }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const initializeData = useBudgetStore((state) => state.initializeData);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize database
        await initDatabase();

        // Load initial data
        await initializeData();

        setIsReady(true);
      } catch (e) {
        console.error('Error during app initialization:', e);
        setError(e.message);
      }
    }

    prepare();
  }, []);

  if (error) {
    return (
      <View style={globalStyles.centered}>
        <Text style={{ color: theme.colors.error, fontSize: 16 }}>
          Error: {error}
        </Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16, color: theme.colors.textSecondary }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{
            title: 'Add Transaction',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AddBudget"
          component={AddBudgetScreen}
          options={{
            title: 'Create Budget',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
