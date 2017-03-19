import Vue from 'vue';
import Element from 'element-ui';

import App from './App';
import TopBar from './nav/TopBar';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Element);

Vue.component('top-bar', TopBar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  },
  store,
});
