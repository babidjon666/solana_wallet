import React, { useState } from 'react';
import { Layout } from 'antd';
import LeftMenu from './Components/LeftMenu';
import Portfolio from './Portfolio';
import TradeBanner from './Components/TradeBanner';
import Swap from './Swap';

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
        }}
      >
        <LeftMenu selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        {selectedButton === "Portfolio" && (
          <div>
            <TradeBanner />
            <Portfolio />
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