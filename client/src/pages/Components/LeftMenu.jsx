import React from 'react';
import { ProfileOutlined, SwapOutlined, TransactionOutlined, WechatOutlined, SettingOutlined, FileImageOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import MenuButton from '../Custom/menuButton';
import BalanceCard from './BalanceCard';

const { Content } = Layout;

const LeftMenu = ({ selectedButton, setSelectedButton }) => {
  return (
    <Content
      style={{
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '25px',
        width: '0px',
        marginRight: '20px',
        padding: '20px',
        height: '750px',
        minWidth: '300px',
        maxWidth: '300px'
      }}
    >
      <BalanceCard />
      <MenuButton
        text="Portfolio"
        icon={ProfileOutlined}
        isSelected={selectedButton === "Portfolio"}
        onClick={() => setSelectedButton("Portfolio")}
      />
      <MenuButton
        text="NFT"
        icon={FileImageOutlined}
        isSelected={selectedButton === "NFT"}
        onClick={() => setSelectedButton("NFT")}
      />
      <MenuButton
        text="Swap"
        icon={SwapOutlined}
        isSelected={selectedButton === "Swap"}
        onClick={() => setSelectedButton("Swap")}
      />
      <MenuButton
        text="Transactions"
        icon={TransactionOutlined}
        isSelected={selectedButton === "Transactions"}
        onClick={() => setSelectedButton("Transactions")}
      />
      <MenuButton
        text="Friends"
        icon={WechatOutlined}
        isSelected={selectedButton === "Friends"}
        onClick={() => setSelectedButton("Friends")}
      />
      <MenuButton
        text="Settings"
        icon={SettingOutlined}
        isSelected={selectedButton === "Settings"}
        onClick={() => setSelectedButton("Settings")}
      />
    </Content>
  );
};

export default LeftMenu;