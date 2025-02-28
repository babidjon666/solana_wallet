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
}

export default new SolanaService();