import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import Summary from './Summary';
import ExpenseList from './ExpenseList';

import GlobalStyles from '../../constants/styles';
import Expense from '../../model/Expense';

type Props = { expenses: Expense[]; fallback: string; period: string };

const Output: React.FC<Props> = ({ expenses, fallback, period }) => {
  let content = (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>{fallback}</Text>
    </View>
  );

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }

  return (
    <View style={[styles.container]}>
      <Summary period={period} expenses={expenses} />
      {content}
    </View>
  );
};

export default Output;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary800,
    flex: 1,
    padding: 18,
  },
  fallbackContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    color: GlobalStyles.colors.primary100,
    fontFamily: 'LatoBold',
    fontSize: 20,
  },
});
