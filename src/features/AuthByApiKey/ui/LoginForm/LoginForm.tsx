import { useState } from 'react';

import { userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import styles from './LoginForm.module.css';

import type { ApiKeyScope, User } from '@/entities/User';
export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');
  const [scope, setScope] = useState<ApiKeyScope>('GIGACHAT_API_PERS');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setError(false);
    if (password === '') {
      setError(true);
      return;
    }
    const authData: User = {
      apiKey: password,
      apiKeyScope: scope,
    };
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData));
    dispatch(userActions.setAuthData(authData));
  };

  return (
    <Paper variant="outlined">
      <div className={styles.container}>
        <div>
          <div className={styles.passwordContainer}>
            <TextField
              fullWidth
              size="small"
              label="Пароль"
              type="password"
              error={error}
              helperText={error ? 'Поле не должно быть пустым' : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (['Enter', 'NumEnter'].includes(e.key)) {
                  handleSubmit();
                }
              }}
            />
          </div>
          <RadioGroup
            row
            value={scope}
            onChange={(e) => setScope(e.target.value as ApiKeyScope)}
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
              label="Корпорация"
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
