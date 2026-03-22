import './styles/index.css';

import { Box } from '@mui/material';

import { MainPage } from '../pages/MainPage';

export const App = () => {
  return (
    <Box height="100vh" fontWeight={300}>
      <MainPage />
    </Box>
  );
};
