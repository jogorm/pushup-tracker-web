import React, { useState } from 'react';
import { 
  Paper, 
  Typography,
  Grid,
  Box,
  useTheme,
  IconButton
} from '@mui/material';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const CalendarView = ({ history }) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const firstDayOfMonth = start.getDay();

  // Create the day cells for the calendar
  const dayCells = Array(35).fill(null).map((_, index) => {
    const dayIndex = index - firstDayOfMonth;
    const date = new Date(start.getFullYear(), start.getMonth(), dayIndex + 1);
    
    if (!isSameMonth(date, start)) {
      return { date: null };
    }

    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = history.find(h => h.date === dateStr);
    const pushups = entry ? entry.count : 0;

    return {
      date,
      pushups,
      isToday: isToday(date)
    };
  });

  const getBackgroundColor = (pushups) => {
    if (pushups >= 30) return theme.palette.success.main;
    if (pushups < 10) return theme.palette.error.main;
    return theme.palette.warning.main;
  };

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
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2
      }}>
        <IconButton onClick={handlePreviousMonth}>
          <ChevronLeftIcon />
        </IconButton>
        
        <Typography variant="h5" component="h2">
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        
        <IconButton onClick={handleNextMonth}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs={12/7} key={day}>
            <Typography align="center" fontWeight="bold">
              {day}
            </Typography>
          </Grid>
        ))}

        {dayCells.map((cell, index) => (
          <Grid item xs={12/7} key={index}>
            {cell.date && (
              <Box
                sx={{
                  p: 1,
                  height: 60,
                  bgcolor: getBackgroundColor(cell.pushups),
                  borderRadius: 1,
                  border: cell.isToday ? `2px solid ${theme.palette.primary.main}` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <Typography variant="body2">
                  {format(cell.date, 'd')}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {cell.pushups}
                </Typography>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
