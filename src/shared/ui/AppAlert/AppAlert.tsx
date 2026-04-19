import { Alert, Snackbar } from '@mui/material';

import type { AlertProps } from '@mui/material';

type Props = {
  content: string;
  onClose: () => void;
} & AlertProps;

export const AppAlert = ({ content, onClose, ...props }: Props) => {
  return (
    <Snackbar
      open
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{ width: '100%' }}
        {...props}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};
