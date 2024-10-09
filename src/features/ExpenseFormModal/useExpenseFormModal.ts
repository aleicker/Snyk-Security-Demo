import { useFormik } from 'formik';
import * as yup from 'yup';
import { Expense } from '@/graphql/generated/graphql';

interface UseExpenseFormModal {
  expense?: Expense;
  onSubmit?: (formData: Expense) => any;
}

export default function useExpenseFormModal({
  expense,
  onSubmit = () => {},
}: UseExpenseFormModal) {
  let initialValues: Expense;

  if (expense) {
    initialValues = expense;
  } else {
    initialValues = {
      name: '',
      balance: 0,
      dueDate: '',
      isPaid: false,
      note: '',
    };
  }

  const validationSchema = yup.object({
    name: yup.string().required('Expense name is required'),
    balance: yup.number().min(1, 'Balance is required'),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formData: Expense) => onSubmit(formData),
  });

  return form;
}
