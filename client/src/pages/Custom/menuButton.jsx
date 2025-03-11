import React, { useState } from 'react';
import { Button } from 'antd';

const MenuButton = ({
  icon: IconComponent,
  text = 'Text',
  isSelected = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Стиль для кнопки
  const buttonStyle = {
    color: isHovered || isSelected ? 'black' : 'grey',
    border: 'none',
    backgroundColor: isSelected ? 'linear-gradient(to right, #e4e9f7, #72dfed)' : isHovered ? '#f7f9ff' : 'transparent',
    padding: '5px',
    boxShadow: 'none',
    width: 250,
    height: 50,
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transform: isSelected ? 'translateX(10px)' : isHovered ? 'translateX(5px)' : 'translateX(0)',
    transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
  };

  // Стиль для контейнера иконки
  const iconContainerStyle = {
    backgroundImage: isSelected ? 'linear-gradient(to right, #A763F1, #72dfed)' : 'none', 
    backgroundColor: isSelected ? '#e4e9f7' : 'white',
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
      onClick={onClick}
    >
      {IconComponent && (
        <div style={iconContainerStyle}>
          <IconComponent />
        </div>
      )}
      <div style={{ fontFamily: 'Roboto, sans-serif', marginLeft: IconComponent ? '12px' : '0' }}>
        {text}
      </div>
    </Button>
  );
};

export default MenuButton;