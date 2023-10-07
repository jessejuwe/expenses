import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Error from '../../components/UI/Error';
import Loading from '../../components/UI/Loading';
import Output from '../../components/Expenses/Output';

import { AuthContext } from '../../contexts/auth';
import { ExpensesContext } from '../../contexts/expenses';

import { fetchExpenses } from '../../utils/http';
import { getDateMinusDays } from '../../utils/dateFormatter';

import { BottomTabParamList } from '../../types/navigation';

type Props = BottomTabScreenProps<BottomTabParamList, 'Recent'>;

const RecentExpenses: React.FC<Props> = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const { token } = useContext(AuthContext);
  const { expenses, setExpenses } = useContext(ExpensesContext);

  const getExpenses = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetchExpenses(token!);
      data && setExpenses(data);
    } catch (err) {
      setError('Sorry, we could not get your expenses');
    }

    setIsLoading(false);
  }, [fetchExpenses, setExpenses, token]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const recentDate = getDateMinusDays(today, 7);

    return expense.date >= recentDate && expense.date <= today;
  });

  const errorHandler = () => React.useCallback(() => setError(null), []);

  return (
    <>
      {error && !isLoading && (
        <Error message={error} onClose={errorHandler} onRetry={getExpenses} />
      )}
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <Output
          expenses={recentExpenses}
          fallback="There are no recent expenses"
          period="Last 7 Days"
        />
      )}
    </>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
