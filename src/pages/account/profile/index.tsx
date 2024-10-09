import Head from 'next/head';
import ContentSection from '@/components/ContentSection';

const ResetPassword = () => {
  return (
    <>
      <Head>
        <title>BudgetBuddy | User Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy user profile page" />
      </Head>
      <ContentSection>Profile page</ContentSection>
    </>
  );
};

export default ResetPassword;
