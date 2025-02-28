import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography, Spin, Avatar } from 'antd';
import { useLocation } from 'react-router-dom';
import solanaService from '../services/solanaService';
import { ProfileOutlined, SwapOutlined, TransactionOutlined, WechatOutlined, SettingOutlined, FileImageOutlined } from '@ant-design/icons';
import MenuButton from './Custom/menuButton';

const { Content } = Layout;
const { Text } = Typography;

const MainPage = () => {
  const [balance, setBalance] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null); // Состояние для USD баланса
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

  // Функция для получения баланса в SOL
  const fetchBalance = async () => {
    try {
      const SOL_BALANCE = await solanaService.get_balance(walletAddress);
      setBalance(SOL_BALANCE);
      setError(null); // Сбрасываем ошибку при успешном запросе
    } catch (err) {
      setError(err.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  // Конвертация SOL в USD при изменении баланса
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
  }, [balance]); // Зависимость от balance

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'white', padding: 24 }}>
      <Content
        style={{
          display: 'flex',
          backgroundColor: '#e9e9e9', // серый
          flexDirection: 'row', // Меняем на row для горизонтального расположения
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderRadius: '25px',
          padding: '20px',
        }}
      >
        {/* Левый контейнер с карточкой и кнопками */}
        <Content
          style={{
            display: 'flex',
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '25px',
            width: '100px',
            marginRight: '20px', // Добавляем отступ между элементами
            padding: '20px',
            height: '750px',
          }}
        >
          {/* Карточка с балансом */}
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

          {/* Кнопки меню */}
          <MenuButton text="Profile" icon={ProfileOutlined} />
          <MenuButton text="NFT" icon={FileImageOutlined} />
          <MenuButton text="Swap" icon={SwapOutlined} />
          <MenuButton text="Transactions" icon={TransactionOutlined} />
          <MenuButton text="Friends" icon={WechatOutlined} />
          <MenuButton text="Settings" icon={SettingOutlined} />
        </Content>

        {/* Правый контейнер */}
        <Content
          style={{
            display: 'flex',
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '25px',
            width: '800px',
            marginRight: '20px', // Добавляем отступ между элементами
          }}
        >
          ds
        </Content>
      </Content>
    </Layout>
  );
};

export default MainPage;