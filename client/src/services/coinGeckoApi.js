import axios from 'axios';

export const getTopVolumeCoins = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        category: 'solana-ecosystem',
        order: 'volume_desc', // Сортировка по объему торгов
        per_page: 15, // Получаем топ-10 по объему
        page: 1,
        sparkline: false,
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
};
