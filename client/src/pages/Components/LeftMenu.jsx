import React, { useState } from 'react';
import { ProfileOutlined, SwapOutlined, TransactionOutlined, WechatOutlined, SettingOutlined, FileImageOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import MenuButton from '../Custom/menuButton';
import BalanceCard from './BalanceCard';

const { Content } = Layout;

{/* Левый контейнер с карточкой баланса и кнопками */}
const LeftMenu = () => {
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
            }}
        >
            <BalanceCard/>

            <MenuButton text="Portfolio" icon={ProfileOutlined} />
            <MenuButton text="NFT" icon={FileImageOutlined} />
            <MenuButton text="Swap" icon={SwapOutlined} />
            <MenuButton text="Transactions" icon={TransactionOutlined} />
            <MenuButton text="Friends" icon={WechatOutlined} />
            <MenuButton text="Settings" icon={SettingOutlined} />
        </Content>
    )
};

export default LeftMenu;