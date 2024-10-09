import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ExpenseGroup } from '@/graphql/generated/graphql';
import useExpenseGroupInfoFormModal from './useExpenseGroupInfoFormModal';
import styles from './ExpenseGroupInfoFormModal.module.scss';

interface ExpenseGroupInfoFormModalProps {
  message?: string | ReactNode;
  onSave: Function;
  onCancel: Function;
  expenseGroup: ExpenseGroup;
  formType: 'Update' | 'Duplicate';
}

export default function ExpenseGroupInfoFormModal({
  message,
  onCancel,
  onSave,
  expenseGroup,
  formType = 'Update',
}: ExpenseGroupInfoFormModalProps) {
  const { form } = useExpenseGroupInfoFormModal({
    expenseGroup,
    formType,
    onSave,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = form;

  return (
    <Modal open={true}>
      <Box className={styles.modal}>
        <Typography padding={2.5} variant="h5" component="h2">
          {formType} Expense Group
        </Typography>
        <Box padding={2.5} paddingTop={0}>
          <Typography>{message}</Typography>
          <form onSubmit={handleSubmit} noValidate>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                format="MM/DD/YYYY"
                onChange={(date) => {
                  setFieldValue('startDate', dayjs(date).format('MM/DD/YYYY'));
                }}
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
                {...(values.startDate && {
                  defaultValue: dayjs(values.startDate),
                })}
              />
              <DatePicker
                label="End Date"
                format="MM/DD/YYYY"
                onChange={(date) => {
                  setFieldValue('endDate', dayjs(date).format('MM/DD/YYYY'));
                }}
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
                {...(values.endDate && {
                  defaultValue: dayjs(values.endDate),
                })}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              label="Total Budget"
              type="number"
              name="totalBudget"
              onChange={handleChange}
              autoComplete="off"
              fullWidth
              {...(values.totalBudget && { defaultValue: values.totalBudget })}
              {...(!!(errors.totalBudget && touched.totalBudget) && {
                error: true,
                helperText: errors.totalBudget,
              })}
            />
            <Box className={styles.modalButtons} paddingTop={2.5}>
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                type="submit"
                size="large"
              >
                {formType}
              </LoadingButton>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
