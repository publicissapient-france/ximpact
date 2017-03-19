import _ from 'lodash';
import GraphService from '../tool/GraphService';

export default {
  xebians: [],
  xebian: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    impacts: [],
  },
  createXebian(email) {
    const graphQuery = encodeURI(`mutation{xebian_create(email:"${email}",firstName:"a",lastName:"a"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.xebian_create);
  },
  updateXebian(xebian) {
    const graphQuery = encodeURI(`
mutation {
  xebian_update(id: "${xebian.id}", email: "${xebian.email}", firstName: "${xebian.firstName}", lastName: "${xebian.lastName}") {
    id
  }
}`);
    return GraphService.query(graphQuery);
  },
  fetchXebians() {
    const graphQuery = encodeURI('{xebians{id,email,firstName,lastName}}');
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
    firstName
    lastName
    impacts {
      description
      feedbacks {
        comment
        createdAt
      }
    }
  }
}`;
    return GraphService.query(graphQuery)
      .then(response => store.commit('setXebian', response.xebian));
  },
};
