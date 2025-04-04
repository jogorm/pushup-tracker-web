import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const PushupCounter = ({ onSave }) => {
  const [count, setCount] = useState(30);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  
  const handleSave = () => {
    onSave(count);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 2
      }}
    >
      <Typography variant="h5" component="h2">
        Today's Pushups
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={handleDecrement} color="primary">
          <RemoveIcon />
        </IconButton>
        
        <Typography variant="h4">
          {count}
        </Typography>
        
        <IconButton onClick={handleIncrement} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSave}
        fullWidth
      >
        Save
      </Button>
    </Paper>
  );
};
