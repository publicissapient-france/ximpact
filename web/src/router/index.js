import Vue from 'vue';
import Router from 'vue-router';
import Element from 'element-ui';
import Signin from '@/signin/Signin';
import ImpactCreation from '@/impact/ImpactCreation';

Vue.use(Router);
Vue.use(Element);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/impact-creation',
      name: 'ImpactCreation',
      component: ImpactCreation,
    },
  ],
});
