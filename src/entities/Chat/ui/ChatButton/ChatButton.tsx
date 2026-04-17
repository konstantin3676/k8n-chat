import { useState } from 'react';

import { MoreHorizOutlined } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';

import { ChatMenu } from '../ChatMenu/ChatMenu';
import styles from './ChatButton.module.css';

type Props = {
  title: string;
  handleClick: () => void;
  openRenameChatModal: () => void;
  openDeleteChatModal: () => void;
  selected?: boolean;
};

export const ChatButton = ({
  title,
  handleClick,
  openRenameChatModal,
  openDeleteChatModal,
  selected = false,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <ListItem
        dense
        secondaryAction={
          <div
            className={styles.action}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}
          >
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
      <ChatMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        openRenameChatModal={openRenameChatModal}
        openDeleteChatModal={openDeleteChatModal}
      />
    </>
  );
};
