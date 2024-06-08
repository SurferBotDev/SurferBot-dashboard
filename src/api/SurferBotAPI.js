import axios from 'axios';
import BotService from './BotService';
import ProxyService from './ProxyService';
import ScriptService from './ScriptService';
import GlobalService from './GlobalService';
import RotationService from './RotationService';
import WorldService from './WorldService ';
import SwitchService from './SwitchService';
import SettingsService from './SettingsService';
import FileService from './FileService';

class SurferBotAPI {
  constructor(baseURL, password) {
    this.axiosInstance = axios.create({
      baseURL: baseURL+'/api/v1',
      headers: {
        'Password': password,
        'Content-Type': 'application/json'
      },
      timeout: 2000
    });

    this.botService = new BotService(this.axiosInstance);
    this.proxyService = new ProxyService(this.axiosInstance);
    this.scriptService = new ScriptService(this.axiosInstance);
    this.globalService  = new GlobalService(this.axiosInstance);
    this.rotationService  = new RotationService(this.axiosInstance);
    this.settingsService  = new SettingsService(this.axiosInstance);
    this.switchService = new SwitchService(this.axiosInstance);
    this.worldService = new WorldService(this.axiosInstance);
    this.FileService = new FileService(this.axiosInstance);
  }
}

export default SurferBotAPI;
