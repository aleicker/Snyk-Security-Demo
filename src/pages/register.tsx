import Head from 'next/head';
import RegisterUserForm from '@/features/RegisterUserForm';
import ContentSection from '@/components/ContentSection';

export default function RegisterUserPage() {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Register New User</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy user register page" />
      </Head>
      <ContentSection maxWidth={600}>
        <RegisterUserForm />
      </ContentSection>
    </>
  );
}
