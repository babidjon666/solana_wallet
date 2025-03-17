import React from 'react';
import { Layout, Image, Divider, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;


const CoinInfo = ({coinDetails}) => {
    return (
        <Content
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          width: '100%',
          padding: '20px',
        }}
      >
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '15px'
        }}>Token Info</h3>
        
        {coinDetails ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Image src={coinDetails.image?.small} width={30} height={30} style={{borderRadius: '50%'}}/>
              <Text strong>{coinDetails.name} (${coinDetails.symbol?.toUpperCase()})</Text>
            </div>
            <Divider style={{margin: '10px 0'}}/>
            <div>
              <Text>Price: ${coinDetails.market_data?.current_price?.usd}</Text>
            </div>
            <div>
              <Text>Market Cap: ${coinDetails.market_data?.market_cap?.usd?.toLocaleString()}</Text>
            </div>
            <div>
              <Text>Trading volume for 24 hours: ${coinDetails.market_data?.total_volume?.usd?.toLocaleString()}</Text>
            </div>
            <div>
              <Text>Price change in 24 hours: {coinDetails.market_data?.price_change_percentage_24h}%</Text>
            </div>
          </div>
        ) : (
          <Text>Choose a coin to view information</Text>
        )}
      </Content>
    )
}

export default CoinInfo;