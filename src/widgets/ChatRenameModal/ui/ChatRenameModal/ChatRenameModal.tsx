import { useState } from 'react';

import { getChatById } from '@/entities/Chat';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';

type Props = {
  chatId: string;
  onClose: () => void;
  renameChat: (newName: string) => void;
};

export const ChatRenameModal = ({ chatId, onClose, renameChat }: Props) => {
  const chatById = useAppSelector(getChatById);
  const chat = chatById[chatId];

  const [value, setValue] = useState<string>(chat.name);

  const handleSubmit = () => {
    if (value) {
      renameChat(value);
      onClose();
    }
  };

  return (
    <Dialog
      maxWidth="xs"
      open={Boolean(chatId)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
          },
        },
      }}
    >
      <DialogTitle>Переименовать чат</DialogTitle>
      <DialogContent sx={{ width: '444px' }}>
        <TextField
          size="small"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (['Enter', 'NumEnter'].includes(e.key)) {
              handleSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleSubmit}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};
