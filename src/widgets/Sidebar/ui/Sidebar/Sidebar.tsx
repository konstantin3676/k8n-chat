import { useState } from 'react';

import { ChatButton } from '@/entities/Chat';
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

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

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
        <ChatButton selected title="Тестовая кнопка с длинным названием" />
      </div>
    </Drawer>
  );
};
