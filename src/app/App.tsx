import './styles/index.css';

import { useEffect } from 'react';

import { getUserAuthData, getUserInited, userActions } from '@/entities/User';
import { AuthPage } from '@/pages/AuthPage';
import { MainPage } from '@/pages/MainPage';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';
import { Box } from '@mui/material';

export const App = () => {
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getUserInited);
  const authData = useAppSelector(getUserAuthData);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  if (!inited) return null;

  return (
    <Box height="100vh" fontWeight={300}>
      {authData?.apiKey ? <MainPage /> : <AuthPage />}
    </Box>
  );
};
