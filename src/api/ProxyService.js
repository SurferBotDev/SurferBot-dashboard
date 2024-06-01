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

  async checkProxy(proxy) {
    try {
      const response = await this.axios.get(`/proxy/check/${proxy}`);
      return response.data;
    } catch (error) {
      console.error('Error checking proxy:', error);
      throw error;
    }
  }

  async getProxy(proxy) {
    try {
      const response = await this.axios.get(`/proxy/${proxy}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching proxy information:', error);
      throw error;
    }
  }

  async getProxies() {
    try {
      const response = await this.axios.get('/proxy');
      return response.data;
    } catch (error) {
      console.error('Error fetching proxies information:', error);
      throw error;
    }
  }
}

export default ProxyService;
