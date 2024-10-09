import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginUser } from '@/api';

export default function useLoginForm() {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: () => {},
  });

  const router = useRouter();

  const [loginError, setLoginError] = useState<string>();

  useQuery(['loginUser'], () => loginUser(form.values), {
    enabled:
      form.isSubmitting && !!form.values.username && !!form.values.password,
    onSuccess: () => {
      router.push('/account/dashboard');
    },
    onError: () => {
      form.setSubmitting(false);
      setLoginError('Invalid login credentials');
    },
  });

  return { form, loginError };
}
