class BotService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async addBot(growid, password, proxy) {
      try {
        const response = await this.axios.post('/bot', { growid, password, proxy });
        return response.data;
      } catch (error) {
        console.error('Error adding bot:', error);
        throw error;
      }
    }
  
    async removeBot(botId) {
      try {
        const response = await this.axios.delete(`/bot/${botId}`);
        return response.data;
      } catch (error) {
        console.error('Error removing bot:', error);
        throw error;
      }
    }
  
    async updateBot(botId, data) {
      try {
        const response = await this.axios.put(`/bot/${botId}`, { data });
        return response.data;
      } catch (error) {
        console.error('Error updating bot:', error);
        throw error;
      }
    }
  }
  
  export default BotService;