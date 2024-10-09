import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import { SecurityQuestion } from '@/graphql/generated/graphql';
import { queryClient, validateSecurityQuestionAnswers } from '@/api';

interface SecurityQuestionsFormProps {
  userId: string;
  questions: SecurityQuestion[];
  onSuccess: () => any;
  onError: (errorText: string) => any;
}

export default function SecurityQuestionsForm({
  userId,
  questions,
  onSuccess,
  onError,
}: SecurityQuestionsFormProps) {
  const initialValues: {
    [key: string]: any;
  } = Object.fromEntries(questions.map((question) => [question._id, '']));

  const validationSchema = yup.object(
    Object.fromEntries(
      questions.map((question) => [
        question._id,
        yup.string().required('Required field'),
      ]),
    ),
  );

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (formData) => {
        try {
          const { isValid } = await queryClient.fetchQuery({
            queryKey: 'validateSecurityQuestionAnswers',
            queryFn: () =>
              validateSecurityQuestionAnswers({
                userId,
                formData: JSON.stringify(formData),
              }),
          });

          if (!isValid) {
            throw new Error('One or more answers were incorrect. Try again.');
          }

          onSuccess();
        } catch (err: any) {
          onError(err.message);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3} marginBottom={2}>
        {questions.map(({ _id, question }) => {
          const name = _id as string;
          return (
            <Grid key={_id} item xs={12} sm={12} md={12}>
              <TextField
                name={name}
                label={question}
                autoComplete="off"
                fullWidth
                onChange={handleChange}
                value={values[name]}
                {...(!!(errors[name] && touched[name]) && {
                  error: true,
                  helperText: errors[name] as string,
                })}
              />
            </Grid>
          );
        })}
      </Grid>
      <LoadingButton
        type="submit"
        size="large"
        variant="contained"
        loading={isSubmitting}
      >
        Submit Answers
      </LoadingButton>
    </form>
  );
}
