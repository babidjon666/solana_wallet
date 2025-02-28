import axios from 'axios';

class SolanaService {
    constructor() {
      this.API_URL = 'http://127.0.0.1:8000';
    }

    async generate_wallet(){
      try {
        const response = await axios.post(`${this.API_URL}/generate_wallet/`);
        return response.data;
      } catch (error) {
        console.error('Error generate wallet:', error);
      }
    }

    async get_balance(walletAddress){
      try{
        const response = await axios.get(`${this.API_URL}/wallet/balance/${walletAddress}`);
        return response.data.balance;
      } catch (error) {
        console.error('Error fetching SOL balance')
      }
    }

    async sol_to_usd(sol_balance) {
      try {
        // Шаг 1: Получаем текущий курс SOL/USD
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
    
        // Проверяем, что ответ успешный
        if (!response.ok) {
          throw new Error('Failed to fetch SOL price');
        }
    
        // Парсим JSON
        const data = await response.json();
    
        // Получаем курс SOL/USD
        const solToUsdRate = data.solana.usd;
    
        // Шаг 2: Конвертируем баланс
        const usdBalance = sol_balance * solToUsdRate;
    
        // Возвращаем результат
        return usdBalance;
      } catch (error) {
        console.error('Error converting SOL to USD:', error);
        return null; // Возвращаем null в случае ошибки
      }
    }
}

export default new SolanaService();