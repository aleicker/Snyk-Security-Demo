// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Void: { input: void; output: void; }
};

export type Expense = {
  __typename?: 'Expense';
  _id?: Maybe<Scalars['ID']['output']>;
  balance: Scalars['Float']['output'];
  dueDate?: Maybe<Scalars['String']['output']>;
  isPaid: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
};

export type ExpenseGroup = {
  __typename?: 'ExpenseGroup';
  _id?: Maybe<Scalars['ID']['output']>;
  endDate: Scalars['String']['output'];
  expenses: Array<Expense>;
  startDate: Scalars['String']['output'];
  totalBudget: Scalars['Float']['output'];
  userId?: Maybe<Scalars['String']['output']>;
};

export type ExpenseGroupInput = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  expenses?: InputMaybe<Array<ExpenseInput>>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  totalBudget?: InputMaybe<Scalars['Float']['input']>;
};

export type ExpenseInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  balance?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpense?: Maybe<Scalars['Void']['output']>;
  addExpenseGroup?: Maybe<NewExpenseGroupResponse>;
  createUser?: Maybe<Scalars['Void']['output']>;
  deleteExpense?: Maybe<Scalars['Void']['output']>;
  deleteExpenseGroup?: Maybe<Scalars['Void']['output']>;
  updateExpense?: Maybe<Scalars['Void']['output']>;
  updateExpenseGroup?: Maybe<Scalars['Void']['output']>;
  updateExpensePaidStatus?: Maybe<Scalars['Void']['output']>;
  updatePassword?: Maybe<Scalars['Void']['output']>;
};


export type MutationAddExpenseArgs = {
  expenseGroupId: Scalars['ID']['input'];
  input: ExpenseInput;
};


export type MutationAddExpenseGroupArgs = {
  input: ExpenseGroupInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteExpenseArgs = {
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
};


export type MutationDeleteExpenseGroupArgs = {
  expenseGroupId: Scalars['String']['input'];
};


export type MutationUpdateExpenseArgs = {
  expenseGroupId: Scalars['ID']['input'];
  expenseId: Scalars['ID']['input'];
  input: ExpenseInput;
};


export type MutationUpdateExpenseGroupArgs = {
  expenseGroupId: Scalars['ID']['input'];
  input: ExpenseGroupInput;
};


export type MutationUpdateExpensePaidStatusArgs = {
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  isPaid: Scalars['Boolean']['input'];
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type NewExpenseGroupResponse = {
  __typename?: 'NewExpenseGroupResponse';
  _id: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllExpenseGroups: Array<Maybe<ExpenseGroup>>;
  getExpense: Expense;
  getExpenseGroupById: ExpenseGroup;
  getSecurityQuestions: SecurityQuestionsResponse;
  getUser: User;
  loginUser?: Maybe<Scalars['Void']['output']>;
  logoutUser?: Maybe<Scalars['Void']['output']>;
  validateSecurityQuestionAnswers: Scalars['Boolean']['output'];
};


export type QueryGetExpenseArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetExpenseGroupByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetSecurityQuestionsArgs = {
  email: Scalars['String']['input'];
};


export type QueryLoginUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryValidateSecurityQuestionAnswersArgs = {
  formData: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type SecurityQuestion = {
  __typename?: 'SecurityQuestion';
  _id?: Maybe<Scalars['ID']['output']>;
  question: Scalars['String']['output'];
};

export type SecurityQuestionsResponse = {
  __typename?: 'SecurityQuestionsResponse';
  questions: Array<Maybe<SecurityQuestion>>;
  userId: Scalars['ID']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: void | null };

export type AddExpenseGroupMutationVariables = Exact<{
  input: ExpenseGroupInput;
}>;


export type AddExpenseGroupMutation = { __typename?: 'Mutation', expenseGroup?: { __typename?: 'NewExpenseGroupResponse', _id: string } | null };

export type UpdateExpenseGroupMutationVariables = Exact<{
  expenseGroupId: Scalars['ID']['input'];
  input: ExpenseGroupInput;
}>;


export type UpdateExpenseGroupMutation = { __typename?: 'Mutation', updateExpenseGroup?: void | null };

export type DeleteExpenseGroupMutationVariables = Exact<{
  expenseGroupId: Scalars['String']['input'];
}>;


export type DeleteExpenseGroupMutation = { __typename?: 'Mutation', deleteExpenseGroup?: void | null };

export type AddExpenseMutationVariables = Exact<{
  expenseGroupId: Scalars['ID']['input'];
  input: ExpenseInput;
}>;


export type AddExpenseMutation = { __typename?: 'Mutation', addExpense?: void | null };

export type UpdateExpenseMutationVariables = Exact<{
  expenseId: Scalars['ID']['input'];
  expenseGroupId: Scalars['ID']['input'];
  input: ExpenseInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense?: void | null };

export type DeleteExpenseMutationVariables = Exact<{
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense?: void | null };

export type UpdateExpensePaidStatusMutationVariables = Exact<{
  isPaid: Scalars['Boolean']['input'];
  expenseGroupId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
}>;


export type UpdateExpensePaidStatusMutation = { __typename?: 'Mutation', updateExpensePaidStatus?: void | null };

export type UpdatePasswordMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: void | null };

export type GetAllExpenseGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExpenseGroupsQuery = { __typename?: 'Query', expenseGroups: Array<{ __typename?: 'ExpenseGroup', _id?: string | null, startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null }> } | null> };

export type GetExpenseGroupByIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetExpenseGroupByIdQuery = { __typename?: 'Query', expenseGroup: { __typename?: 'ExpenseGroup', _id?: string | null, startDate: string, endDate: string, totalBudget: number, expenses: Array<{ __typename?: 'Expense', _id?: string | null, name: string, balance: number, dueDate?: string | null, isPaid: boolean, note?: string | null }> } };

export type LoginUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser?: void | null };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', logoutUser?: void | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, email: string, username: string } };

export type GetSecurityQuestionsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetSecurityQuestionsQuery = { __typename?: 'Query', questions: { __typename?: 'SecurityQuestionsResponse', userId: string, questions: Array<{ __typename?: 'SecurityQuestion', _id?: string | null, question: string } | null> } };

export type ValidateSecurityQuestionAnswersQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  formData: Scalars['String']['input'];
}>;


export type ValidateSecurityQuestionAnswersQuery = { __typename?: 'Query', isValid: boolean };


export const CreateUserDocument = gql`
    mutation createUser($input: UserInput!) {
  createUser(input: $input)
}
    `;
export const AddExpenseGroupDocument = gql`
    mutation addExpenseGroup($input: ExpenseGroupInput!) {
  expenseGroup: addExpenseGroup(input: $input) {
    _id
  }
}
    `;
export const UpdateExpenseGroupDocument = gql`
    mutation updateExpenseGroup($expenseGroupId: ID!, $input: ExpenseGroupInput!) {
  updateExpenseGroup(expenseGroupId: $expenseGroupId, input: $input)
}
    `;
export const DeleteExpenseGroupDocument = gql`
    mutation deleteExpenseGroup($expenseGroupId: String!) {
  deleteExpenseGroup(expenseGroupId: $expenseGroupId)
}
    `;
export const AddExpenseDocument = gql`
    mutation addExpense($expenseGroupId: ID!, $input: ExpenseInput!) {
  addExpense(expenseGroupId: $expenseGroupId, input: $input)
}
    `;
export const UpdateExpenseDocument = gql`
    mutation updateExpense($expenseId: ID!, $expenseGroupId: ID!, $input: ExpenseInput!) {
  updateExpense(
    expenseId: $expenseId
    expenseGroupId: $expenseGroupId
    input: $input
  )
}
    `;
export const DeleteExpenseDocument = gql`
    mutation deleteExpense($expenseGroupId: String!, $expenseId: String!) {
  deleteExpense(expenseGroupId: $expenseGroupId, expenseId: $expenseId)
}
    `;
export const UpdateExpensePaidStatusDocument = gql`
    mutation updateExpensePaidStatus($isPaid: Boolean!, $expenseGroupId: String!, $expenseId: String!) {
  updateExpensePaidStatus(
    isPaid: $isPaid
    expenseGroupId: $expenseGroupId
    expenseId: $expenseId
  )
}
    `;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($userId: String!, $password: String!) {
  updatePassword(userId: $userId, password: $password)
}
    `;
export const GetAllExpenseGroupsDocument = gql`
    query getAllExpenseGroups {
  expenseGroups: getAllExpenseGroups {
    _id
    startDate
    endDate
    totalBudget
    expenses {
      _id
      name
      balance
      dueDate
      isPaid
      note
    }
  }
}
    `;
export const GetExpenseGroupByIdDocument = gql`
    query getExpenseGroupById($_id: String!) {
  expenseGroup: getExpenseGroupById(_id: $_id) {
    _id
    startDate
    endDate
    totalBudget
    expenses {
      _id
      name
      balance
      dueDate
      isPaid
      note
    }
  }
}
    `;
export const LoginUserDocument = gql`
    query loginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password)
}
    `;
export const LogoutUserDocument = gql`
    query logoutUser {
  logoutUser
}
    `;
export const GetUserDocument = gql`
    query getUser {
  user: getUser {
    _id
    email
    username
  }
}
    `;
export const GetSecurityQuestionsDocument = gql`
    query getSecurityQuestions($email: String!) {
  questions: getSecurityQuestions(email: $email) {
    userId
    questions {
      _id
      question
    }
  }
}
    `;
export const ValidateSecurityQuestionAnswersDocument = gql`
    query validateSecurityQuestionAnswers($userId: String!, $formData: String!) {
  isValid: validateSecurityQuestionAnswers(userId: $userId, formData: $formData)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createUser(variables: CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    addExpenseGroup(variables: AddExpenseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddExpenseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExpenseGroupMutation>(AddExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExpenseGroup', 'mutation');
    },
    updateExpenseGroup(variables: UpdateExpenseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpenseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpenseGroupMutation>(UpdateExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpenseGroup', 'mutation');
    },
    deleteExpenseGroup(variables: DeleteExpenseGroupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteExpenseGroupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExpenseGroupMutation>(DeleteExpenseGroupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteExpenseGroup', 'mutation');
    },
    addExpense(variables: AddExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExpenseMutation>(AddExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addExpense', 'mutation');
    },
    updateExpense(variables: UpdateExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpenseMutation>(UpdateExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpense', 'mutation');
    },
    deleteExpense(variables: DeleteExpenseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteExpenseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExpenseMutation>(DeleteExpenseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteExpense', 'mutation');
    },
    updateExpensePaidStatus(variables: UpdateExpensePaidStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateExpensePaidStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExpensePaidStatusMutation>(UpdateExpensePaidStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateExpensePaidStatus', 'mutation');
    },
    updatePassword(variables: UpdatePasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdatePasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePasswordMutation>(UpdatePasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updatePassword', 'mutation');
    },
    getAllExpenseGroups(variables?: GetAllExpenseGroupsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllExpenseGroupsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllExpenseGroupsQuery>(GetAllExpenseGroupsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllExpenseGroups', 'query');
    },
    getExpenseGroupById(variables: GetExpenseGroupByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExpenseGroupByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExpenseGroupByIdQuery>(GetExpenseGroupByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExpenseGroupById', 'query');
    },
    loginUser(variables: LoginUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginUserQuery>(LoginUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'loginUser', 'query');
    },
    logoutUser(variables?: LogoutUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogoutUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutUserQuery>(LogoutUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logoutUser', 'query');
    },
    getUser(variables?: GetUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    },
    getSecurityQuestions(variables: GetSecurityQuestionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSecurityQuestionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSecurityQuestionsQuery>(GetSecurityQuestionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSecurityQuestions', 'query');
    },
    validateSecurityQuestionAnswers(variables: ValidateSecurityQuestionAnswersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ValidateSecurityQuestionAnswersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ValidateSecurityQuestionAnswersQuery>(ValidateSecurityQuestionAnswersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'validateSecurityQuestionAnswers', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;