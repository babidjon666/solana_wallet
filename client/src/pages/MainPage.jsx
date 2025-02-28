import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';  

import solanaService from '../services/solanaService';

const MainPage = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();  

  const walletAddress = location.state?.walletAddress; 
  const privateKey = location.state?.privateKey; 

  useEffect(() => {
    if (!walletAddress) {
      setError('Wallet address is missing');
      setLoading(false);
      return;
    }

    fetchBalance(); 
    const intervalId = setInterval(fetchBalance, 5000);  

    return () => clearInterval(intervalId);  
  }, [walletAddress]);

  const fetchBalance = async () => {
    try {
      const SOL_BALANCE = await solanaService.get_balance(walletAddress);
      setBalance(SOL_BALANCE);  
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch balance');
      setLoading(false);
    }
  };
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(145deg, #2E2E2E, #121212)',
        padding: 2,
      }}
    >
      <Card sx={{
        maxWidth: 400,
        borderRadius: 6,
        boxShadow: 10,
        backgroundColor: '#2C2C2C',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 4,
        border: '1px solid #444',
      }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#f5a623' }}>
            Wallet Balance
          </Typography>

          {loading ? (
            <CircularProgress sx={{ color: '#f5a623' }} />  // Show loader while fetching data
            ) : error ? (
            // Ensure that error is a string, not an object
            <Typography variant="body2" sx={{ color: 'red' }}>
                {error && typeof error === 'string' ? error : 'Unknown error occurred'}
            </Typography>
            ) : (
            <>
                <Typography variant="h6" sx={{ color: '#f5f5f5', mb: 2 }}>
                Balance: {balance} SOL
                </Typography>
                <Typography variant="body2" sx={{ color: '#b5b5b5', fontSize: '0.8rem' }}>
                Private Key: {privateKey}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b5b5b5', fontSize: '0.8rem' }}>
                Sol address: {walletAddress}
                </Typography>
            </>
            )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainPage;