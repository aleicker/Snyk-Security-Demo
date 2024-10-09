import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUser, loginUser, queryClient } from '@/api';

export default function useRegisterUserForm() {
  const router = useRouter();
  const [createUserError, setCreateUserError] = useState<string>();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      try {
        await queryClient.fetchQuery({
          queryKey: 'loginUser',
          queryFn: () =>
            loginUser({
              username: form.values.username,
              password: form.values.password,
            }),
        });

        router.push('/account/dashboard');
      } catch {
        router.push('/');
      }
    },
    onError: (error: any) => {
      form.setSubmitting(false);
      setCreateUserError(
        error.response.errors
          .map(({ message }: { message: string }) => message)
          .join(', '),
      );
    },
  });

  const initialValues = {
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email format',
      )
      .required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formData) => {
      createUserMutation.mutate({ input: formData });
    },
  });

  return { form, createUserError };
}
