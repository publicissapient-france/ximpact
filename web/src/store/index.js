import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    xebian: {
      id: '',
      firstname: '',
      lastname: '',
      impacts: [],
    },
    customer: {
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      company: '',
    },
    impact: {
      id: '',
      description: '',
    },
    feedback: {
      impact: {
        id: '',
        description: '',
      },
      customer: {
        id: '',
        firstname: '',
      },
      xebian: {
        id: '',
        firstname: '',
      },
      comment: '',
      badges: [],
    },
  },
  mutations: {
    setXebian(state, xebian) {
      _.merge(state.xebian, xebian);
    },
    setCustomer(state, customer) {
      _.merge(state.customer, customer);
      return null;
    },
    setFeedback(state, feedback) {
      _.merge(state.feedback, feedback);
      return null;
    },
  },
});
