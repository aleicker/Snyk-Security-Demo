import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import ContentSection from '@/components/ContentSection';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@/components/Alert';
import PipeList from '@/components/PipeList';
import { useExpenseFormModalContext } from '@/providers/ExpenseFormModalProvider';
import { Expense } from '@/graphql/generated/graphql';
import { formatNumber } from '@/utils/expenses';
import useNewExpenseGroupForm from './useNewExpenseGroupForm';
import styles from './NewExpenseGroupForm.module.scss';

export default function NewExpenseGroupForm() {
  const router = useRouter();
  const { setExpenseFormState } = useExpenseFormModalContext();

  const {
    form,
    createError,
    addExpense,
    editExpense,
    deleteExpense,
    duplicateError,
    dismissErrors,
  } = useNewExpenseGroupForm();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = form;

  const showAddExpenseForm = () => {
    dismissErrors();
    setExpenseFormState({
      onSubmitCallback: (formData) => addExpense(formData),
    });
  };

  return (
    <ContentSection>
      <form onSubmit={handleSubmit} noValidate>
        <Box padding={2.5}>
          <Typography component="h1" variant="h4" marginBottom={3}>
            Add Expense Group
          </Typography>
          {createError && (
            <Box marginBottom={2}>
              <Alert
                color="error"
                variant="filled"
                onDismiss={() => dismissErrors()}
              >
                {createError}
              </Alert>
            </Box>
          )}
          <Box marginBottom={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <DatePicker
                    label="Start Date"
                    format="MM/DD/YYYY"
                    slotProps={{
                      textField: {
                        name: 'startDate',
                        fullWidth: true,
                        ...(!!(errors.startDate && touched.startDate) && {
                          error: true,
                          helperText: errors.startDate,
                        }),
                      },
                    }}
                    onChange={(date) => {
                      setFieldValue(
                        'startDate',
                        dayjs(date).format('MM/DD/YYYY'),
                      );
                    }}
                    {...(values.startDate && { value: values.startDate })}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <DatePicker
                    label="End Date"
                    format="MM/DD/YYYY"
                    slotProps={{
                      textField: {
                        name: 'endDate',
                        fullWidth: true,
                        ...(!!(errors.endDate && touched.endDate) && {
                          error: true,
                          helperText: errors.endDate,
                        }),
                      },
                    }}
                    onChange={(date) => {
                      setFieldValue(
                        'endDate',
                        dayjs(date).format('MM/DD/YYYY'),
                      );
                    }}
                    {...(values.endDate && { value: values.endDate })}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    type="number"
                    name="totalBudget"
                    label="Total Budget"
                    autoComplete="off"
                    fullWidth
                    onChange={handleChange}
                    {...(values.totalBudget !== 0 && {
                      defaultValue: values.totalBudget,
                    })}
                    {...(!!(errors.totalBudget && touched.totalBudget) && {
                      error: true,
                      helperText: errors.totalBudget,
                    })}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
          <Box marginBottom={3}>
            <Typography component="h2" variant="h5" marginBottom={2}>
              Expenses
            </Typography>
            <Button size="small" onClick={showAddExpenseForm}>
              + Add Expense
            </Button>
            {duplicateError && (
              <Box marginTop={1} marginBottom={1}>
                <Alert
                  color="error"
                  variant="filled"
                  onDismiss={() => dismissErrors()}
                >
                  {duplicateError}
                </Alert>
              </Box>
            )}
            {!!(errors.expenses && touched.expenses) && (
              <Typography color="error" fontSize={13}>
                {errors.expenses as string}
              </Typography>
            )}
            {!!values.expenses.length && (
              <Box marginBottom={1} marginTop={1}>
                {values.expenses.map((expense: Expense, i) => {
                  return (
                    <React.Fragment key={expense.name}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        padding={1}
                      >
                        <Box>
                          <Box>{expense.name}</Box>
                          <PipeList
                            className={styles.expenseList}
                            items={[
                              `Balance: $${formatNumber(expense.balance)}`,
                              ...(expense.dueDate
                                ? [`Due Date: ${expense.dueDate}`]
                                : []),
                              ,
                              `Paid: ${JSON.stringify(expense.isPaid)}`,
                            ]}
                          />
                        </Box>
                        <Box minWidth={175} marginLeft={2}>
                          <Button size="small">
                            <EditIcon />
                            <Typography
                              marginLeft={0.5}
                              component="span"
                              fontSize={14}
                              onClick={() =>
                                setExpenseFormState({
                                  expense,
                                  onSubmitCallback: (formData) =>
                                    editExpense(formData, i),
                                })
                              }
                            >
                              Edit
                            </Typography>
                          </Button>
                          <Button
                            sx={{ marginLeft: 1 }}
                            size="small"
                            color="error"
                            onClick={() => deleteExpense(i)}
                          >
                            <ClearIcon />
                            <Typography
                              marginLeft={0.5}
                              component="span"
                              fontSize={14}
                            >
                              Delete
                            </Typography>
                          </Button>
                        </Box>
                      </Box>
                      {i + 1 !== values.expenses.length && <Divider />}
                    </React.Fragment>
                  );
                })}
              </Box>
            )}
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
          <Button
            onClick={() => router.push('/account/dashboard')}
            variant="outlined"
            size="large"
            sx={{ marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </ContentSection>
  );
}
