import { SettingsOutlined } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export const SettingsButton = () => {
  return (
    <ListItem
      dense
      onClick={() => {}}
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
