import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import moment from '../tool/Moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    xebian: {
      firstName: '',
      lastName: '',
      impacts: [],
    },
  },
  mutations: {
    setXebian(state, xebian) {
      _.merge(state.xebian, xebian);
      _.each(state.xebian.impacts,
        impact => _.each(impact.feedbacks,
          (feedback) => {
            feedback.createdAt = moment(feedback.createdAt).format('DD MMMM YYYY');
            return null;
          }));
    },
  },
});
