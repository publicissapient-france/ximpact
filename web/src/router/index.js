import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

import Signin from '../signin/Signin';
import ImpactCreate from '../impact/create/ImpactCreate';
import FeedbackUpdate from '../feedback/update/FeedbackUpdate';
import Customers from '../customer/Customers';
import Xebians from '../xebian/Xebians';
import Xebian from '../xebian/Xebian';
import Customer from '../customer/Customer';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/xebians',
    },
    {
      path: '/signin',
      component: Signin,
    },
    {
      path: '/impacts/create',
      component: ImpactCreate,
    },
    {
      path: '/xebians',
      component: Xebians,
    },
    {
      path: '/xebians/:id',
      component: Xebian,
    },
    {
      path: '/customers',
      component: Customers,
    },
    {
      path: '/customers/:id',
      component: Customer,
    },
    {
      path: '/feedbacks/:token',
      component: FeedbackUpdate,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = store.get('user');
  if (user && user.email && user.email.endsWith('@xebia.fr')) {
    next();
  } else if (to.path === '/signin') {
    next();
  } else {
    next('/signin');
    window.location.reload();
  }
});

export default router;
