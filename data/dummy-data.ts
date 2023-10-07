import Expense from '../model/Expense';

export const EXPENSES: Expense[] = [
  new Expense(59.99, new Date('2022-12-19'), 'A pair of shoes', 'e1'),
  new Expense(89.29, new Date('2023-09-05'), 'A pair of trousers', 'e2'),
  new Expense(5.99, new Date('2022-12-01'), 'Some bananas', 'e3'),
  new Expense(14.99, new Date('2023-09-23'), 'A book', 'e4'),
  new Expense(18.59, new Date('2022-02-18'), 'Another book', 'e5'),
  new Expense(119.98, new Date('2023-09-26'), 'Two pairs of shoes', 'e6'),
  new Expense(178.58, new Date('2022-01-05'), 'Three pairs of trousers', 'e7'),
  new Expense(11.98, new Date('2023-09-20'), 'Extra bananas', 'e8'),
  new Expense(29.98, new Date('2023-09-25'), 'Two books', 'e9'),
  new Expense(37.18, new Date('2023-02-18'), 'More books', 'e10'),
];
