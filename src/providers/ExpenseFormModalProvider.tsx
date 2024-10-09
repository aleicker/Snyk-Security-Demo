import { Expense } from '@/graphql/generated/graphql';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import ExpenseFormModal from '@/features/ExpenseFormModal';

export interface ExpenseFormModalState {
  expense?: Expense;
  onSubmitCallback: (formData: Expense) => any;
}

export interface ExpenseFormModalContext {
  expenseFormState: ExpenseFormModalState | null;
  setExpenseFormState: Dispatch<SetStateAction<ExpenseFormModalState | null>>;
}

const ExpenseFormModalContext = createContext<ExpenseFormModalContext>({
  expenseFormState: null,
  setExpenseFormState: () => {},
});

export const useExpenseFormModalContext = () =>
  useContext(ExpenseFormModalContext);

const ExpenseFormModalProvider = ({ children }: { children: ReactNode }) => {
  const [expenseFormState, setExpenseFormState] =
    useState<ExpenseFormModalState | null>(null);

  return (
    <ExpenseFormModalContext.Provider
      value={{ expenseFormState, setExpenseFormState }}
    >
      {children}
      {expenseFormState && <ExpenseFormModal open={true} />}
    </ExpenseFormModalContext.Provider>
  );
};

export default ExpenseFormModalProvider;
