class SettingsService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async getSettings() {
      try {
        const response = await this.axios.get('/settings');
        return response.data;
      } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }
    }
  
    async updateSettings(data) {
      try {
        const response = await this.axios.put('/settings', data);
        return response.data;
      } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
      }
    }
  }
export default SettingsService;