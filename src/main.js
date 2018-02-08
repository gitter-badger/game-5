import Vue from 'vue';
import wsEvents from 'ws-events';
import Navarra from './Navarra';

Vue.config.productionTip = false;

// Start the websocket server client-side
window.ws = wsEvents(new WebSocket('ws://localhost:9000'));
console.log('Websocket server started...');

/* eslint-disable no-new */
new Vue({
  el: '#navarra',
  template: '<Navarra/>',
  components: { Navarra },
});
