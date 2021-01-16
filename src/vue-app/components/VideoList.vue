<template>
  <div>
    <h6 v-if="list.length">
      {{ list.length }} videos ( {{ channelNameProcessed }} ) <font-awesome-icon
        v-if="spawningVideo"
        icon="spinner"
        spin
      />
    </h6>

    <ul class="fa-ul">
      <li
        v-for="video in list"
        :key="video.id"
      >
        <span class="fa-li">
          <font-awesome-icon icon="angle-right" />
        </span>
        <font-awesome-icon
          style="cursor: hand"
          icon="copy"
          :title="video.url"
          @click="copyToClipboard(video.url)"
        />
        |
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
        channelNameProcessed: '',
        spawningVideo: false
      };
    },
    watch: {
      list: function () {
        this.channelNameProcessed = this.channelName;
      },
    },
    methods: {
      parseTitle(video) {
        // Find way to have title processors
        return video.title;
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
        this.spawningVideo = true;
        // Artificial timeout - since spawning won't return the buffer until the process is closed
        setTimeout(() => { this.spawningVideo = false; }, 2500);
        SpawnService.spawnMedia(url)
          .catch(error => {
            this.$bvToast.toast(error.stdout.toString(), {
              title: 'Error',
              variant: 'danger',
              solid: false
            });
        }).finally(() => {
          // In case it returns early due to an error
          this.spawningVideo = false;
        });
      },
      copyToClipboard(url) {
        navigator.clipboard.writeText(url);
        this.$bvToast.toast('Url copied successfully!', {
          title: 'Success',
          variant: 'success',
          solid: false
        });
      }
    }
  });
</script>

<style>

</style>
