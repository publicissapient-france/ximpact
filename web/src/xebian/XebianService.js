import _ from 'lodash';
import GraphService from '../tool/GraphService';
import moment from '../tool/Moment';
import Constant from '../constant';

export default {
  xebians: [],
  xebian: {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    impacts: [],
  },
  createXebian(email) {
    const graphQuery = `mutation{xebian_create(email:"${email}"){id}}`;
    return GraphService.query(graphQuery)
      .then(response => response.xebian_create);
  },
  updateXebian(xebian) {
    const graphQuery = `
mutation {
  xebian_update(id: "${xebian.id}", email: "${xebian.email}", firstname: "${xebian.firstname}", lastname: "${xebian.lastname}") {
    id
  }
}`;
    return GraphService.query(graphQuery);
  },
  fetchXebians() {
    const graphQuery = '{xebians{id,email,firstname,lastname}}';
    return GraphService.query(graphQuery)
      .then((response) => {
        this.xebians.length = 0;
        _.each(response.xebians, x => this.xebians.push(x));
      });
  },
  getXebian(id, store) {
    const graphQuery =
      `{
  xebian(id: "${id}") {
    id
    email
    firstname
    lastname
    impacts {
      id
      updated_at
      customer {
        firstname
        lastname
        company
      }
      description
      feedbacks {
        comment
        updated_at
        customer {
          firstname
          lastname
          company
        }
        xebian {
          firstname
          lastname
        }
      }
    }
  }
}`;
    return GraphService.query(graphQuery)
      .then((response) => {
        _.each(response.xebian.impacts,
          (impact) => {
            impact.updated_at = moment(impact.updated_at, Constant.backendDateFormat)
              .format(Constant.appDateFormat);
            _.each(impact.feedbacks, (feedback) => {
              feedback.updated_at = moment(feedback.updated_at, Constant.backendDateFormat)
                .format(Constant.appDateFormat);
              return null;
            });
          });
        store.commit('setXebian', response.xebian);
      });
  },
};
