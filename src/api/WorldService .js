class WorldService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async getWorld(botId) {
      try {
        const response = await this.axios.get(`/world/${botId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching world information:', error);
        throw error;
      }
    }
  
    async addWorld(botId, type, worldName) {
      try {
        const response = await this.axios.post(`/world/${botId}`, { type, worldName });
        return response.data;
      } catch (error) {
        console.error('Error adding world:', error);
        throw error;
      }
    }
  
    async removeWorld(botId, type, worldName) {
      try {
        const response = await this.axios.delete(`/world/${botId}`, { data: { type, worldName } });
        return response.data;
      } catch (error) {
        console.error('Error removing world:', error);
        throw error;
      }
    }
}
export default WorldService;