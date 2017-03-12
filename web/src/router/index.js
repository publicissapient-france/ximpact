import Vue from 'vue';
import Router from 'vue-router';
import Element from 'element-ui';
import Signin from '@/signin/Signin';
import ImpactCreation from '@/impact/creation/ImpactCreation';
import Impacts from '@/impact/Impacts';
import Customers from '@/customer/Customers';
import Xebians from '@/xebian/Xebians';

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
      path: '/impacts/creation',
      name: 'ImpactCreation',
      component: ImpactCreation,
    },
    {
      path: '/impacts',
      name: 'Impacts',
      component: Impacts,
    },
    {
      path: '/xebians',
      name: 'Xebians',
      component: Xebians,
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
    },
  ],
});
