import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { ExpensesContext } from '../../contexts/expenses';
import Output from '../../components/Expenses/Output';
import { BottomTabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<BottomTabParamList, 'All'>;

const AllExpenses: React.FC<Props> = ({ route, navigation }) => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <Output
      expenses={expenses}
      fallback="There are no expenses"
      period="Total"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
