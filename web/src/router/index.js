import Vue from 'vue';
import Router from 'vue-router';
import Signin from '../signin/Signin';
import ImpactCreation from '../impact/creation/ImpactCreation';
import Customers from '../customer/Customers';
import Xebians from '../xebian/Xebians';
import Xebian from '../xebian/Xebian';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Signin,
    },
    {
      path: '/impacts/creation',
      component: ImpactCreation,
    },
    {
      path: '/xebians',
      component: Xebians,
    },
    {
      path: '/customers',
      component: Customers,
    },
    {
      path: '/xebians/:id',
      component: Xebian,
    },
  ],
});
