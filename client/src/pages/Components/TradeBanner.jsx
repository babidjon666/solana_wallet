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
            width: '1050px',
            marginRight: '20px',
            padding: '0', 
            overflow: 'hidden', 
          }}
        >
          <div
            style={{
              width: '100%', 
              height: '125px', 
              borderRadius: '25px', 
              overflow: 'hidden', 
              border: 'none',
            }}
          >
            <Image
              src="https://public.bnbstatic.com/static/content/square/images/f39c1a9b9eab425b94a311e858fc28a1.jpg"
              alt="Trade Banner"
              style={{
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center', 
                display: 'block', 
                border: 'none', 
              }}
              preview={false} 
            />
          </div>
        </Content>
    );
}

export default TradeBanner;