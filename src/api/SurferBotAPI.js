import axios from 'axios';
import BotService from './BotService';
import ProxyService from './ProxyService';
import ScriptService from './ScriptService';
import GlobalService from './GlobalService';

class SurferBotAPI {
  constructor(baseURL, password) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Password': password,
        'Content-Type': 'application/json'
      }
    });

    this.botService = new BotService(this.axiosInstance);
    this.proxyService = new ProxyService(this.axiosInstance);
    this.scriptService = new ScriptService(this.axiosInstance);
    this.globalService  = new GlobalService(this.axiosInstance);
  }
}

export default SurferBotAPI;
