class ScriptService {
    constructor(axiosInstance) {
      this.axios = axiosInstance;
    }
  
    async executeScript(script) {
      try {
        const response = await this.axios.post('/script/execute', { script });
        return response.data;
      } catch (error) {
        console.error('Error executing script:', error);
        throw error;
      }
    }
  
    async getScriptInformation(scriptId) {
      try {
        const response = await this.axios.get(`/script/${scriptId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching script information:', error);
        throw error;
      }
    }
  
    async stopScript(scriptId) {
      try {
        const response = await this.axios.get(`/script/stop/${scriptId}`);
        return response.data;
      } catch (error) {
        console.error('Error stopping script:', error);
        throw error;
      }
    }
  }
  
  export default ScriptService;
  