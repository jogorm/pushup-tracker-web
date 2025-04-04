import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Grid,
  useTheme
} from '@mui/material';
import { format, startOfYear, eachMonthOfInterval } from 'date-fns';

export const YearOverview = ({ history }) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const startDate = startOfYear(new Date(currentYear, 0, 1));
  
  // Calculate total and expected pushups
  const daysInYear = Math.min(
    Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24)),
    365
  );
  const expectedTotal = daysInYear * 30;
  const actualTotal = history.reduce((sum, entry) => sum + entry.count, 0);
  const difference = actualTotal - expectedTotal;

  // Get months for the grid
  const months = eachMonthOfInterval({
    start: startDate,
    end: new Date(currentYear, 11, 31)
  });

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: 800, 
        mx: 'auto', 
        mt: 4,
        mb: 2
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Year Overview
      </Typography>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Progress Summary
        </Typography>
        <Typography>
          Total Pushups: {actualTotal}
        </Typography>
        <Typography>
          Expected: {expectedTotal}
        </Typography>
        <Typography sx={{ 
          color: difference >= 0 ? theme.palette.success.main : theme.palette.error.main,
          fontWeight: 'bold'
        }}>
          {difference >= 0 ? 'Ahead by' : 'Behind by'} {Math.abs(difference)} pushups
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {months.map((month) => {
          const monthStr = format(month, 'MMM');
          const monthPushups = history
            .filter(entry => entry.date.startsWith(`${currentYear}-${format(month, 'MM')}`))
            .reduce((sum, entry) => sum + entry.count, 0);
          const daysInMonth = new Date(currentYear, month.getMonth() + 1, 0).getDate();
          const expectedMonthly = daysInMonth * 30;
          const isAhead = monthPushups >= expectedMonthly;

          return (
            <Grid item xs={6} sm={4} md={3} key={monthStr}>
              <Paper 
                elevation={1}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: isAhead ? 'success.dark' : 'error.dark',
                  color: 'white'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {monthStr}
                </Typography>
                <Typography variant="body2">
                  {monthPushups} / {expectedMonthly}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
