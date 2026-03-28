import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import { theme } from '@/app/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
