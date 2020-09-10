import axios from '../axios';

const channelsId = {};

class FetchService {
    fetchChannelId(channelName) {
        return axios.get('https://api.twitch.tv/helix/users', {
            params: {
                login: channelName
            }
        }).then(response => {
            channelsId[channelName] = response.data.data[0]['id'];
        });
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
}

export default new FetchService();
