import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper,
  IconButton,
  Stack,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const PushupCounter = ({ onSave, defaultCount = 30, history }) => {
  const [count, setCount] = useState(defaultCount);
  const [showCustomCount, setShowCustomCount] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = history.find(entry => entry.date === today);
  const isDone = !!todayEntry;

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  
  const handleQuickSave = () => {
    onSave(defaultCount);
  };

  const handleCustomSave = () => {
    onSave(count);
    setShowCustomCount(false);
  };

  if (isDone) {
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
          mt: 2,
          bgcolor: 'success.dark'
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 48, color: 'white' }} />
        <Typography variant="h5" component="h2" color="white" align="center">
          Well Done! 💪
        </Typography>
        <Typography variant="h6" color="white" align="center">
          You did {todayEntry.count} pushups today
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setShowCustomCount(true)}
          sx={{ color: 'white', borderColor: 'white' }}
        >
          Update Today's Count
        </Button>
      </Paper>
    );
  }

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
      <Alert severity="warning" sx={{ width: '100%' }}>
        You haven't logged your pushups for today yet!
      </Alert>

      {!showCustomCount ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<FitnessCenterIcon />}
          onClick={handleQuickSave}
          sx={{ py: 2, px: 4 }}
        >
          I Did {defaultCount} Today! 💪
        </Button>
      ) : (
        <Stack spacing={2} alignItems="center" width="100%">
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
            onClick={handleCustomSave}
            fullWidth
          >
            Save
          </Button>
        </Stack>
      )}
      
      {!isDone && (
        <Button
          variant="text"
          color="secondary"
          onClick={() => setShowCustomCount(!showCustomCount)}
        >
          {showCustomCount ? "Use Quick Save" : "Enter Custom Amount"}
        </Button>
      )}
    </Paper>
  );
};
