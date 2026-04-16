import { MoreHorizOutlined } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';

import styles from './ChatButton.module.css';

type Props = {
  title: string;
  handleClick: () => void;
  selected?: boolean;
};

export const ChatButton = ({ title, handleClick, selected = false }: Props) => {
  return (
    <ListItem
      dense
      secondaryAction={
        <div className={styles.action}>
          <MoreHorizOutlined sx={{ fontSize: '16px' }} />
        </div>
      }
      onClick={handleClick}
      sx={{
        borderRadius: '999px',
        paddingRight: '36px',
        minHeight: '36px',
        '& .MuiListItemSecondaryAction-root': {
          opacity: 0,
          right: '14px',
        },
        transition: 'background-color 300ms, opacity 300ms',
        '&:hover': {
          bgcolor: 'var(--btn-bg-color-disabled)',
          '& .MuiListItemSecondaryAction-root': {
            opacity: 1,
          },
        },
        ...(selected
          ? {
              bgcolor: 'var(--btn-bg-color-disabled)',
              '& .MuiListItemSecondaryAction-root': {
                opacity: 1,
              },
            }
          : {}),
      }}
    >
      <ListItemText
        primary={title}
        slotProps={{
          primary: { noWrap: true },
        }}
        sx={{ cursor: 'default' }}
      />
    </ListItem>
  );
};
