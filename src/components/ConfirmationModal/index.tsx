import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  message: string | ReactNode;
  onConfirm: Function;
  onCancel: Function;
}

export default function ConfirmationModal({
  message,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal open={true}>
      <Box className={styles.modal}>
        <Box padding={2.5} fontSize={18} component="h2">
          {message}
        </Box>
        <Box className={styles.modalButtons} textAlign="center" padding={2.5}>
          <Button
            color="error"
            variant="contained"
            size="large"
            onClick={() => onConfirm()}
          >
            Delete
          </Button>
          <Button variant="outlined" size="large" onClick={() => onCancel()}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
