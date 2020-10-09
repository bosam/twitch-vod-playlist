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
      <b-form-group
        class="mb-0"
      >
        <b-table
          small
          :items="settings.channels"
          :fields="fields"
          primary-key="id"
          caption-top
        >
          <template #table-caption>
            You can add or edit the current stored channels.
            <b-button
              size="sm"
              variant="primary"
              class="float-right"
              @click="addChannelRow"
            >
              <font-awesome-icon icon="plus" /> Add channel
            </b-button>
          </template>
          <template #cell(channel)="data">
            <b-form-input
              type="text"
              :value="data.item.channel"
              @input="(val) => changed('channel', data.item, val)"
            />
          </template>
          <template #cell(label)="data">
            <b-form-input
              type="text"
              :value="data.item.label"
              @input="(val) => changed('label', data.item, val)"
            />
          </template>
          <template #cell(Remove)="data">
            <div class="text-center">
              <b-button
                :disabled="settings.channels.length === 1"
                variant="danger"
                title="Remove"
                @click="removeChannelRow(data.item.id)"
              >
                <font-awesome-icon icon="trash" />
              </b-button>
            </div>
          </template>
        </b-table>
      </b-form-group>

      <b-button
        variant="success"
        type="submit"
        size="sm"
        :disabled="checkValidity"
      >
        <font-awesome-icon icon="save" /> Save
      </b-button>
    </b-form>
    <b-alert
      variant="success"
      :show="showSuccess"
    >
      <font-awesome-icon icon="check-circle" /> Successfully saved.
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
                fields: ['Channel', 'Label', 'Remove'],
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
            },
            addChannelRow() {
                let prototype = Object.keys(this.settings.channels[0]).reduce((accObj, parseObj) => {
                    accObj[parseObj] = '';
                    return accObj;
                }, {});
                prototype.id = this.settings.channels.length;
                this.settings.channels.push(prototype);
            },
            removeChannelRow(id) {
                const index = this.settings.channels.findIndex(item => item.id === id);
                this.settings.channels.splice(index, 1);
            },
            changed: function(key, item, val) {
                const index = this.settings.channels.findIndex(currentItem => currentItem.id === item.id);
                this.settings.channels[index][key] = val;
            }
        }
    });
</script>

<style>
</style>
