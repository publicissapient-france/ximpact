import GraphService from '../tool/GraphService';

export default {
  createCustomer(email) {
    const graphQuery = encodeURI(`mutation{customer(email:"${email}",firstName:"a",lastName:"a",company:"a"){id}}`);
    return GraphService.query(graphQuery)
      .then(response => response.customer);
  },
};
