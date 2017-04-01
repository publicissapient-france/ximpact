import _ from 'lodash';
import GraphService from '../tool/GraphService';

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
    const graphQuery = encodeURI(`mutation{xebian_create(email:"${email}"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.xebian_create);
  },
  updateXebian(xebian) {
    const graphQuery = encodeURI(`
mutation {
  xebian_update(id: "${xebian.id}", email: "${xebian.email}", firstname: "${xebian.firstname}", lastname: "${xebian.lastname}") {
    id
  }
}`);
    return GraphService.query(graphQuery);
  },
  fetchXebians() {
    const graphQuery = encodeURI('{xebians{id,email,firstname,lastname}}');
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
      description
      customer {
        id
        company
        firstname
        lastname
        email
      }
      feedbacks {
        author {
          id
          firstname
          lastname
        }
        comment
        badges
        created_at
        updated_at
      }
    }
  }
}`;
    return GraphService.query(graphQuery)
      .then(response => store.commit('setXebian', response.xebian));
  },
};
