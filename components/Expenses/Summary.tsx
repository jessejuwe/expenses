import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import GlobalStyles from '../../constants/styles';

import Expense from '../../model/Expense';

type Props = { period: string; expenses: Expense[] };

const Summary: React.FC<Props> = ({ period, expenses }) => {
  const sumTotal = expenses.reduce((prev, curr) => prev + curr.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sumTotal}>${sumTotal.toFixed(2)}</Text>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  period: {
    color: GlobalStyles.colors.primary400,
    fontFamily: 'Lato',
    fontSize: 12,
  },
  sumTotal: {
    color: GlobalStyles.colors.primary500,
    fontFamily: 'LatoBold',
    fontSize: 16,
  },
});
