import './styles/index.css';

import { Box } from '@mui/material';

import { MainPage } from '../pages/MainPage';

export const App = () => {
  return (
    <Box minHeight="100vh">
      <MainPage />
    </Box>
  );
};
