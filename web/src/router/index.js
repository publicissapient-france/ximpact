import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/signin/Signin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin,
    },
  ],
});
