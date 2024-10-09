import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EXPENSE_DROPDOWN_OPTIONS } from '@/constants';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import { Expense } from '@/graphql/generated/graphql';
import useExpenseFormModal from './useExpenseFormModal';
import styles from './ExpenseFormModal.module.scss';

interface ExpenseFormProps {
  open: boolean;
}

const expenseOptions = EXPENSE_DROPDOWN_OPTIONS.sort().map((title) => ({
  title,
}));

export default function ExpenseFormModal({ open = false }: ExpenseFormProps) {
  const { expenseFormState, setExpenseFormState } =
    useExpenseFormModalContext();

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useExpenseFormModal({
      expense: expenseFormState?.expense as Expense,
      onSubmit: (formData) => {
        expenseFormState?.onSubmitCallback(formData);
        setExpenseFormState(null);
      },
    });

  return (
    <Modal open={open}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <Box padding={2.5}>
          <Grid marginBottom={2} container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Autocomplete
                freeSolo
                options={expenseOptions.map((option) => option.title)}
                onChange={(e, value) => {
                  setFieldValue('name', value);
                }}
                value={values.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    name="name"
                    label="Expense Name"
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    {...(!!(errors.name && touched.name) && {
                      error: true,
                      helperText: errors.name,
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <TextField
                type="number"
                label="Balance"
                name="balance"
                onChange={handleChange}
                fullWidth
                autoComplete="off"
                {...(values.balance && { defaultValue: values.balance })}
                {...(!!(errors.balance && touched.balance) && {
                  error: true,
                  helperText: errors.balance,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  format="MM/DD/YYYY"
                  onChange={(date) => {
                    setFieldValue('dueDate', dayjs(date).format('MM/DD/YYYY'));
                  }}
                  slotProps={{
                    textField: {
                      name: 'dueDate',
                      fullWidth: true,
                    },
                  }}
                  {...(values.dueDate && {
                    defaultValue: dayjs(values.dueDate),
                  })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={2} md={4}>
              <FormLabel>Paid</FormLabel>
              <Switch
                name="isPaid"
                onChange={handleChange}
                checked={values.isPaid}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                autoComplete="off"
                label="Note"
                name="note"
                onChange={handleChange}
                value={values.note || ''}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box className={styles.modalButtons} paddingTop={2.5}>
            <Button variant="contained" size="large" type="submit">
              {expenseFormState?.expense ? 'Update' : 'Add'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setExpenseFormState(null)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
