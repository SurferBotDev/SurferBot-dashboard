class GlobalService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async enableCliMode() {
      try {
        const response = await this.axios.get('/cliMode/true');
        return response.data;
      } catch (error) {
        console.error('Error enabling CLI mode:', error);
        throw error;
      }
    }
  
    async getStatus() {
      try {
        const response = await this.axios.get('/status');
        return response.data;
      } catch (error) {
        console.error('Error getting status:', error);
        throw error;
      }
    }
  }
  
  export default GlobalService;
  