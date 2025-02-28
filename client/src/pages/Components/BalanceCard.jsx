import React, { useEffect, useState } from 'react';
import solanaService from '../../services/solanaService';
import { useLocation } from 'react-router-dom';
import { Card, Typography } from 'antd';
const { Text } = Typography;

{/* Карточка с балансом */}
const BalanceCard = () =>{
    const [balance, setBalance] = useState(null);
    const [usdBalance, setUsdBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const walletAddress = location.state?.walletAddress;

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
          setError(null); 
        } catch (err) {
          setError(err.message || 'Failed to fetch balance');
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        if (balance !== null) {
          const convertToUsd = async () => {
            try {
              const usd = await solanaService.sol_to_usd(balance);
              setUsdBalance(usd);
            } catch (err) {
              console.error('Error converting SOL to USD:', err);
              setUsdBalance(null);
            }
          };
    
          convertToUsd();
        }
      }, [balance]);

    return(         
         <Card
         loading={loading}
         style={{
           width: '100%',
           height: 150,
           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Тень для карточки
           marginBottom: '20px', // Отступ снизу
           backgroundImage: 'linear-gradient(to right, #e4e9f7, white)', // Градиентный фон
           display: 'flex',
           flexDirection: 'column',
           justifyContent: 'flex-end', // Прижимаем контент к низу
           alignItems: 'flex-start', // Прижимаем контент к левому краю
           padding: '16px', // Отступы внутри карточки
         }}
       >
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
           <Text strong style={{ fontSize: '24px' }}>Wallet</Text>
           <Text strong style={{ fontSize: '16px' }}>
             {balance} SOL ≈ {usdBalance !== null ? `${usdBalance.toFixed(2)}$` : 'Loading...'}
           </Text>
         </div>
       </Card>
    );
};

export default BalanceCard;