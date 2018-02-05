import Vue from 'vue';
import wsEvents from 'ws-events';
import VueNativeSock from 'vue-native-websocket';
import Navarra from './Navarra';

Vue.config.productionTip = false;

// Use websockets and attach to Vue instance
Vue.use(VueNativeSock, 'ws://localhost:9000', { format: 'json' });

/* eslint-disable no-new */
new Vue({
  el: '#navarra',
  template: '<Navarra/>',
  components: { Navarra },
});
