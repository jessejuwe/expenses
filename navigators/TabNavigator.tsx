import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamList } from '../types/navigation';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

import IconButton from '../components/UI/IconButton';
import GlobalStyles from '../constants/styles';

import { AuthContext } from '../contexts/auth';
import { ExpensesContext } from '../contexts/expenses';

import RecentExpenses from '../screens/Expenses/RecentExpenses';
import AllExpenses from '../screens/Expenses/AllExpenses';

const TabNavigator: React.FC = () => {
  const { allBadge, recentBadge } = useContext(ExpensesContext);
  const { logout } = useContext(AuthContext);

  return (
    <Navigator
      sceneContainerStyle={{ backgroundColor: GlobalStyles.colors.primary800 }}
      screenOptions={({ navigation, route }) => ({
        headerLeft: ({ tintColor }) => (
          <IconButton
            color={tintColor!}
            icon="exit"
            onPress={logout}
            size={22}
          />
        ),
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor!}
            icon="add"
            onPress={() => navigation.navigate('Manage')}
            size={22}
          />
        ),
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        headerTitleStyle: { fontFamily: 'Lato' },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      })}
    >
      <Screen
        name="Recent"
        component={RecentExpenses}
        options={{
          tabBarBadge: recentBadge > 0 ? recentBadge : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          tabBarLabel: 'Recent',
          title: 'Recent Expenses',
        }}
      />
      <Screen
        name="All"
        component={AllExpenses}
        options={{
          tabBarBadge: allBadge > 0 ? allBadge : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
          tabBarLabel: 'All',
          title: 'All Expenses',
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
