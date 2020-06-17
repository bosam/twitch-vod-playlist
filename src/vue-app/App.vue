<template lang="html">
    <b-container class="container">
        <b-nav tabs>
            <b-nav-item :to="{ name: 'playlist'}" exact exact-active-class="active"><img :src="logo" width="16" height="16" alt="Twitch Playlist" /> Playlist</b-nav-item>
            <b-nav-item :to="{ name: 'settings'}" exact exact-active-class="active"><font-awesome-icon icon="cog"></font-awesome-icon> Settings</b-nav-item>
        </b-nav>

        <router-view></router-view>
    </b-container>
</template>

<script>
/* eslint-disable indent */
    'use strict';

    import logo from '../electron-app/icon.png';

    export default {
        name: 'App',
        data() {
            return {
                logo: logo
            };
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        padding: 5px;
    }
</style>
