import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import SolanaService from '../services/solanaService';
import { copyToClipboard } from '../services/utilsService';
import PrivateKeyCard from './Components/PrivateKeyCard';

const HomePage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletCreated, setWalletCreated] = useState(false);
  const navigate = useNavigate();

  const handleCreateWallet = async () => {
    try {
      const data = await SolanaService.generate_wallet();
      setPrivateKey(data.private_key);
      setWalletAddress(data.wallet);
      setWalletCreated(true);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const handleCopy = () => {
    copyToClipboard(privateKey);
  };

  const handleConfirm = () => {
    setWalletCreated(false);
    navigate('/main', { state: { walletAddress, privateKey } });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: '#1A1A1A',
        backgroundImage: 'linear-gradient(145deg, #2E2E2E, #1A1A1A)',
      }}
    >
      {!walletCreated ? (
        <Card
          sx={{
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: '#2E2E2E',
            color: '#FFFFFF',
          }}
        >
          <CardContent sx={{ textAlign: 'center', padding: 4 }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6001/6001527.png"
              alt="Logo"
              style={{ width: '100px', marginBottom: '20px' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Welcome
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: '#CCCCCC' }}>
              Securely manage your wallet and private keys.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                mb: 2,
                backgroundColor: '#4486f7',
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: '#6486f7',
                },
              }}
              onClick={handleCreateWallet}
            >
              Create Wallet
            </Button>

            <Button
              variant="contained"
              fullWidth
              startIcon={<VpnKeyIcon />}
              sx={{
                backgroundColor: '#444ed6',
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: '#6486f7',
                },
              }}
            >
              Import Private Key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <PrivateKeyCard
          privateKey={privateKey}
          onCopy={handleCopy}
          onConfirm={handleConfirm}
        />
      )}
    </Box>
  );
};

export default HomePage;