import axios from 'axios';

import Expense from '../model/Expense';

const API_URL = 'https://expenses-23dfc-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData: Expense, token: string) {
  // prettier-ignore
  const res = await axios.post(`${API_URL}/expenses.json?auth=${token}`, expenseData);

  const id = res.data.name;

  return id;
}

export async function fetchExpenses(token: string) {
  const res = await axios.get(`${API_URL}/expenses.json?auth=${token}`);

  const expenses: Expense[] = [];

  for (const key in res.data) {
    const transformed: Expense = {
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
      id: key,
    };

    expenses.push(transformed);
  }

  return expenses;
}

// prettier-ignore
export async function updateExpense(id: string, expenseData: Expense, token: string) {
  // prettier-ignore
  const response = axios.put(`${API_URL}/expenses/${id}.json?auth=${token}`, expenseData);

  return response;
}

export async function deleteExpense(id: string, token: string) {
  const response = axios.delete(`${API_URL}/expenses/${id}.json?${token}`);

  return response;
}
