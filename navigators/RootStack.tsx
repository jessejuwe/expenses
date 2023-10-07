import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExpensesContextProvider from '../contexts/expenses';

import TabNavigator from './TabNavigator';

import GlobalStyles from '../constants/styles';
import ManageExpense from '../screens/Expenses/ManageExpense';
import { RootStackParamList } from '../types/navigation';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const RootStack: React.FC<Props> = props => {
  return (
    <ExpensesContextProvider>
      <Navigator
        initialRouteName="Tabs"
        screenOptions={{
          contentStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTitleStyle: { fontFamily: 'Lato' },
          headerTintColor: '#fff',
          presentation: 'modal',
        }}
      >
        <Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Screen name="Manage" component={ManageExpense} />
      </Navigator>
    </ExpensesContextProvider>
  );
};

export default RootStack;
