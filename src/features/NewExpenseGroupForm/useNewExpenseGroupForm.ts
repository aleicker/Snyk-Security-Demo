import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addExpenseGroup, queryClient } from '@/api';
import { Expense, ExpenseGroup } from '@/graphql/generated/graphql';

export default function useNewExpenseGroupForm() {
  const router = useRouter();
  const [duplicateError, setDuplicateError] = useState<string | null>();
  const [createError, setCreateError] = useState<string | null>();

  const createExpenseGroup = useMutation({
    mutationFn: addExpenseGroup,
    onSuccess: ({ expenseGroup }) => {
      queryClient.removeQueries('expenseGroups');
      router.push(`/account/expense-group/${expenseGroup?._id}`);
    },
    onError: () => {
      setCreateError('An error occurred. Could not create expense group.');
    },
  });

  const initialValues = {
    startDate: '',
    endDate: '',
    totalBudget: 0,
    expenses: [],
  };

  const validationSchema = yup.object({
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('Start date is required'),
    totalBudget: yup.number().min(1, 'Total budget is required'),
    expenses: yup.array().min(1).required('At least one expense is required'),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formData: ExpenseGroup) => {
      createExpenseGroup.mutate({ input: formData });
    },
  });

  function addExpense(expense: Expense) {
    const { values, setFieldValue } = form;
    const alreadyExists = values.expenses.some(
      ({ name }) => name === expense.name,
    );

    if (alreadyExists) {
      setDuplicateError(`Expense "${expense.name}" already exists.`);
      return;
    }

    setFieldValue('expenses', [...values.expenses, expense]);
  }

  function editExpense(expense: Expense, index: number) {
    const { values, setFieldValue } = form;
    const updatedExpenses = values.expenses.map((exp, expIndex) => {
      return expIndex === index ? expense : exp;
    });

    setFieldValue('expenses', updatedExpenses);
  }

  function deleteExpense(index: number) {
    const { values, setFieldValue } = form;
    values.expenses.splice(index, 1);
    setFieldValue('expenses', values.expenses);
  }

  function dismissErrors() {
    setDuplicateError(null);
    setCreateError(null);
  }

  return {
    duplicateError,
    createError,
    form,
    addExpense,
    editExpense,
    deleteExpense,
    dismissErrors,
  };
}
