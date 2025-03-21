import axios from 'axios';
import { message } from 'antd';
export const getTopVolumeCoins = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd', // Получаем цены в долларах
        category: 'solana-ecosystem', // Фильтруем только Solana токены
        order: 'volume_desc', // Сортируем по объему торгов
        per_page: 15, // Берем только 15 монет
        page: 1,
        sparkline: false,
      }
    });

    return response.data;
  } catch (error) {
    message.error('Ошибка при получении данных:', error);
    return [];
  }
};

export const getCoinDetails = async (symbol) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}`);
    //return response.data.platforms.solana; для получения адреса контракта
    return response.data
  } catch (error) {
    message.error('Ошибка при получении данных:', error);
    return null;
  }
};

export const getHistoricalData = async (coinId, currency = 'usd', days = 30) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days, 
      }
    });


    const prices = response.data.prices; 
    const volumes = response.data.total_volumes; 


    const formattedData = prices.map((price, index) => ({
      time: new Date(price[0]),  
      price: price[1], 
      volume: volumes[index][1] 
    }));

    return formattedData;
  } catch (error) {
    message.error('Ошибка при получении данных:', error);
    return [];
  }
};


