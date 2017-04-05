import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import moment from '../tool/Moment';

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
    },
  },
  mutations: {
    setXebian(state, xebian) {
      _.merge(state.xebian, xebian);
      _.each(state.xebian.impacts,
        impact => _.each(impact.feedbacks,
          (feedback) => {
            feedback.created_at = moment(feedback.created_at).format('DD MMMM YYYY hh:mm');
            feedback.updated_at = moment(feedback.updated_at).format('DD MMMM YYYY hh:mm');
            return null;
          }));
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
