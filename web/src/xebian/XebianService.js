import GraphService from '../tool/GraphService';

export default {
  createXebian(email) {
    const graphQuery = encodeURI(`mutation{xebian(email:"${email}",firstName:"a",lastName:"a"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.xebian);
  },
};
