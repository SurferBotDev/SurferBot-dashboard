class SwitchService {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }

    async getInformation() {
        try {
            const response = await this.axios.get('/switch');
            return response.data;
        } catch (error) {
            console.error('Error fetching switch information:', error);
            throw error;
        }
    }

    async updateSwitch(data) {
        try {
            const response = await this.axios.put('/switch', data);
            return response.data;
        } catch (error) {
            console.error('Error updating switch:', error);
            throw error;
        }
    }

    async addSwitch(data) {
        try {
            const response = await this.axios.post('/switch', data);
            return response.data;
        } catch (error) {
            console.error('Error adding switch:', error);
            throw error;
        }
    }

    async removeSwitch(data) {
        try {
            const response = await this.axios.delete('/switch', { data });
            return response.data;
        } catch (error) {
            console.error('Error removing switch:', error);
            throw error;
        }
    }
}
export default SwitchService;