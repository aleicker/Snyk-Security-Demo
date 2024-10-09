import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import { ExpenseGroup, Expense } from '@/graphql/generated/graphql';
import { useAppContext } from '@/providers/AppProvider';
import { isOverDue } from '@/utils/expenses';
import {
  getExpenseGroupById,
  addExpense,
  updateExpense,
  updateExpenseGroup,
  updateExpensePaidStatus,
  addExpenseGroup,
  deleteExpenseGroup,
  deleteExpense,
  queryClient,
} from '@/api';

export default function useExpenseGroupDetail() {
  const router = useRouter();
  const { setShowOverlay } = useAppContext();
  const [error, setError] = useState<string>();

  const {
    query: { expenseGroupId },
  } = router;

  const { data } = useQuery(['expenseGroup' + expenseGroupId], () =>
    getExpenseGroupById({ _id: expenseGroupId as string }),
  );

  const duplicateExpenseGroupMutation = useMutation({
    mutationFn: addExpenseGroup,
    onSuccess: ({ expenseGroup }) => {
      router.push(`/account/expense-group/${expenseGroup?._id}`);
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not duplicate expense group');
    },
  });

  const updateExpenseGroupMutation = useMutation({
    mutationFn: updateExpenseGroup,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
      queryClient.removeQueries('expenseGroups');
    },
    onError: (error) => {
      setError('Could not update expense group');
    },
  });

  const deleteExpenseGroupMutation = useMutation({
    mutationFn: deleteExpenseGroup,
    onSuccess: () => {
      queryClient.removeQueries('expenseGroups');
      router.push('/account/dashboard');
    },
    onError: () => {
      setError('Could not delete expense group');
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
    },
    onError: () => {
      setError('Could not add new expense');
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not update expense paid status');
    },
  });

  const updateExpensePaidStatusMutation = useMutation({
    mutationFn: updateExpensePaidStatus,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
      queryClient.removeQueries('expenseGroups');
    },
    onError: () => {
      setError('Could not update expense paid status');
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries('expenseGroup' + expenseGroupId);
    },
    onError: () => {
      setError('Could not delete expense');
    },
  });

  function handleExpenseGroupDuplicate(formData: ExpenseGroup) {
    duplicateExpenseGroupMutation.mutate({ input: formData });
  }

  function handleExpenseGroupUpdate(formData: Omit<ExpenseGroup, 'expenses'>) {
    updateExpenseGroupMutation.mutate({
      expenseGroupId: expenseGroupId as string,
      input: formData,
    });
  }

  function handleExpenseGroupDelete() {
    setShowOverlay(true);
    deleteExpenseGroupMutation.mutate({
      expenseGroupId: expenseGroupId as string,
    });
  }

  function handleAddExpense(newExpense: Expense) {
    addExpenseMutation.mutate({
      expenseGroupId: expenseGroupId as string,
      input: newExpense,
    });
  }

  function handleUpdateExpense(updatedExpense: Expense) {
    const { _id, ...input } = updatedExpense;
    updateExpenseMutation.mutate({
      expenseId: _id as string,
      expenseGroupId: expenseGroupId as string,
      input,
    });
  }

  function handleUpdateExpensePaidStatus(
    isPaid: boolean,
    expenseGroupId: string,
    expenseId: string,
  ) {
    updateExpensePaidStatusMutation.mutate({
      isPaid,
      expenseGroupId,
      expenseId,
    });
  }

  function handleDeleteExpense(expenseId: string) {
    deleteExpenseMutation.mutate({
      expenseGroupId: expenseGroupId as string,
      expenseId,
    });
  }

  return {
    data,
    error,
    handleExpenseGroupDuplicate,
    handleExpenseGroupUpdate,
    handleExpenseGroupDelete,
    handleAddExpense,
    handleUpdateExpense,
    handleUpdateExpensePaidStatus,
    handleDeleteExpense,
  };
}
