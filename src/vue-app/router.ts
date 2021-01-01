import Vue from 'vue';
import Router from 'vue-router';
import Playlist from './components/Playlist.vue';
import Settings from './components/Settings.vue';
import Channels from './components/Channels.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'hash',
  routes: [
    {
      name: 'playlist',
      path: '/',
      component: Playlist,
    },
    {
      name: 'channels',
      path: '/channels',
      component: Channels
    },
    {
      name: 'settings',
      path: '/settings',
      component: Settings
    }
  ]
});
