import _ from 'lodash';
import GraphService from '../tool/GraphService';

export default {
  xebians: [],
  createXebian(email) {
    const graphQuery = encodeURI(`mutation{xebian(email:"${email}",firstName:"a",lastName:"a"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.xebian);
  },
  fetchXebians() {
    const graphQuery = encodeURI('{xebians{id,email,firstName,lastName}}');
    return GraphService.query(graphQuery)
      .then((response) => {
        this.xebians.length = 0;
        _.each(response.xebians, x => this.xebians.push(x));
      });
  },
};
