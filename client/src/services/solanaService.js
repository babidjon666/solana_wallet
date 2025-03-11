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
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
    
        if (!response.ok) {
          throw new Error('Failed to fetch SOL price');
        }
    
        const data = await response.json();
    
        const solToUsdRate = data.solana.usd;
    
        const usdBalance = sol_balance * solToUsdRate;
    
        return usdBalance;
      } catch (error) {
        console.error('Error converting SOL to USD:', error);
        return null;
      }
    }
}

export default new SolanaService();