<template>
  <div>
    <b-form @submit.stop.prevent="formSubmit">
      <b-table-simple
        caption-top
        small
      >
        <caption>
          You can add or edit the current stored channels.
          <b-form
            inline
            class="float-right"
          >
            <b-form-input
              v-model="addChannelName"
              size="sm"
              type="text"
              placeholder="Channel name"
              @keydown.space.prevent
            />
            <b-button
              style="margin-left: 10px"
              :disabled="'' === addChannelName || addChannelLoading"
              size="sm"
              variant="primary"
              @click="addChannelRow"
            >
              <font-awesome-icon
                :icon="!addChannelLoading ? 'plus' : 'spinner'"
                :spin="addChannelLoading"
              />
              Add channel
            </b-button>
          </b-form>
        </caption>
        <b-thead head-variant="dark">
          <b-th />
          <b-th>Channel</b-th>
          <b-th>Label</b-th>
          <b-th>Remove</b-th>
        </b-thead>
        <draggable
          v-model="settings.channels"
          :class="{[`cursor-grabbing`]: dragging === true}"
          group="channels"
          tag="tbody"
          handle=".handle"
          @start="dragging = true"
          @end="dragging = false"
        >
          <b-tr
            v-for="channel in settings.channels"
            :key="channel.internalId"
          >
            <b-td>
              <div class="handle">
                <font-awesome-icon icon="th" />
              </div>
            </b-td>
            <b-td>
              <b-form-input
                type="text"
                :value="channel.channel"
                @keydown.space.prevent
                @input="(val) => changed('channel', channel, val)"
              />
            </b-td>
            <b-td>
              <b-form-input
                type="text"
                :value="channel.label"
                @input="(val) => changed('label', channel, val)"
              />
            </b-td>
            <b-td>
              <div class="text-center">
                <b-button
                  size="sm"
                  :disabled="settings.channels.length === 1"
                  variant="danger"
                  title="Remove"
                  @click="removeChannelRow(channel.internalId)"
                >
                  <font-awesome-icon icon="trash" />
                </b-button>
              </div>
            </b-td>
          </b-tr>
        </draggable>
      </b-table-simple>
      <b-button
        variant="success"
        type="submit"
        size="sm"
        :disabled="checkValidity"
      >
        <font-awesome-icon icon="save" />
        Save
      </b-button>
    </b-form>
    <b-alert
      variant="success"
      :show="showSuccess"
    >
      <font-awesome-icon icon="check-circle" />
      Successfully saved.
    </b-alert>
  </div>
</template>

<script type="ts">
/* eslint-disable indent */
import Vue from 'vue';
import SettingsService from '../services/settings.service';
import draggable from 'vuedraggable';
import FetchService from '../services/fetch.service';

export default Vue.extend({
  name: 'Settings',
  components: {
    draggable
  },
  data() {
    return {
      addChannelName: '',
      addChannelLoading: false,
      dragging: false,
      settings: SettingsService.settings,
      dismissSecs: 10,
      dismissCountDown: 0,
      showSuccess: false
    };
  },
  computed: {
    checkValidity() {
      let sameSettings = SettingsService.isIdentical(this.settings);
      if (sameSettings) {
        return true;
      }

      let isDisabled = false;
      this.settings.channels.forEach(item => {
        if ('' === item.channel ||
          '' === item.label) {
          isDisabled = true;
          return false;
        }
      });
      return isDisabled;
    }
  },
  watch: {
    showSuccess() {
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  },
  beforeMount() {
    SettingsService.load().then(settings => {
      this.settings = settings;
    });
  },
  methods: {
    addChannelRow() {
      this.addChannelLoading = true;

      FetchService.fetchChannelObjectByName(this.addChannelName).then((channel) => {
        channel.internalId = this.settings.channels.length;
        this.settings.channels.push(channel);
        this.addChannelName = '';
      }).catch((e) => {
        this.$bvToast.toast(e, {
          title: 'Error',
          variant: 'danger',
          solid: true
        });
      }).finally(() => {
        this.addChannelLoading = false;
      });
    },
    removeChannelRow(id) {
      const index = this.settings.channels.findIndex(item => item.internalId === id);
      this.settings.channels.splice(index, 1);
      // Re-order internalIds
      this.settings.channels.forEach((channel, index) => {
        channel.internalId = index;
      });
    },
    changed: function (key, item, val) {
      const index = this.settings.channels.findIndex(currentItem => currentItem.internalId === item.internalId);
      this.settings.channels[index][key] = val;
    },
    formSubmit() {
      SettingsService.save(this.settings).then(() => {
        this.showSuccess = true;
      });
    }
  }
});
</script>

<style scoped>
.handle {
  cursor: grab;
}

.cursor-grabbing * {
  cursor: grabbing !important;
}
</style>
