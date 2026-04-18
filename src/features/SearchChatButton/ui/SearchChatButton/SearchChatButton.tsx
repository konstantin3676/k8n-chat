import { useState } from 'react';

import { CloseOutlined, SearchOutlined } from '@mui/icons-material';
import { InputAdornment, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';

export const SearchChatButton = () => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  if (isSearchMode) {
    return (
      <TextField
        autoFocus
        size="small"
        placeholder="Поиск в чатах"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ marginRight: '6px' }}>
                <SearchOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsSearchMode(false);
                  setSearchValue('');
                }}
              >
                <CloseOutlined />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '999px',
            paddingInline: '10px',
            '& .MuiOutlinedInput-input': {
              height: '20px',
              paddingBlock: '8px',
              fontSize: '14px',
            },
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
            backgroundColor: '#ffff',
          },
        }}
        onBlur={() => {
          setIsSearchMode(false);
          setSearchValue('');
        }}
      />
    );
  }

  return (
    <ListItem
      dense
      onClick={() => setIsSearchMode(true)}
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
        <SearchOutlined />
      </ListItemIcon>
      <ListItemText
        primary="Поиск в чатах"
        slotProps={{
          primary: { noWrap: true },
        }}
        sx={{ marginBlock: '5px 3px' }}
      />
    </ListItem>
  );
};
