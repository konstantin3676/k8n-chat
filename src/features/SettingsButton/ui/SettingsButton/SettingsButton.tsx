import { SettingsOutlined } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

type Props = {
  openSettingsModal: () => void;
};

export const SettingsButton = ({ openSettingsModal }: Props) => {
  return (
    <ListItem
      dense
      onClick={() => openSettingsModal()}
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
        <SettingsOutlined />
      </ListItemIcon>
      <ListItemText
        primary="Настройки"
        slotProps={{
          primary: { noWrap: true },
        }}
      />
    </ListItem>
  );
};
