import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Image, message, Divider, Select, Input, Button } from 'antd';
import { getTopVolumeCoins } from '../services/coinGeckoApi';

const { Content } = Layout;

const Swap = () => {
  const location = useLocation();
  const walletAddress = location.state?.walletAddress;
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [mostValueCoins, setMostValueCoins] = useState(null);

  useEffect(() => {
    const fetchmostValueCoins = async () => {
      const popularCoins = await getTopVolumeCoins();
      setMostValueCoins(popularCoins);
    }
    fetchmostValueCoins();
  }, []);

  //имя монеты, количество
  const userCoins = {
    WIF: {
      name: 'WIF',
      amount: 100,
      image: 'https://image-cdn.solana.fm/images/?imageUrl=https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link'
    },
    USDC: {
      name: 'USDC',
      amount: 75,
      image: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png'
    },
    SOL: {
      name: 'SOL',
      amount: 100,
      image: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png'
    },
  }

  if (!walletAddress) {
    message.error('Адрес кошелька не найден');
    return (
      <Content
        style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '25px',
          width: '500px',
          marginRight: '20px',
        }}
      >
        <h3>Адрес кошелька не передан</h3>
      </Content>
    );
  }

  return (
    <Content
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: '25px',
        width: '900px',
        marginRight: '20px',
        gap: '20px',
      }}
    >
      <Content
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          width: '400px',
          padding: '20px',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '15px'
          }}>Chart {selectedCoin || 'Selected Coin'}</h3>
      </Content>

      <Content
        style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '24px',
          width: '400px',
          padding: '40px',
        }}>
          <div style={{ width: '100%', marginBottom: '30px' }}>
            <h3 style={{ 
              color: '#14F195',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '15px'
            }}>From</h3>

            <Select
              style={{ 
                width: '100%', 
                height: '45px',
                marginBottom: '15px',
                borderRadius: '12px',
              }}
              placeholder="Choose coin"
              dropdownStyle={{ borderRadius: '12px' }}
              onChange={(value) => setSelectedCoin(value)}
            >
              {Object.entries(userCoins).map(([name, {image, amount}]) => (
                <Select.Option key={name} value={name}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <Image src={image} width={30} height={30} style={{borderRadius: '50%'}}/>
                      <h3 style={{fontSize: '16px', fontWeight: '600'}}>${name}</h3>
                    </div>
                    <h3 style={{fontSize: '16px', fontWeight: '600', color: '#808080'}}>{amount}</h3>
                  </div>
                </Select.Option>
              ))}
            </Select>

            <Input 
              placeholder="Amount" 
              style={{ 
                width: '100%',
                height: '45px',
                borderRadius: '12px',
                fontSize: '16px'
              }} 
            />
          </div>

          <div style={{ width: '100%', marginBottom: '30px' }}>
            <h3 style={{ 
              color: '#9945FF',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '15px'
            }}>To</h3>

            <Select
              style={{ 
                width: '100%', 
                height: '45px',
                marginBottom: '15px',
                borderRadius: '12px'
              }}
              placeholder="Choose coin"
              dropdownStyle={{ borderRadius: '12px' }}
            >
                

            {mostValueCoins && Object.entries(mostValueCoins).map(([coin, {image, symbol}]) => (
                <Select.Option key={coin} value={coin}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <Image src={image} width={30} height={30} style={{borderRadius: '50%'}}/>
                      <h3 style={{fontSize: '16px', fontWeight: '600'}}>${symbol.toUpperCase()}</h3>
                    </div>
                  </div>
                </Select.Option>
              ))}
            </Select>
            <Input 
              placeholder="Amount" 
              style={{ 
                width: '100%',
                height: '45px',
                borderRadius: '12px',
                fontSize: '16px'
              }} 
              disabled 
            />
          </div>

          <Button
            type="primary"
            style={{
              width: '60%',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #14F195, #9945FF)',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Swap
          </Button>
      </Content>
    </Content>
  );
};

export default Swap;