import { userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { LogoutOutlined } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(userActions.setAuthData(null));
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  };

  return (
    <ListItem
      dense
      onClick={() => logout()}
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
        <LogoutOutlined />
      </ListItemIcon>
      <ListItemText
        primary="Выйти"
        slotProps={{
          primary: { noWrap: true },
        }}
      />
    </ListItem>
  );
};
