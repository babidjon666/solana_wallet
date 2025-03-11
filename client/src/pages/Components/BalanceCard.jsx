import React, { useEffect, useState } from 'react';
import solanaService from '../../services/solanaService';
import { useLocation } from 'react-router-dom';
import { Card, Typography, Spin, Alert } from 'antd';
const { Text } = Typography;

const BalanceCard = () => {
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
        const intervalId = setInterval(fetchBalance, 5000); // обновление баланса каждые 5 секунд

        return () => clearInterval(intervalId);
    }, [walletAddress]);

    const fetchBalance = async () => {
        try {
            setLoading(true); // Начинаем загрузку
            const SOL_BALANCE = await solanaService.get_balance(walletAddress);
            console.log('SOL Balance:', SOL_BALANCE);
            // Обновляем баланс, если он изменился
            if (balance !== SOL_BALANCE) {
                setBalance(SOL_BALANCE);
                setError(null); // если нет ошибки, сбрасываем ошибку
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch balance');
        } finally {
            setLoading(false); // Завершаем загрузку
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

    return (
        <Card
            style={{
                width: '100%',
                height: 150,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                marginBottom: '20px',
                backgroundImage: 'linear-gradient(to right, #A763F1, #72dfed)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: '16px',
            }}
        >
            {error && (
                <Alert message={error} type="error" showIcon /> // Отображаем ошибку, если она есть
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text strong style={{ fontSize: '24px', fontFamily: 'Roboto, sans-serif', color: 'white' }}>Wallet</Text>
                <Text strong style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif', color: 'white' }}>
                    {loading ? <Spin size="small" /> : `${balance} SOL ≈ ${usdBalance !== null ? `${usdBalance.toFixed(2)}$` : 'N/A'}`}
                </Text>
            </div>
        </Card>
    );
};

export default BalanceCard;