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
        <b-form-select
          v-model="channelInternalId"
          :options="options"
          size="sm"
          class="mx-sm-3"
          value-field="internalId"
          text-field="label"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary btn-sm my-1"
        :disabled="isSearching"
      >
        <font-awesome-icon
          icon="spinner"
          spin
          :hidden="!isSearching"
        />
        Go
      </button>
    </form>

    <video-list
      :list="videoList"
      :channel-name="channel.channel"
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
      isSearching: false,
      videoList: {},
      channelInternalId: SettingsService.settings.channels[0].internalId,
      channel: SettingsService.settings.channels[0],
      countModel: 25,
      options: SettingsService.settings.channels
    };
  },
  computed: {
    countList() {
      return [10, 25, 50];
    },
  },
  watch: {
    channelInternalId() {
      SettingsService.load().then(settings => {
        this.channel = settings.channels.find(channel => channel.internalId === this.channelInternalId);
      });
    }
  },
  beforeMount() {
    SettingsService.load().then(settings => {
      this.channel = settings.channels[0];
      this.channelInternalId = this.channel.internalId;
      this.options = settings.channels;
    });
  },
  mounted() {
    this.$root.$on('clearing-fields', () => {
      console.info('Clearing up fields for global search');
      this.videoList = {};
    });
  },
  methods: {
    formSubmit() {
      this.isSearching = true;
      FetchService.loadVideoList(this.channel, this.count).then(response => {
        this.videoList = response.data.data;
      }).finally(() => {
        this.isSearching = false;
      });
    }
  }
});
</script>

<style>

</style>
