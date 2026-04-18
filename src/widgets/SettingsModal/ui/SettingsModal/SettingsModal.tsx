import { SettingsForm } from '@/features/SettingsForm';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingsModal = ({ open, onClose }: Props) => {
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
      <DialogTitle>Настройки</DialogTitle>
      <DialogContent sx={{ width: '325px' }}>
        <SettingsForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={() => {}}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};
