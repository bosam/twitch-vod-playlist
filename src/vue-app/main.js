'use strict';

import Vue from 'vue';
import App from '@/App.vue';
import { router } from './router';
import { BootstrapVue } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
    router,
    template: '<app />',
    components: { App }
}).$mount('#app');
