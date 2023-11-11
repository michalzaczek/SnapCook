import { Snackbar } from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

export default function MessageSnackbar({
  open,
  handleClose,
  message,
  severity = 'error',
}: {
  open: boolean;
  handleClose: () => void;
  message: string | undefined;
  severity?: AlertColor;
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant='filled'
        severity={severity}
        onClose={handleClose}
        sx={{
          width: '100%',
          '& .MuiAlert-icon': { alignItems: 'center', fontSize: '27px' },
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
