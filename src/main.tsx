import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';

import { App } from '@/app/App';
import { store } from '@/app/providers/StoreProvider';
import { theme } from '@/app/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StoreProvider>,
);
