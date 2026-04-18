import { useState } from 'react';

import { chatActions } from '@/entities/Chat';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useDebounce } from '@/shared/utils/hooks/useDebounce';
import { CloseOutlined, SearchOutlined } from '@mui/icons-material';
import { InputAdornment, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';

type Props = {
  isSearchMode: boolean;
  setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchChatButton = ({
  isSearchMode,
  setIsSearchMode,
  openSidebar,
  setOpenSidebar,
}: Props) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  const searchChats = useDebounce((value) =>
    dispatch(chatActions.searchChats(value)),
  );

  const exitFromSearchMode = () => {
    setIsSearchMode(false);
    setSearchValue('');
    dispatch(chatActions.setChatSearchResult([]));
  };

  if (isSearchMode) {
    return (
      <TextField
        autoFocus
        size="small"
        placeholder="Поиск в чатах"
        value={searchValue}
        onChange={(e) => {
          const value = e.target.value;
          setSearchValue(value);
          searchChats(value);
        }}
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
                onClick={() => exitFromSearchMode()}
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
          if (searchValue === '') {
            exitFromSearchMode();
          }
        }}
      />
    );
  }

  return (
    <ListItem
      dense
      onClick={() => {
        setIsSearchMode(true);
        if (!openSidebar) {
          setOpenSidebar(true);
        }
      }}
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
