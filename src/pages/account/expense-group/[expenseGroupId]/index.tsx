import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { dehydrate } from 'react-query';
import ExpenseGroupDetail from '@/features/ExpenseGroupDetail';
import { queryClient, getExpenseGroupById } from '@/api';
import { GetExpenseGroupByIdQuery } from '@/graphql/generated/graphql';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const _id = query.expenseGroupId as string;
  await queryClient.prefetchQuery<GetExpenseGroupByIdQuery>(
    ['expenseGroup' + _id],
    () => getExpenseGroupById({ _id }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ExpenseGroupDetailPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Expense Group Detail</title>
        <meta
          name="description"
          content="BudgetBuddy expense group detail page"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ExpenseGroupDetail />
    </>
  );
};

export default ExpenseGroupDetailPage;
