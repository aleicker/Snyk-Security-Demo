import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import BrandLogo from '@/components/BrandLogo';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Alert from '@/components/Alert';
import { useRouter } from 'next/router';
import useRegisterUserForm from './useRegisterUserForm';

export default function RegisterUserForm() {
  const router = useRouter();
  const { form, createUserError } = useRegisterUserForm();
  const { values, errors, touched, handleSubmit, handleChange, isSubmitting } =
    form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box padding={4}>
        <Typography
          sx={{ marginBottom: 2, textAlign: 'center' }}
          variant="h5"
          component="div"
        >
          <BrandLogo size={60} />
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
        </Typography>
        <Box marginBottom={2}>
          {createUserError && (
            <Box marginBottom={3}>
              <Alert variant="filled" color="error">
                {createUserError}
              </Alert>
            </Box>
          )}
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            autoComplete="off"
            onChange={handleChange}
            value={values.email}
            {...(!!(errors.email && touched.email) && {
              error: true,
              helperText: errors.email,
            })}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            autoComplete="off"
            onChange={handleChange}
            value={values.username}
            {...(!!(errors.username && touched.username) && {
              error: true,
              helperText: errors.username,
            })}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            {...(!!(errors.password && touched.password) && {
              error: true,
              helperText: errors.password,
            })}
          />
        </Box>
        <Box marginTop={4}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            fullWidth
          >
            Create User
          </LoadingButton>
          <Box marginBottom={1.5} />
          <Button
            onClick={() => router.push('/')}
            size="large"
            variant="outlined"
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
}
