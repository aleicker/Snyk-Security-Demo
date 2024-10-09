import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';

import { getSdk } from './graphql/generated/graphql';

const gqlClient = new GraphQLClient('http://localhost:3000/api/graphql');
export const {
  logoutUser,
  loginUser,
  getAllExpenseGroups,
  getExpenseGroupById,
  deleteExpenseGroup,
  deleteExpense,
  addExpenseGroup,
  updateExpense,
  updateExpensePaidStatus,
  updateExpenseGroup,
  addExpense,
  createUser,
  getSecurityQuestions,
  validateSecurityQuestionAnswers,
  updatePassword,
} = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
