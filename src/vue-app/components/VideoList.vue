<template>
  <div>
    <h6 v-if="list.length">
      {{ list.length }} videos ( {{ channelNameProcessed }} )
    </h6>

    <ul class="fa-ul">
      <li
        v-for="video in list"
        :key="video.id"
      >
        <span class="fa-li">
          <font-awesome-icon icon="angle-right" />
        </span>
        <div class="float-right small">
          <span
            :title="createdAtRaw(video.created_at)"
          >{{ createdAtFromNow(video.created_at) }}</span>
        </div>
        <a
          :href="video.url"
          @click="spawnMedia(video.url, $event)"
        >{{ parseTitle(video) }}</a>
        <span class="small">( {{ video.duration }} )</span>
      </li>
    </ul>
  </div>
</template>

<script type="ts">
/* eslint-disable indent */
import Vue from 'vue';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, utcToZonedTime } from 'date-fns-tz';
import SpawnService from '../services/spawn.service';

const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default Vue.extend({
  name: 'VideoList',
  props: [
    'list',
    'channelName'
  ],
  data: () => {
    return {
      channelNameProcessed: ''
    };
  },
  watch: {
    list: function () {
      this.channelNameProcessed = this.channelName;
    },
  },
  methods: {
    parseTitle(video) {
      let title = video.title;
      if ('Bibi300' === video.user_name &&
        -1 !== title.indexOf('|')) {
        title = title.split('|')[1];
      }

      return title;
    },
    createdAtRaw(createdAt) {
      createdAt = utcToZonedTime(createdAt, currentTimezone);
      return format(createdAt, 'yyyy-MM-dd HH:mm:ss zzz');
    },
    createdAtFromNow(createdAt) {
      createdAt = utcToZonedTime(createdAt, currentTimezone);
      return formatDistanceToNow(createdAt, { addSuffix: true });
    },
    spawnMedia(url, e) {
      e.preventDefault();
      SpawnService.spawnMedia(url);
    }
  }
});
</script>

<style>

</style>
