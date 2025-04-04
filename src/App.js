import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box } from '@mui/material';
import { PushupCounter } from './components/PushupCounter';
import { HistoryView } from './components/HistoryView';
import { YearOverview } from './components/YearOverview';
import { CalendarView } from './components/CalendarView';
import { usePushupStore } from './hooks/usePushupStore';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    success: {
      main: '#66bb6a',
      dark: '#388e3c'
    },
    error: {
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      main: '#ffa726',
      dark: '#f57c00'
    }
  },
});

function App() {
  const { history, addPushups, reset } = usePushupStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Pushup Tracker
          </Typography>
          
          <PushupCounter onSave={addPushups} />
          <YearOverview history={history} />
          <CalendarView history={history} />
          <HistoryView history={history} onReset={reset} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
