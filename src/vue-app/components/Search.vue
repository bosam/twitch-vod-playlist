<template>
  <div>
    <form
      class="form form-inline bg-light"
      @submit.stop.prevent="formSubmit"
    >
      <div class="form-group">
        <label class="text-muted">I want to see</label>
        <select
          v-model="countModel"
          class="form-control form-control-sm mx-sm-3"
        >
          <option
            v-for="count in countList"
            :key="count"
            :value="count"
            :selected="countModel"
          >
            {{ count }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="text-muted">results for</label>
        <select
          v-model="channelName"
          class="form-control form-control-sm mx-sm-3"
        >
          <option
            v-for="channelItem in options"
            :key="channelItem.channel"
            :value="channelItem.channel"
          >
            {{ channelItem.label }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="btn btn-primary btn-sm my-1"
        :disabled="!formSubmittable"
      >
        Go
      </button>
    </form>

    <video-list
      :list="videoList"
      :channel-name="channelName"
    />
  </div>
</template>

<script type="ts">
/* eslint-disable indent */
    import Vue from 'vue';
    import SettingsService from '../services/settings.service';
    import FetchService from '../services/fetch.service';
    import VideoList from './VideoList.vue';

    export default Vue.extend({
        name: 'Search',
        components: {
            VideoList
        },
        data: () => {
            return {
                videoList: {},
                channelName: SettingsService.settings.channels[0].channel,
                countModel: 25,
                options: SettingsService.settings.channels
            };
        },
        computed: {
            countList() {
                return [10, 25, 50];
            },
            formSubmittable() {
                return '' !== this.channelName;
            }
        },
        beforeMount() {
            SettingsService.load().then(settings => {
                this.channelName = settings.channels[0].channel;
                this.options = settings.channels;
            });
        },
        mounted() {
            this.$root.$on('clearing-fields', () => {
                console.info('Clearing up fields for global search');
                this.channelName = '';
                this.videoList = {};
            });
        },
        methods: {
            formSubmit() {
                if ('' === this.channelName) {
                    return;
                }

                FetchService.search(this.channelName, this.count).then(response => {
                    this.videoList = response.data.data;
                });
            }
        }
    });
</script>

<style>

</style>
