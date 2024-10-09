import { useFormik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { queryClient, updatePassword } from '@/api';

interface ResetPasswordFormProps {
  userId: string;
  onSuccess: () => any;
  onError: (errorText: string) => any;
}

export default function ResetPasswordForm({
  userId,
  onError,
  onSuccess,
}: ResetPasswordFormProps) {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    password: yup.string().required('Please enter a new password'),
    confirmPassword: yup
      .string()
      .required('Please confiirm the new password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async () => {
        try {
          await queryClient.executeMutation({
            mutationKey: 'updatePassword',
            mutationFn: () =>
              updatePassword({ userId, password: values.password }),
          });
          onSuccess();
        } catch {
          onError('Error. Could not update password');
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3} marginBottom={2}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            type="password"
            name="password"
            label="New Password"
            fullWidth
            onChange={handleChange}
            value={values.password}
            {...(!!(errors.password && touched.password) && {
              error: true,
              helperText: errors.password,
            })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            onChange={handleChange}
            value={values.confirmPassword}
            {...(!!(errors.confirmPassword && touched.confirmPassword) && {
              error: true,
              helperText: errors.confirmPassword,
            })}
          />
        </Grid>
      </Grid>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
      >
        Save Password
      </LoadingButton>
    </form>
  );
}
