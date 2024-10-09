import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { dehydrate } from 'react-query';
import Dashboard from '@/features/Dashboard';
import { GetAllExpenseGroupsQuery } from '@/graphql/generated/graphql';
import { queryClient, getAllExpenseGroups } from '@/api';

export async function initServerSideProps(ctx: GetServerSidePropsContext) {
  await queryClient.prefetchQuery<GetAllExpenseGroupsQuery>(
    ['expenseGroups'],
    () => getAllExpenseGroups(),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Dashboard</title>
        <meta name="description" content="BudgetBuddy dashboard page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
