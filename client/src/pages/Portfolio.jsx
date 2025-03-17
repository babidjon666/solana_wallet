import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Image, message, Divider } from 'antd';
import CopyButton from './Custom/copuButtons';

const { Content } = Layout;

const Portfolio = () => {
  const location = useLocation();
  const walletAddress = location.state?.walletAddress;

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
          width: '100%',
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
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: '25px',
        width: '1050px',
        marginRight: '20px',
        padding: '20px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '10px',
      }}>
        <Image
          width={60}
          height={60}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{ borderRadius: '50%' }}
        />
        <div style={{ marginLeft: '10px' }}>
          <CopyButton walletAddress={walletAddress} />
        </div>
      </div>
      <Divider style={{ margin: '20px 0', borderColor: '#DCDCDC' }} />
      <div>
      <h4 style={{ fontSize: '30px', margin: '0', fontFamily: 'Roboto, sans-serif' }}>
        $200
      </h4>
      </div>
    </Content>
  );
};

export default Portfolio;