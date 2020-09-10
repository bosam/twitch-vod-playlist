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
        >{{ parseTitle(video.title) }}</a>
        <span class="small">( {{ video.duration }} )</span>
      </li>
    </ul>
  </div>
</template>

<script type="ts">
/* eslint-disable indent */
    import Vue from 'vue';
    import moment from 'moment-timezone';
    import SpawnService from '../services/spawn.service';

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
            list: function() {
                this.channelNameProcessed = this.channelName;
            },
        },
        methods: {
            parseTitle(title) {
                if ('bibi300' === this.channelName &&
                    -1 !== title.indexOf('!')) {
                    title = title.split('!')[0];
                }

                return title;
            },
            createdAtRaw(createdAt) {
                createdAt = moment(createdAt).tz('America/Vancouver');
                return createdAt.format('LLLL');
            },
            createdAtFromNow(createdAt) {
                createdAt = moment(createdAt).tz('America/Vancouver');
                return createdAt.fromNow(true);
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
