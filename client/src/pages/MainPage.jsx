import React from 'react';
import { Layout } from 'antd';
import LeftMenu from './Components/LeftMenu';
const { Content } = Layout;

{/* Основная страничка */}
const MainPage = () => {
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
        <LeftMenu/>
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