import { Expense } from '@/graphql/generated/graphql';

export function formatNumber(num: number): string {
  return num.toLocaleString('en', {
    minimumFractionDigits: 2,
  });
}

export function getTotalBalanceOfAllExpenses(
  expenses: Expense[],
  key: keyof Expense,
): number {
  return expenses.reduce(
    (accumulatedValue: number, nextExpense: Expense) =>
      accumulatedValue + (nextExpense[key] as number),
    0,
  );
}

export function getTotalUnpaidExpenses(
  expenses: Expense[],
  key: keyof Expense,
): number {
  return expenses.reduce(
    (accumulatedValue: number, nextExpense: Expense) =>
      !nextExpense.isPaid
        ? accumulatedValue + (nextExpense[key] as number)
        : accumulatedValue,
    0,
  );
}

export const getTotalBalance = (expenses: Expense[]): string => {
  const total = expenses.reduce((acc, curr) => {
    return acc + curr.balance;
  }, 0);

  return total.toFixed(2);
};

export const getTotalOverdueBalances = (expenses: Expense[]): number => {
  let overdueExpenses = 0;
  const unpaidExpenses = expenses.filter(
    (expense) => !expense.isPaid && expense.dueDate,
  );

  unpaidExpenses.forEach((unpaidExpense) => {
    if (new Date() > new Date(unpaidExpense.dueDate as string)) {
      overdueExpenses += 1;
    }
  });

  return overdueExpenses;
};

export const isOverDue = (expense: Expense) => {
  if (expense.dueDate) {
    return new Date() > new Date(expense.dueDate) && !expense.isPaid;
  }
  return false;
};
