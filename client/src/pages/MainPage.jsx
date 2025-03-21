import React, { useState } from 'react';
import { Layout } from 'antd';
import LeftMenu from './Components/LeftMenu';
import Portfolio from './Portfolio';
import TradeBanner from './Components/TradeBanner';
import Swap from './Swap';
import MyTokens from './MyTokens';
import WalletStats from './WalletStats';
const { Content } = Layout;

const MainPage = () => {
  const [selectedButton, setSelectedButton] = useState("Portfolio"); 

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'white', padding: 24 }}>
      <Content
        style={{
          display: 'flex',
          backgroundColor: '#e9e9e9',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderRadius: '25px',
          padding: '20px',
          maxHeight: '100vh'
        }}
      >
        <LeftMenu selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        {selectedButton === "Portfolio" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TradeBanner />
            <Portfolio />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <MyTokens />
              <WalletStats />
            </div>
          </div>
        )}
        {selectedButton === "Swap" && (
          <Swap />
        )}
      </Content>
    </Layout>
  );
};

export default MainPage;