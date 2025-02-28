import React, { useState } from 'react';
import { Button } from 'antd';

{/* Кнопка для меню */}
const MenuButton = ({
  icon: IconComponent, 
  text = 'Text', 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    color: isHovered ? 'black' : 'grey', 
    border: 'none', 
    backgroundColor: isHovered ? 'transparent' : 'transparent', 
    padding: '5px',
    boxShadow: 'none', 
    width: 250, 
    height: 50, 
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    transform: isHovered ? 'translateX(5px)' : 'translateX(0)', 
    transition: 'transform 0.2s ease, background-image 0.2s ease', 
    backgroundImage: isHovered
      ? 'linear-gradient(to right, #f7f9ff, white)' 
      : 'none',
  };

  const iconContainerStyle = {
    backgroundColor: 'white', 
    borderRadius: '10px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '8px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {IconComponent && (
        <div style={iconContainerStyle}>
          <IconComponent /> 
        </div>
      )}
      <div style={{ marginLeft: IconComponent ? '12px' : '0' }}>{text}</div>
    </Button>
  );
};

export default MenuButton;