import Head from 'next/head';
import ContentSection from '@/components/ContentSection';
import VerifyUser from '@/features/VerifyUser';

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>BudgetBuddy | Recover Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BudgetBuddy reset password page" />
      </Head>
      <ContentSection maxWidth={768}>
        <VerifyUser />
      </ContentSection>
    </>
  );
}
