// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import Navarra from './Navarra';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, 'ws://localhost:9000');

/* eslint-disable no-new */
new Vue({
  el: '#navarra',
  template: '<Navarra/>',
  components: { Navarra },
});
