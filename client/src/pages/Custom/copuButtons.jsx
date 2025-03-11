import React, { useState } from 'react';
import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const CopyButton = ({ walletAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
        .then(() => {
          message.success("Copied!")
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); 
        })
        .catch(() => {
          message.error('Не удалось скопировать');
        });
    }
  };

  const shortenedAddress = walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : '';

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '5px',
    borderRadius: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundImage: 'linear-gradient(to right, #f7f9ff, white)'
  };

  const addressStyle = {
    fontSize: '16px',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    marginRight: '10px',
  };

  const buttonStyle = {
    fontSize: '18px',
    color: '#000', 
    padding: '0',  
  };

  return (
    <div style={containerStyle}>
      <span style={addressStyle}>{shortenedAddress}</span>
      <Button
        type="link"
        icon={<CopyOutlined />}
        onClick={handleCopy}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.color = '#333'}  
        onMouseLeave={(e) => e.target.style.color = '#000'} 
      />
    </div>
  );
};

export default CopyButton;