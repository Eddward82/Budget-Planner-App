import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import theme from './styles/theme';

// Screens
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetOverviewScreen from './screens/BudgetOverviewScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';

const Tab = createBottomTabNavigator();

// Simple icon components using emoji
const TabIcon = ({ emoji, focused }) => (
  <View style={{
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.md,
    backgroundColor: focused ? theme.colors.primaryLight + '20' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Text style={{ fontSize: 20 }}>{emoji}</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: theme.colors.shadowColor,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: {
            ...theme.typography.caption,
            fontWeight: '500',
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🏠" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{
            tabBarLabel: 'Transactions',
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="📝" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ focused }) => (
              <View style={{
                width: 56,
                height: 56,
                borderRadius: theme.borderRadius.round,
                backgroundColor: focused
                  ? theme.colors.primaryDark
                  : theme.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                ...theme.shadows.lg,
              }}>
                <Text style={{ fontSize: 24, color: theme.colors.surface }}>+</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="BudgetOverview"
          component={BudgetOverviewScreen}
          options={{
            tabBarLabel: 'Budget',
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="📊" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
