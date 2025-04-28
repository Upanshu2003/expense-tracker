export const defaultUserData = {
  currentAmount: 5000,
  monthlyIncome: 6250,
};

export const defaultTransactions = [
  { id: '1', category: 'groceries', amount: 300, description: 'Weekly groceries', date: new Date('2024-01-15').toISOString() },
  { id: '2', category: 'utilities', amount: 200, description: 'Electricity bill', date: new Date('2024-01-14').toISOString() },
  { id: '3', category: 'entertainment', amount: 150, description: 'Movie night', date: new Date('2024-01-13').toISOString() },
  { id: '4', category: 'savings', amount: 500, description: 'Monthly savings', date: new Date('2024-01-12').toISOString() },
  { id: '5', category: 'misc', amount: 100, description: 'Miscellaneous expense', date: new Date('2024-01-11').toISOString() },
];
