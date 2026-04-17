import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

type Props = {
  title: string;
  contentText: string;
  okText: string;
  open: boolean;
  onClose: () => void;
  handleOkClick: () => void;
  cancelText?: string;
};

export const ConfirmationModal = ({
  title,
  contentText,
  okText,
  cancelText = 'Отменить',
  open,
  onClose,
  handleOkClick,
}: Props) => {
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
          },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button
          onClick={() => {
            handleOkClick();
            onClose();
          }}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
