export type TExpenseIncome = {
  expensePercentage: number;
  expenseTotal: number;
  incomePercentage: number;
  incomeTotal: number;
};

export type TSpendingItem = {
  date: string;
  image?: any;
  name: string;
};

export type TSpending = {
  items: TSpendingItem[];
};

export type TTransactionItem = {
  amount: number;
  date: string;
  name: string;
};

export type TTransaction = {
  items: TTransactionItem[];
};
