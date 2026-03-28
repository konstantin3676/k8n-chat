import { useState } from 'react';

import { AddOutlined, ArrowUpwardOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

import styles from './InputArea.module.css';

export const InputArea = () => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (['Enter', 'NumEnter'].includes(e.key)) {
      if (!e.shiftKey) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.controlContainer}>
          <IconButton size="small" sx={{ backgroundColor: 'common.white' }}>
            <AddOutlined sx={{ fontSize: '20px' }} />
          </IconButton>
          <TextField
            multiline
            fullWidth
            size="small"
            placeholder="Чем я могу помочь вам сегодня?"
            minRows={1}
            maxRows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              '& .MuiInputBase-root': {
                padding: '4px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          />
          <IconButton
            size="small"
            disabled={!value}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'var(--primary-color-hover)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--btn-bg-color-disabled)',
              },
            }}
          >
            <ArrowUpwardOutlined
              sx={{
                fontSize: '20px',
                color: 'common.white',
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
