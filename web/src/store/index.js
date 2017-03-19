import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import moment from '../tool/Moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    xebian: {
      id: '',
      firstName: '',
      lastName: '',
      impacts: [],
    },
    customer: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      company: '',
    },
  },
  mutations: {
    setXebian(state, xebian) {
      _.merge(state.xebian, xebian);
      _.each(state.xebian.impacts,
        impact => _.each(impact.feedbacks,
          (feedback) => {
            feedback.createdAt = moment(parseInt(feedback.createdAt, 10)).format('DD MMMM YYYY hh:mm');
            feedback.updatedAt = moment(parseInt(feedback.updatedAt, 10)).format('DD MMMM YYYY hh:mm');
            return null;
          }));
    },
    setCustomer(state, customer) {
      _.merge(state.customer, customer);
      return null;
    },
  },
});
