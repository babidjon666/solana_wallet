import React from 'react';
import { Card, Typography, Button, TextField, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PrivateKeyCard = ({ privateKey, onCopy, onConfirm }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: '#2E2E2E',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
        Your Private Key
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={privateKey}
        InputProps={{
          sx: { color: 'white', backgroundColor: '#1A1A1A', borderRadius: 1 },
          endAdornment: (
            <IconButton onClick={onCopy} sx={{ color: 'white' }}>
              <ContentCopyIcon />
            </IconButton>
          ),
        }}
      />
      <Typography variant="body2" sx={{ mt: 2, mb: 4, color: '#CCCCCC' }}>
        Make sure to save this key securely. You won't be able to see it again.
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#4486f7',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: '#6486f7',
          },
        }}
        onClick={onConfirm}
      >
        I Saved My Private Key
      </Button>
    </Card>
  );
};

export default PrivateKeyCard;