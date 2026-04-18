import { useState } from 'react';

import { AddChatButton } from '@/features/AddChatButton';
import { ChatList } from '@/features/ChatList';
import { SearchChatButton } from '@/features/SearchChatButton';
import { SettingsButton } from '@/features/SettingsButton';
import { MenuOutlined } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';

import styles from './Sidebar.module.css';

import type { CSSObject, Theme } from '@mui/material';
const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 60,
});

type Props = {
  openDeleteChatModal: (chatId: string) => void;
  openRenameChatModal: (chatId: string) => void;
  openSettingsModal: () => void;
};

export const Sidebar = ({
  openDeleteChatModal,
  openRenameChatModal,
  openSettingsModal,
}: Props) => {
  const [open, setOpen] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={(theme) => ({
        width: drawerWidth,
        flexShrink: 0,
        ...(open
          ? {
              ...openedMixin(theme),
              '& .MuiDrawer-paper': openedMixin(theme),
            }
          : {
              ...closedMixin(theme),
              '& .MuiDrawer-paper': closedMixin(theme),
            }),
      })}
    >
      <div className={`${styles.container} ${open ? styles.open : ''}`}>
        <div className={styles.header}>
          <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
            <MenuOutlined />
          </IconButton>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.buttonContainer}>
            <AddChatButton />
            <SearchChatButton
              isSearchMode={isSearchMode}
              setIsSearchMode={setIsSearchMode}
            />
          </div>
          <div className={`${styles.chatList} ${open ? styles.open : ''}`}>
            <ChatList
              isSearchMode={isSearchMode}
              openDeleteChatModal={openDeleteChatModal}
              openRenameChatModal={openRenameChatModal}
            />
          </div>
          <SettingsButton openSettingsModal={openSettingsModal} />
        </div>
      </div>
    </Drawer>
  );
};
