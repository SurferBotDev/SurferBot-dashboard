class ProxyService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async addProxy(proxy) {
      try {
        const response = await this.axios.post('/proxy', { proxy });
        return response.data;
      } catch (error) {
        console.error('Error adding proxy:', error);
        throw error;
      }
    }
  
    async removeProxy(proxy) {
      try {
        const response = await this.axios.delete(`/proxy/${proxy}`);
        return response.data;
      } catch (error) {
        console.error('Error removing proxy:', error);
        throw error;
      }
    }
  
    async getProxyInformation(proxy) {
      try {
        const response = await this.axios.get(`/proxy/${proxy}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching proxy information:', error);
        throw error;
      }
    }
  
    async getProxiesInformation() {
      try {
        const response = await this.axios.get('/proxy');
        return response.data;
      } catch (error) {
        console.error('Error fetching proxies information:', error);
        throw error;
      }
    }
  
    async getRotationInformation() {
      try {
        const response = await this.axios.get('/rotation');
        return response.data;
      } catch (error) {
        console.error('Error fetching rotation information:', error);
        throw error;
      }
    }
  }
  
  export default ProxyService;
  