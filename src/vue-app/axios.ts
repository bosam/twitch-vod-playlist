import axios from 'axios';
import { stringify } from 'qs';
import SettingsService from './services/settings.service';

let settings;
SettingsService.load().then(settingsObj => {
  settings = settingsObj;
});

let accessToken = '';
const askToken = function(originalRequest) {
  return axios.post('https://id.twitch.tv/oauth2/token',
    stringify({
      'client_id': settings.credentials['client_id'],
      'client_secret': settings.credentials['client_secret'],
      'grant_type': 'client_credentials'
    }))
    .then(res => {
      accessToken = res.data['access_token'];
      return axios(originalRequest);
    }).catch(error => {
      console.error(error);
    });
};

axios.interceptors.request.use(config => {
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  if ('https://id.twitch.tv/oauth2/token' !== config.url) {
    config.headers['Client-ID'] = settings.credentials['client_id'];
  }

  return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  return response;
}, function(error) {
  const originalRequest = error.config;
  if (401 === error.response.status &&
    !originalRequest._retry) {
    console.info('About to retry...');
    originalRequest._retry = true;
    return askToken(originalRequest);
  }
});

export default axios;
