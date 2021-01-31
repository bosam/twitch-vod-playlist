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
        SpawnService.spawnChildProcess(url).then(process => {
          let timeout;
          process.stdout.on('data', (data) => {
            console.info(data.toString());
            // Disable loader after 1 second of non-activity
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              this.spawningVideo = false;
            }, 1000);
          });
          process.stderr.on('data', (data) => {
            this.$bvToast.toast(data.toString(), {
              title: 'Error',
              variant: 'danger',
              solid: false
            });
            this.spawningVideo = false;
          });
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
