import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UnknownFuntionType } from '@/types/functions';

export default function Alert({
  children,
  onDismiss,
  ...props
}: AlertProps & { onDismiss?: UnknownFuntionType<any> }) {
  return (
    <MuiAlert
      {...(onDismiss && {
        action: (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onDismiss}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      })}
      {...props}
    >
      {children}
    </MuiAlert>
  );
}
