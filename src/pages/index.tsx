import Head from 'next/head';
import LoginForm from '@/features/LoginForm';
import ContentSection from '@/components/ContentSection';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>BudgetBuddy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy login page" />
      </Head>
      <ContentSection maxWidth={500}>
        <LoginForm />
      </ContentSection>
    </>
  );
}
