import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SecurityQuestionsResponse } from '@/graphql/generated/graphql';
import { queryClient, getSecurityQuestions } from '@/api';

interface EmailSearchFormProps {
  onSuccess: (response: SecurityQuestionsResponse) => any;
  onError: (error: string) => any;
}

export default function EmailSearchForm({
  onSuccess,
  onError,
}: EmailSearchFormProps) {
  const initialValues = {
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email format',
      )
      .required('Email is required'),
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (formData) => {
        try {
          const response = await queryClient.fetchQuery({
            queryKey: 'getSecurityQuestions',
            queryFn: () => getSecurityQuestions({ email: formData.email }),
          });

          onSuccess(response.questions);
        } catch {
          onError(
            `Could not get security questions for email [${formData.email}]`,
          );
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoComplete="off"
        name="email"
        label="Email Address"
        onChange={handleChange}
        value={values.email}
        fullWidth
        {...(!!(errors.email && touched.email) && {
          error: true,
          helperText: errors.email,
        })}
      />
      <Box marginBottom={2} />
      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Submit
      </LoadingButton>
    </form>
  );
}
