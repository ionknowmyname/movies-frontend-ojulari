import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

interface AlertMessageProps {
  message: string | null;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const AlertMessage: FC<AlertMessageProps> = ({ message, severity, onClose }) => {
  return (
    <Snackbar open={Boolean(message)} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
