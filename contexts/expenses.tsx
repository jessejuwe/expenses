import React, { useCallback, useReducer, useState } from 'react';

import Expense from '../model/Expense';
import { getDateMinusDays } from '../utils/dateFormatter';

type Props = { children: React.ReactNode };

interface ContextObj {
  allBadge: number;
  recentBadge: number;
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  setExpenses: (expense: Expense[]) => void;
  updateExpense: (expense: Expense, id: string) => void;
}

export const ExpensesContext = React.createContext<ContextObj>({
  allBadge: 0,
  recentBadge: 0,
  expenses: [],
  addExpense: (expense: Expense) => {},
  removeExpense: (id: string) => {},
  setExpenses: (expense: Expense[]) => {},
  updateExpense: (expense: Expense, id: string) => {},
});

// An enum with all the types of actions to use in our reducer
enum ActionKind {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  SET = 'SET',
  UPDATE = 'UPDATE',
}

// An interface for our actions
interface ExpenseAction {
  type: ActionKind;
  payload?: { expense?: Expense; expenses?: Expense[]; id?: string };
}

// Our reducer function that uses a switch statement to handle our actions
const expenseReducer = (state: Expense[], action: ExpenseAction) => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.ADD:
      const updatedState = [{ ...payload!.expense! }, ...state];

      return updatedState;

    case ActionKind.REMOVE:
      return state.filter(expense => expense.id !== payload!.id);

    case ActionKind.SET:
      return [...payload!.expenses!].reverse();

    case ActionKind.UPDATE:
      // prettier-ignore
      const foundIndex = state.findIndex(exp => exp.id === payload!.id);

      // const updatableExpense = state[foundIndex]; // BUG
      // const updatedItem = { ...updatableExpense!, ...payload!.expense! }; // BUG: no id is passed

      const updatedItem = { ...payload!.expense!, id: payload!.id };
      const updatedExpenses = [...state];

      updatedExpenses[foundIndex] = updatedItem;

      return updatedExpenses;

    default:
      return state;
  }
};

const initialState: Expense[] = [];

const ExpensesContextProvider: React.FC<Props> = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, initialState);

  const [allBadge, setAllBadge] = useState(expenses.length);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [recentBadge, setRecentBadge] = useState(recentExpenses.length);

  const setExpenses = useCallback(
    (expenses: Expense[]) => {
      dispatch({ type: ActionKind.SET, payload: { expenses } });

      expenses && setAllBadge(expenses.length);

      const recent = expenses.filter(expense => {
        const today = new Date();
        const recentDate = getDateMinusDays(today, 7);

        return expense.date >= recentDate && expense.date <= today;
      });

      setRecentExpenses(recent);
      setRecentBadge(recent.length);
    },
    [dispatch, expenses]
  );

  const addExpense = useCallback(
    (expense: Expense) => {
      const foundExpense = expenses.find(exp => exp.id === expense.id);

      !foundExpense && dispatch({ type: ActionKind.ADD, payload: { expense } });

      setAllBadge(prevState => prevState + 1);

      const today = new Date();
      const recentDate = getDateMinusDays(today, 7);

      if (expense.date >= recentDate && expense.date <= today) {
        setRecentBadge(prevState => prevState + 1);
      }
    },
    [dispatch, expenses]
  );

  const removeExpense = useCallback(
    (id: string) => {
      dispatch({ type: ActionKind.REMOVE, payload: { id } });

      setAllBadge(prevState => prevState - 1);

      const foundExpense = recentExpenses.find(exp => exp.id === id);

      foundExpense && setRecentBadge(prevState => prevState - 1);
    },
    [dispatch, recentExpenses]
  );

  const updateExpense = useCallback(
    (expense: Expense, id: string) => {
      const foundExpense = expenses.find(exp => exp.id === id);

      // prettier-ignore
      foundExpense && dispatch({ type: ActionKind.UPDATE, payload: { expense, id } });
    },
    [dispatch, expenses]
  );

  const contextValue: ContextObj = {
    allBadge,
    recentBadge,
    expenses,
    addExpense,
    removeExpense,
    setExpenses,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
