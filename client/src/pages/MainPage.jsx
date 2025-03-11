import React, { useState } from 'react';
import { Layout } from 'antd';
import LeftMenu from './Components/LeftMenu';
import Portfolio from './Portfolio';
import TradeBanner from './Components/TradeBanner';

const { Content } = Layout;

const MainPage = () => {
  const [selectedButton, setSelectedButton] = useState("Portfolio"); // Изначально выбрана кнопка "Portfolio"

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
        <div>
          <TradeBanner />
          <Portfolio />
        </div>
      </Content>
    </Layout>
  );
};

export default MainPage;