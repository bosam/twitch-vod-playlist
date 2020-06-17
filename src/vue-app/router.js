import Vue from 'vue';
import Router from 'vue-router';
import Playlist from './components/Playlist';
import Settings from './components/Settings';

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
            name: 'settings',
            path: '/settings',
            component: Settings
        }
    ]
});
