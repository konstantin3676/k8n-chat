import { chatActions } from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { AddOutlined } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export const AddChatButton = () => {
  const dispatch = useAppDispatch();

  const addNewChat = () => {
    dispatch(chatActions.addNewChat());
  };

  return (
    <ListItem
      dense
      onClick={() => addNewChat()}
      sx={{
        borderRadius: '999px',
        paddingLeft: '10px',
        cursor: 'pointer',
        transition: 'background-color 300ms',
        '&:hover': {
          bgcolor: 'var(--btn-bg-color-disabled)',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: '30px' }}>
        <AddOutlined />
      </ListItemIcon>
      <ListItemText
        primary="Новый чат"
        slotProps={{
          primary: { noWrap: true },
        }}
      />
    </ListItem>
  );
};
