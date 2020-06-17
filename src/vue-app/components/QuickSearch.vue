<template>
    <div>
        <b-nav class="navbar navbar-light bg-light">
            <form class="form form-inline" @submit.stop.prevent="formSubmit">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Name of channel" aria-label="Name of channel" aria-describedby="basic-addon2" v-model="channelName">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary search-channel-btn" type="submit" :disabled="!formSubmittable"><font-awesome-icon icon="search"></font-awesome-icon></button>
                    </div>
                </div>
                <div class="form-group mb-3" style="margin-left: 10px;">
                    <button class="form-control" type="button" @click="clearFields"><font-awesome-icon icon="trash-alt"></font-awesome-icon></button>
                </div>
            </form>
            <div class="pull-right form-group mb-3">
                <button :disabled="!formSubmittable" class="refresh-btn form-control" type="button" @click="formSubmit"><font-awesome-icon icon="sync"></font-awesome-icon> Refresh</button>
            </div>
        </b-nav>

        <video-list :list="videoList" :channelName="channelName" />
    </div>
</template>

<script>
/* eslint-disable indent */
    import VideoList from './VideoList';
    import FetchService from '../services/fetch.service';

    export default {
        name: 'QuickSearch',
        components: {
            VideoList
        },
        computed: {
            formSubmittable() {
                return '' !== this.channelName;
            }
        },
        data: () => {
            return {
                videoList: {},
                channelName: '',
                countModel: 25,
            };
        },
        methods: {
            formSubmit() {
                FetchService.search(this.channelName, 25).then(response => {
                    this.videoList = response.data.data;
                });
            },
            clearFields() {
                this.$root.$emit('clearing_fields');
            }
        },
        mounted() {
            this.$root.$on('clearing_fields', () => {
                console.info('Clearing up fields');
                this.channelName = '';
                this.videoList = {};
            });
        }
    };
</script>

<style>

</style>
