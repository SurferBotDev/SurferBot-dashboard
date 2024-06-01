class RotationService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async getWorlds() {
      try {
        const response = await this.axios.get('/rotation');
        return response.data;
      } catch (error) {
        console.error('Error fetching rotation information:', error);
        throw error;
      }
    }
  
    async addWorld(name, doorId, type) {
      try {
        const response = await this.axios.post('/rotation', { name, doorId, type });
        return response.data;
      } catch (error) {
        console.error('Error adding world to rotation:', error);
        throw error;
      }
    }
  
    async removeWorld(worldName) {
      try {
        const response = await this.axios.delete(`/rotation/${worldName}`);
        return response.data;
      } catch (error) {
        console.error('Error removing world from rotation:', error);
        throw error;
      }
    }
}
export default RotationService;