import axios from '../axios';

const channelsId = {};

class FetchService {
  async fetchChannelId(channelName) {
    const response = await axios.get('https://api.twitch.tv/helix/users', {
      params: {
        login: channelName
      }
    });
    console.log(response.data);
    channelsId[channelName] = response.data.data[0]['id'];
  }

  async fetchChannelObjectByName(channelName) : Promise<Types.Channel> {
    const response = await axios.get('https://api.twitch.tv/helix/users', {
      params: {
        login: channelName
      }
    });

    if (0 === response.data.data.length) {
      return Promise.reject('No channel found with that name');
    }

    const channelObj = response.data.data[0];
    return {
      internalId: null,
      channelId: channelObj['id'],
      channel: channelObj['login'],
      label: channelObj['display_name'],
    };
  }

  search(channelName, count) {
    if (!(channelName in channelsId)) {
      return this.fetchChannelId(channelName).then(() => {
        return this.search(channelName, count);
      });
    }

    return axios.get('https://api.twitch.tv/helix/videos', {
      params: {
        'user_id': channelsId[channelName],
        'type': 'archive',
        'first': count
      }
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }

  async loadVideoList(channel: Types.Channel, count: number) {
    return axios.get('https://api.twitch.tv/helix/videos', {
      params: {
        'user_id': channel.channelId,
        'type': 'archive',
        'first': count
      }
    }).catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
  }
}

export default new FetchService();
