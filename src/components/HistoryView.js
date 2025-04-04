import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box
} from '@mui/material';

export const HistoryView = ({ history, onReset }) => {
  // Sort history by date in descending order
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: 400, 
        mx: 'auto', 
        mt: 2,
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          History
        </Typography>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={onReset}
          size="small"
        >
          Reset Data
        </Button>
      </Box>

      <List>
        {sortedHistory.map(({ date, count }) => (
          <ListItem key={date} divider>
            <ListItemText 
              primary={new Date(date).toLocaleDateString()} 
              secondary={`${count} pushups`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
