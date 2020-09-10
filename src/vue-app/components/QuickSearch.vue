<template>
  <div>
    <b-nav class="navbar navbar-light bg-light">
      <form
        class="form form-inline"
        @submit.stop.prevent="formSubmit"
      >
        <div class="input-group mb-3">
          <input
            v-model="channelName"
            type="text"
            class="form-control"
            placeholder="Name of channel"
            aria-label="Name of channel"
            aria-describedby="basic-addon2"
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary search-channel-btn"
              type="submit"
              :disabled="!formSubmittable"
            >
              <font-awesome-icon icon="search" />
            </button>
          </div>
        </div>
        <div
          class="form-group mb-3"
          style="margin-left: 10px;"
        >
          <button
            class="form-control"
            type="button"
            @click="clearFields"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </form>
      <div class="pull-right form-group mb-3">
        <button
          :disabled="!formSubmittable"
          class="refresh-btn form-control"
          type="button"
          @click="formSubmit"
        >
          <font-awesome-icon icon="sync" /> Refresh
        </button>
      </div>
    </b-nav>

    <video-list
      :list="videoList"
      :channel-name="channelName"
    />
  </div>
</template>

<script type="ts">
/* eslint-disable indent */
    import Vue from 'vue';
    import VideoList from './VideoList.vue';
    import FetchService from '../services/fetch.service';

    export default Vue.extend({
        name: 'QuickSearch',
        components: {
            VideoList
        },
        data: () => {
            return {
                videoList: {},
                channelName: '',
                countModel: 25,
            };
        },
        computed: {
            formSubmittable() {
                return '' !== this.channelName;
            }
        },
        mounted() {
            this.$root.$on('clearing-fields', () => {
                console.info('Clearing up fields');
                this.channelName = '';
                this.videoList = {};
            });
        },
        methods: {
            formSubmit() {
                FetchService.search(this.channelName, 25).then(response => {
                    this.videoList = response.data.data;
                });
            },
            clearFields() {
                this.$root.$emit('clearing-fields');
            }
        }
    });
</script>

<style>

</style>
