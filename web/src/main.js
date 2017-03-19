import Vue from 'vue';
import Element from 'element-ui';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Element);

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
