<template>
  <div>
    <b-form @submit.stop.prevent="formSubmit">
      <b-form-group
        class="mb-0"
        label="Client Id"
        label-for="input-client-id"
      >
        <b-form-input
          id="input-client-id"
          v-model="settings.credentials.client_id"
          placeholder="Twitch Client Id"
        />
      </b-form-group>
      <b-form-group
        class="mb-0"
        label="Client Secret"
        label-for="input-client-secret"
      >
        <b-form-input
          id="input-client-secret"
          v-model="settings.credentials.client_secret"
          placeholder="Twitch Client Secret"
        />
      </b-form-group>

      <b-form-group
        class="mb-0"
        label="Script location"
        label-for="input-paths-script"
      >
        <b-form-textarea
          id="input-paths-script"
          v-model="settings.paths.script"
          rows="5"
          placeholder="Script location"
        />
      </b-form-group>

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

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
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
    formSubmit() {
      SettingsService.save(this.settings).then(() => {
        this.showSuccess = true;
      });
    }
  }
});
</script>

<style>
</style>
