import React, { useState } from 'react';
import { Button } from 'antd';

const MenuButton = ({
  icon: IconComponent, // Переименуем проп icon в IconComponent
  text = 'Text', // Текст кнопки (по умолчанию "Text")
  textSize = '17px', // Размер текста (по умолчанию 16px)
  defaultColor = 'grey', // Цвет текста по умолчанию
  hoverColor = 'black', // Цвет текста при наведении
  defaultBgColor = 'transparent', // Цвет фона по умолчанию
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    color: isHovered ? hoverColor : defaultColor, // Цвет текста
    border: 'none', // Убираем обводку
    backgroundColor: isHovered ? 'transparent' : defaultBgColor, // Прозрачный фон при наведении
    padding: '5px', // Отступы
    boxShadow: 'none', // Убираем тень
    width: 250, // Ширина кнопки
    height: 50, // Высота кнопки
    fontSize: textSize, // Размер текста
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Прижимаем содержимое к левому краю
    transform: isHovered ? 'translateX(5px)' : 'translateX(0)', // Сдвиг вправо при наведении
    transition: 'transform 0.2s ease, background-image 0.2s ease', // Плавный переход
    backgroundImage: isHovered
      ? 'linear-gradient(to right, #f7f9ff, white)' // Градиент при наведении
      : 'none', // Без градиента, если нет наведения
  };

  const iconContainerStyle = {
    backgroundColor: 'white', // Белый фон для иконки
    borderRadius: '10px', // Закругленные углы
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Тень
    padding: '8px', // Отступы внутри контейнера
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
          <IconComponent /> {/* Рендерим иконку как компонент */}
        </div>
      )}
      <div style={{ marginLeft: IconComponent ? '12px' : '0' }}>{text}</div>
    </Button>
  );
};

export default MenuButton;