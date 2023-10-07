import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Error from '../../components/UI/Error';
import ExpenseForm from '../../components/Expenses/Form/ExpenseForm';
import IconButton from '../../components/UI/IconButton';
import Loading from '../../components/UI/Loading';

import GlobalStyles from '../../constants/styles';

import { AuthContext } from '../../contexts/auth';
import { ExpensesContext } from '../../contexts/expenses';

import Expense from '../../model/Expense';
import { deleteExpense, updateExpense, storeExpense } from '../../utils/http';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Manage'>;

const ManageExpense: React.FC<Props> = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>();

  const ctx = useContext(ExpensesContext);
  const { token } = useContext(AuthContext);

  const { addExpense, removeExpense } = ctx;

  const id = route.params?.id;

  const isEditing = !!id;

  const selectedExpense = ctx.expenses.find(expense => expense.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const cancelHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // prettier-ignore
  const confirmHandler = useCallback(async (expenseData: Expense) => {
    setIsSubmitting(true);

    try {
      if(isEditing) {
        ctx.updateExpense(expenseData, id);
        await updateExpense(id, expenseData, token!);
      } else {
        const id = await storeExpense(expenseData, token!);
        addExpense({...expenseData, id});
      }

      navigation.goBack();
    } catch (err: any) {
      setError('Sorry, we could not save your request')
      setIsSubmitting(false);
    }  
  }, [addExpense, ctx.updateExpense, id, isEditing, navigation, storeExpense, token, updateExpense]);

  const deleteHandler = useCallback(async () => {
    setIsSubmitting(true);

    try {
      await deleteExpense(id!, token!);
      removeExpense(id!);
      navigation.goBack();
    } catch (err: any) {
      setError('Sorry, we could not delete this expense');
      setIsSubmitting(false);
    }
  }, [deleteExpense, id, navigation, removeExpense, token]);

  const errorHandler = () => React.useCallback(() => setError(null), []);

  if (isSubmitting) return <Loading />;
  if (error && !isSubmitting) {
    return <Error message={error} onClose={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        btnLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            color={GlobalStyles.colors.error500}
            icon="trash"
            onPress={deleteHandler}
            size={36}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary800,
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    marginTop: 16,
    paddingTop: 8,
  },
});
