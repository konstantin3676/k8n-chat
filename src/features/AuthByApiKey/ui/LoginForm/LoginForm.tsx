import { useState } from 'react';

import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { Button, FormControlLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material';

import { getLoginPassword, getLoginScope } from '../../model/selectors/loginSelectors';
import { loginByApiKey } from '../../model/services/loginByApiKey/loginByApiKey';
import { loginActions } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.css';

import type { ApiKeyScope } from '../../model/types/loginSchema';
export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const password = useAppSelector(getLoginPassword);
  const scope = useAppSelector(getLoginScope);

  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setError(false);
    if (password === '') {
      setError(true);
      return;
    }
    dispatch(loginByApiKey({ scope, password }));
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: '16px' }}>
      <div className={styles.container}>
        <div>
          <div className={styles.passwordContainer}>
            <TextField
              fullWidth
              size="small"
              label="Ключ авторизации"
              type="password"
              error={error}
              helperText={error ? 'Поле не должно быть пустым' : undefined}
              value={password}
              onChange={(e) =>
                dispatch(loginActions.setPassword(e.target.value))
              }
              onKeyDown={(e) => {
                if (['Enter', 'NumEnter'].includes(e.key)) {
                  handleSubmit();
                }
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </div>
          <RadioGroup
            row
            value={scope}
            onChange={(e) =>
              dispatch(loginActions.setScope(e.target.value as ApiKeyScope))
            }
          >
            <FormControlLabel
              value="GIGACHAT_API_PERS"
              control={<Radio size="small" />}
              label="Персональный"
            />
            <FormControlLabel
              value="GIGACHAT_API_B2B"
              control={<Radio size="small" />}
              label="B2B"
            />
            <FormControlLabel
              value="GIGACHAT_API_CORP"
              control={<Radio size="small" />}
              label="Pay as you go"
            />
          </RadioGroup>
        </div>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </div>
    </Paper>
  );
};
