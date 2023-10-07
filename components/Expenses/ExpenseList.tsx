import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListRenderItem, StyleSheet } from 'react-native';

import Expense from '../../model/Expense';
import ExpenseItem from './ExpenseItem';
import GlobalStyles from '../../constants/styles';

type Props = { expenses: Expense[] };

const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const renderItem: ListRenderItem<Expense> = ({ item }) => {
    const expenseProps = {
      amount: item.amount,
      date: item.date.toLocaleDateString(),
      description: item.description,
      id: item.id!,
    };

    return <ExpenseItem {...expenseProps} />;
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id!}
      renderItem={renderItem}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  item: { color: GlobalStyles.colors.primary100, fontFamily: 'Lato' },
});
