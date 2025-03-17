import React from "react";
import { Layout, Image } from 'antd';

const { Content } = Layout;

const TradeBanner = () => {
    return (
        <Content
          style={{
            display: 'flex',
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            borderRadius: '25px',
            width: '100%',
            marginBottom: '20px',
            padding: '0', 
            overflow: 'hidden', 
          }}
        >
          <div
            style={{
              width: '100%', 
              height: '150px', 
              borderRadius: '25px', 
              overflow: 'hidden',
              position: 'relative',
              background: 'linear-gradient(90deg, #14F195, #9945FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div style={{
              color: 'white',
              textAlign: 'center',
              zIndex: 1
            }}>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Swap Tokens Instantly
              </h2>
              <p style={{
                fontSize: '16px',
                opacity: 0.9
              }}>
                Trade tokens on Solana with the best rates and lowest fees
              </p>
            </div>
          </div>
        </Content>
    );
}

export default TradeBanner;