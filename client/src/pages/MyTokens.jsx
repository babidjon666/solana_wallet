import React from 'react';
import { Layout, Image, Typography, List } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const { Content } = Layout;
const { Text } = Typography;

const tokenData = [
  {
    name: 'dogwifhat',
    symbol: 'WIF', 
    price: 0.4,
    amount: 100,
    value: 40,
    image: 'https://image-cdn.solana.fm/images/?imageUrl=https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    price: 1.0,
    amount: 75,
    value: 75,
    image: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 125.5,
    amount: 100,
    value: 12550,
    image: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 125.5,
    amount: 100,
    value: 12550,
    image: 'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png'
  },
]

const MyTokens = () => {
  return (
    <Content style={{
      backgroundColor: 'white',
      borderRadius: '25px',
      width: '100%',
      marginRight: '20px',
      padding: '20px',
      height: '350px'
    }}>
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <List
            itemLayout="horizontal"
            dataSource={tokenData}
            renderItem={(token, index) => (
              <motion.div
                key={index}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <List.Item
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={token.image}
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%' }}
                        preview={false}
                      />
                    }
                    title={
                      <Text style={{ fontSize: '18px', fontWeight: '600' }}>
                        {token.name} (${token.symbol})
                      </Text>
                    }
                    description={
                      <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                        <Text>Price: ${token.price}</Text>
                        <Text>Amount: {token.amount}</Text>
                        <Text>Value: ${token.value}</Text>
                      </div>
                    }
                  />
                </List.Item>
              </motion.div>
            )}
          />
        </AnimatePresence>
      </div>
    </Content>
  )
}

export default MyTokens;