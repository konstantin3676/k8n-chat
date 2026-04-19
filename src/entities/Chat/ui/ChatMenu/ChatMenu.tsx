import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

type Props = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  openRenameChatModal: () => void;
  openDeleteChatModal: () => void;
};

export const ChatMenu = ({
  anchorEl,
  onClose,
  openRenameChatModal,
  openDeleteChatModal,
}: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={{
        list: {
          dense: true,
        },
        paper: {
          sx: {
            borderRadius: '16px',
            '& .MuiListItemIcon-root.MuiListItemIcon-root': {
              minWidth: '26px',
            },
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          openRenameChatModal();
          onClose();
        }}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText>Переименовать</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          openDeleteChatModal();
          onClose();
        }}
      >
        <ListItemIcon>
          <DeleteOutlined />
        </ListItemIcon>
        <ListItemText>Удалить</ListItemText>
      </MenuItem>
    </Menu>
  );
};
